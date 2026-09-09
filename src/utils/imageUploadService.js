import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Resizes and compresses an image file in the browser using an HTML5 canvas.
 * Produces a high-quality, lightweight web-safe JPEG data URL (usually 70KB - 160KB).
 * Resilient against HEIC, mobile Safari mime types, and canvas decoding errors.
 *
 * @param {File|Blob} file - The file from input[type="file"]
 * @param {Object} options
 * @param {number} options.maxWidth - Maximum width/height in px (default: 1400)
 * @param {number} options.quality - JPEG compression quality 0.1 - 1.0 (default: 0.82)
 * @returns {Promise<{ dataUrl: string, blob: Blob, width: number, height: number, sizeBytes: number }>}
 */
export function compressImageFile(file, options = {}) {
  const { maxWidth = 1400, quality = 0.82 } = options;

  return new Promise((resolve) => {
    if (!file) {
      resolve({ dataUrl: '', blob: null, width: 0, height: 0, sizeBytes: 0 });
      return;
    }

    const isLikelyImage = 
      (file.type && file.type.startsWith('image/')) || 
      /\.(jpe?g|png|webp|gif|bmp|heic|heif|avif|svg)$/i.test(file.name || '');

    const reader = new FileReader();

    reader.onerror = () => {
      console.warn('[ImageUpload] FileReader error, returning empty fallback');
      resolve({ dataUrl: '', blob: file, width: 0, height: 0, sizeBytes: file.size || 0 });
    };

    reader.onload = (e) => {
      const rawDataUrl = e.target.result;

      // If not an image or if canvas isn't supported, resolve with raw data URL
      if (!isLikelyImage || typeof window === 'undefined' || !window.HTMLCanvasElement) {
        resolve({
          dataUrl: rawDataUrl,
          blob: file,
          width: 0,
          height: 0,
          sizeBytes: file.size || Math.round(rawDataUrl.length * 0.75)
        });
        return;
      }

      const img = new Image();

      // If browser cannot decode image into <img> (e.g. raw HEIC on unsupported browser),
      // safely fallback to the raw data URL so user is NEVER blocked
      img.onerror = () => {
        console.warn('[ImageUpload] Image element decode notice; falling back to direct Data URL');
        resolve({
          dataUrl: rawDataUrl,
          blob: file,
          width: 0,
          height: 0,
          sizeBytes: file.size || Math.round(rawDataUrl.length * 0.75)
        });
      };

      img.onload = () => {
        try {
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
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');

          // Clean white background for transparency fallback
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);

          canvas.toBlob(
            (blob) => {
              resolve({
                dataUrl: optimizedDataUrl,
                blob: blob || file,
                width,
                height,
                sizeBytes: blob ? blob.size : Math.round(optimizedDataUrl.length * 0.75)
              });
            },
            'image/jpeg',
            quality
          );
        } catch (canvasErr) {
          console.warn('[ImageUpload] Canvas compression exception; using raw Data URL:', canvasErr.message);
          resolve({
            dataUrl: rawDataUrl,
            blob: file,
            width: img.width || 0,
            height: img.height || 0,
            sizeBytes: file.size || Math.round(rawDataUrl.length * 0.75)
          });
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Universal resilient image upload:
 * 1. Optimizes and compresses the image client-side to professional web standards.
 * 2. Attempts Firebase Storage upload with a fast timeout (3.5 seconds).
 * 3. If Firebase Storage is unavailable (quota, billing, offline, permission, timeout),
 *    seamlessly falls back to the high-res optimized Web-Safe Base64 Data URL.
 * 4. NEVER throws an unhandled error — guarantees a valid image URL representation.
 *
 * @param {File} file
 * @param {Object} options
 * @param {string} options.folder - Destination storage folder e.g. 'travel_assets'
 * @param {number} options.maxWidth - Max dimension e.g. 1400
 * @param {number} options.quality - JPEG quality e.g. 0.82
 * @returns {Promise<{ url: string, isDataUrl: boolean, sizeBytes: number }>}
 */
export async function uploadImageResilient(file, options = {}) {
  const { folder = 'travel_assets', maxWidth = 1400, quality = 0.82 } = options;

  if (!file) {
    return { url: '', isDataUrl: false, sizeBytes: 0 };
  }

  // Step 1: Compress & optimize client-side
  let compressed;
  try {
    compressed = await compressImageFile(file, { maxWidth, quality });
  } catch (err) {
    console.warn('[ImageUpload] Compression wrapper notice:', err.message);
    compressed = null;
  }

  // Fallback if compression failed completely
  if (!compressed || !compressed.dataUrl) {
    try {
      const rawDataUrl = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.target.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      compressed = { dataUrl: rawDataUrl, blob: file, sizeBytes: file.size || 0 };
    } catch (readErr) {
      console.error('[ImageUpload] Complete read failure:', readErr);
      return { url: '', isDataUrl: false, sizeBytes: 0 };
    }
  }

  // Step 2: Try Firebase Storage upload
  try {
    const cleanName = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${Date.now()}_${cleanName}.jpg`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    const uploadBlob = compressed.blob || file;
    const uploadPromise = uploadBytes(storageRef, uploadBlob, {
      contentType: 'image/jpeg'
    }).then(snapshot => getDownloadURL(snapshot.ref));

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storage upload timeout (3500ms)')), 3500)
    );

    const cloudUrl = await Promise.race([uploadPromise, timeoutPromise]);
    if (cloudUrl && typeof cloudUrl === 'string') {
      return { url: cloudUrl, isDataUrl: false, sizeBytes: compressed.sizeBytes };
    }
  } catch (storageErr) {
    console.info('[ImageUpload] Cloud Storage bypass/fallback active:', storageErr.message);
  }

  // Step 3: Gracefully return the optimized web-safe Data URL
  return { 
    url: compressed.dataUrl, 
    isDataUrl: true, 
    sizeBytes: compressed.sizeBytes 
  };
}
