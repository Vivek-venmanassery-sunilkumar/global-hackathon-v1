import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../axios/auth';

const CameraCapture = () => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Effect to handle video element when stream changes
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Clean up stream on component unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const stopCurrentStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const openCamera = async () => {
        try {
            // Stop any existing stream first
            stopCurrentStream();

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            setStream(mediaStream);
            setIsCameraOn(true);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            toast.error("Error accessing camera - please check permissions");
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        if (!video || !stream) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoDataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(photoDataUrl);
    };

    const retakePhoto = () => {
        // Clear the photo
        setPhoto(null);
        
        // Stop current stream and restart camera
        stopCurrentStream();
        openCamera();
    };

    const closeCamera = () => {
        stopCurrentStream();
        setIsCameraOn(false);
        setPhoto(null);
    };

    const sendToBackend = async () => {
        if (!photo) return;

        try {
            setIsUploading(true);
            // Stop camera when sending to backend
            stopCurrentStream();
            setIsCameraOn(false);

            // Convert base64 to blob
            const response = await fetch(photo);
            const blob = await response.blob();
            
            // Create FormData
            const formData = new FormData();
            formData.append('file', blob, 'capture.jpg');

            // Use Axios instead of fetch
            const uploadResponse = await api.post('/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // With Axios, the response data is directly available
            toast.success("Photo uploaded successfully!");
            console.log("Server response:", uploadResponse.data);
            
            // You can navigate to the next step here
            
        } catch (err) {
            console.error("Error uploading photo: ", err);
            
            // Enhanced error handling with Axios
            if (err.response) {
                // Server responded with error status
                toast.error(`Upload failed: ${err.response.data.detail || 'Server error'}`);
            } else if (err.request) {
                // Network error - request was made but no response received
                toast.error("Network error - please check if the server is running");
            } else {
                // Other errors
                toast.error("Error uploading photo");
            }
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            {/* Initial State - Help Me Button */}
            {!isCameraOn && !photo && (
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Doodle Sketch Generator
                    </h1>
                    <button 
                        onClick={openCamera}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        🎨 Help Me Draw!
                    </button>
                    <p className="mt-6 text-gray-600 text-lg">
                        Take a photo and we'll create a step-by-step doodle tutorial for you!
                    </p>
                </div>
            )}

            {/* Camera Active - Showing Video Feed */}
            {isCameraOn && !photo && (
                <div className="w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Smile for the camera! 📸
                    </h2>
                    <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <video 
                            ref={videoRef}
                            autoPlay 
                            playsInline
                            muted
                            className="w-full h-auto max-h-[70vh] object-contain"
                            onLoadedMetadata={() => console.log('Video metadata loaded')}
                        />
                        {/* Camera overlay frame */}
                        <div className="absolute inset-0 border-4 border-white border-opacity-30 pointer-events-none rounded-2xl"></div>
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                        <button 
                            onClick={capturePhoto} 
                            className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-3 text-lg font-semibold shadow-lg"
                        >
                            <span className="text-2xl">📸</span>
                            Capture Photo
                        </button>
                        <button 
                            onClick={closeCamera} 
                            className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-3 text-lg font-semibold shadow-lg"
                        >
                            <span className="text-2xl">❌</span>
                            Close Camera
                        </button>
                    </div>
                </div>
            )}

            {/* Photo Captured - Preview */}
            {photo && (
                <div className="w-full max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        Great shot! Ready to create your doodle?
                    </h2>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl p-2">
                        <img 
                            src={photo} 
                            alt="Captured" 
                            className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                        />
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                        <button 
                            onClick={retakePhoto} 
                            className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-3 text-lg font-semibold shadow-lg"
                            disabled={isUploading}
                        >
                            <span className="text-2xl">🔄</span>
                            Retake Photo
                        </button>
                        <button 
                            onClick={sendToBackend} 
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-3 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl">✅</span>
                                    Create My Doodle!
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraCapture;