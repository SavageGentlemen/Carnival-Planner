import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

export default function QRCodeScanner({ onClose, onSuccess }) {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only initialize scanner if we haven't successfully scanned something yet
    if (scanResult) return;

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    }, false);

    scanner.render(onScanSuccess, onScanError);

    async function onScanSuccess(decodedText) {
      scanner.clear(); // Stop scanning after successful read
      setLoading(true);
      setError(null);

      try {
        const functions = getFunctions(app);
        const verifyAttendance = httpsCallable(functions, 'verifyPhysicalAttendance');
        
        const result = await verifyAttendance({ qrPayload: decodedText });
        
        setScanResult(result.data);
        if (onSuccess) {
           onSuccess(result.data);
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setError(err.message || "Failed to verify attendance.");
      } finally {
        setLoading(false);
      }
    }

    function onScanError(errorMessage) {
      // Ignore routine scan errors (e.g. no QR code found yet)
    }

    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [scanResult, onSuccess]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-teal-400" />
            Scan to Check In
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
            {!scanResult && !loading && !error && (
              <div>
                <p className="text-gray-400 text-sm mb-4 text-center">
                  Point your camera at the official event QR code to earn your Digital Stamp.
                </p>
                <div id="reader" className="rounded-2xl overflow-hidden bg-black text-white"></div>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                <p className="text-white font-medium text-lg">Verifying...</p>
                <p className="text-gray-500 text-sm mt-2">Checking cryptographic signature</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-center py-8">
                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Verification Failed</h3>
                <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>
                <button 
                  onClick={() => { setError(null); setScanResult(null); }}
                  className="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition"
                >
                  Try Again
                </button>
              </div>
            )}

            {scanResult && (
              <div className="flex flex-col items-center text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                <p className="text-green-400 text-lg mb-1">{scanResult.message}</p>
                <p className="text-gray-400 text-sm mt-4 bg-gray-800 px-4 py-2 rounded-full inline-block">
                  +{scanResult.credits} Credits Earned
                </p>
                <button 
                  onClick={onClose}
                  className="mt-8 w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:from-teal-600 hover:to-emerald-600 transition"
                >
                  Continue
                </button>
              </div>
            )}
        </div>
      </div>
      
      {/* Global CSS overrides for html5-qrcode UI to match app dark theme */}
      <style dangerouslySetInnerHTML={{__html: `
        #reader { border: none !important; border-radius: 1rem; overflow: hidden; }
        #reader__dashboard_section_csr span, #reader__dashboard_section_csr button {
            color: white !important;
            background: #1f2937 !important; 
            border: 1px solid #374151 !important;
            border-radius: 0.5rem;
            padding: 0.5rem;
            margin: 0.25rem;
        }
        #reader__dashboard_section_swaplink { color: #2dd4bf !important; }
        #reader__camera_selection { background: #1f2937 !important; color: white; border-radius: 0.5rem; padding: 0.5rem; border: 1px solid #374151; }
      `}} />
    </div>
  );
}
