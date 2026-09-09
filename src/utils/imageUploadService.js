import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Resizes and compresses an image file in the browser using an HTML5 canvas.
 * Produces a high-quality, lightweight web-safe JPEG data URL (usually 70KB - 160KB).
 *
 * @param {File|Blob} file - The file from the input[type="file"]
 * @param {Object} options
 * @param {number} options.maxWidth - Maximum width/height in px (default: 1400)
 * @param {number} options.quality - JPEG compression quality 0.1 - 1.0 (default: 0.8)
 * @returns {Promise<{ dataUrl: string, blob: Blob, width: number, height: number, sizeBytes: number }>}
 */
export function compressImageFile(file, options = {}) {
  const { maxWidth = 1400, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image data'));
      img.onload = () => {
        let { width, height } = img;

        // Scale down proportionally if larger than maxWidth
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Clean white background for transparency fallback
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        canvas.toBlob(
          (blob) => {
            resolve({
              dataUrl,
              blob: blob || file,
              width,
              height,
              sizeBytes: blob ? blob.size : Math.round(dataUrl.length * 0.75)
            });
          },
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Universal resilient image upload:
 * 1. Optimizes and compresses the image client-side to professional web standards.
 * 2. Attempts Firebase Storage upload with a fast timeout.
 * 3. If Firebase Storage fails (e.g. billing account disabled / delinquent HTTP 402, CORS, network offline),
 *    gracefully falls back to the optimized Web-Safe Base64 Data URL.
 * 4. Data URL stores directly in Firestore (well under 1MB limit), loading instantaneously on any domain with zero downtime.
 *
 * @param {File} file
 * @param {Object} options
 * @param {string} options.folder - Destination storage folder e.g. 'travel_assets'
 * @param {number} options.maxWidth - Max dimension e.g. 1400
 * @param {number} options.quality - JPEG quality e.g. 0.8
 * @returns {Promise<{ url: string, isDataUrl: boolean, sizeBytes: number }>}
 */
export async function uploadImageResilient(file, options = {}) {
  const { folder = 'travel_assets', maxWidth = 1400, quality = 0.8 } = options;

  // Step 1: Compress & optimize
  const compressed = await compressImageFile(file, { maxWidth, quality });

  // Step 2: Try Firebase Storage (with a 4-second timeout to avoid hanging UI)
  try {
    const cleanName = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${Date.now()}_${cleanName}.jpg`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    const uploadPromise = uploadBytes(storageRef, compressed.blob, {
      contentType: 'image/jpeg'
    }).then(snapshot => getDownloadURL(snapshot.ref));

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storage upload timeout')), 3500)
    );

    const cloudUrl = await Promise.race([uploadPromise, timeoutPromise]);
    return { url: cloudUrl, isDataUrl: false, sizeBytes: compressed.sizeBytes };
  } catch (err) {
    console.info('[ImageUpload] Cloud storage unavailable, using resilient optimized local format:', err.message);
    // Step 3: Graceful fallback to optimized Data URL
    return { url: compressed.dataUrl, isDataUrl: true, sizeBytes: compressed.sizeBytes };
  }
}
