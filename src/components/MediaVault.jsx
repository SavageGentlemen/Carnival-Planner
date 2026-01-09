import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { ImagePlus, Ticket, Trash2, Download, Eye, X, Upload, Loader2 } from 'lucide-react';

const FILE_TYPES = {
  ticket: { label: 'Ticket', icon: Ticket, color: '#F59E0B' },
  photo: { label: 'Photo', icon: ImagePlus, color: '#3B82F6' },
};

export default function MediaVault({ files = [], onFilesChange, carnivalName, carnivalId, userId }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('ticket');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Please upload an image (JPG, PNG, GIF, WebP) or PDF.');
      return;
    }

    setIsUploading(true);
    setUploadProgress('Uploading...');

    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const storagePath = `users/${userId}/carnivals/${carnivalId}/${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, storagePath);

      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      const newFile = {
        id: timestamp.toString(),
        name: fileName || file.name.split('.')[0],
        type: fileType,
        url: downloadUrl,
        storagePath: storagePath,
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        fileType: file.type,
      };

      onFilesChange([...files, newFile]);
      setFileName('');
      setUploadProgress('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    }
    
    setIsUploading(false);
  };

  const deleteFile = async (fileToDelete) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const storageRef = ref(storage, fileToDelete.storagePath);
      await deleteObject(storageRef);
      onFilesChange(files.filter(f => f.id !== fileToDelete.id));
    } catch (error) {
      console.error('Delete error:', error);
      onFilesChange(files.filter(f => f.id !== fileToDelete.id));
    }
  };

  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.originalName || file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tickets = files.filter(f => f.type === 'ticket');
  const photos = files.filter(f => f.type === 'photo');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-purple-500" />
            Media Vault
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Store your tickets, photos, and important documents for {carnivalName}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Upload New File</h4>
        <div className="grid gap-3">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="File label (e.g., 'Tribe Costume Receipt')"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.entries(FILE_TYPES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition ${
                isUploading 
                  ? 'border-gray-300 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                  : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                  <span className="text-purple-600 dark:text-purple-400">{uploadProgress}</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-purple-500" />
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    Click to upload image or PDF (max 10MB)
                  </span>
                </>
              )}
            </label>
          </div>
        </div>
      </div>

      {tickets.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-yellow-500" />
            Tickets ({tickets.length})
          </h4>
          <div className="grid gap-3">
            {tickets.map((file) => (
              <FileCard key={file.id} file={file} onView={setSelectedFile} onDownload={downloadFile} onDelete={deleteFile} />
            ))}
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <ImagePlus className="w-4 h-4 text-blue-500" />
            Photos ({photos.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((file) => (
              <PhotoCard key={file.id} file={file} onView={setSelectedFile} onDownload={downloadFile} onDelete={deleteFile} />
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <ImagePlus className="w-16 h-16 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No files uploaded yet</p>
          <p className="text-sm">Upload your tickets, costume receipts, and travel photos</p>
        </div>
      )}

      {selectedFile && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFile(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            {selectedFile.fileType === 'application/pdf' ? (
              <iframe src={selectedFile.url} className="w-full h-[80vh] rounded-lg" />
            ) : (
              <img src={selectedFile.url} alt={selectedFile.name} className="max-w-full max-h-[80vh] mx-auto rounded-lg" />
            )}
            <p className="text-white text-center mt-4 font-medium">{selectedFile.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FileCard({ file, onView, onDownload, onDelete }) {
  const typeConfig = FILE_TYPES[file.type] || FILE_TYPES.ticket;
  const IconComponent = typeConfig.icon;

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${typeConfig.color}20` }}
        >
          <IconComponent className="w-5 h-5" style={{ color: typeConfig.color }} />
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">{file.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(file.uploadedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onView(file)}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDownload(file)}
          className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(file)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function PhotoCard({ file, onView, onDownload, onDelete }) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
      <img
        src={file.url}
        alt={file.name}
        className="w-full h-32 object-cover cursor-pointer"
        onClick={() => onView(file)}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          onClick={() => onView(file)}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDownload(file)}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(file)}
          className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-full text-white transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
        {file.name}
      </p>
    </div>
  );
}
