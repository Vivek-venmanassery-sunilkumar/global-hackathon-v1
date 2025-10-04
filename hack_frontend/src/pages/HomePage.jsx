import CameraCapture from "../components/cameraCapture"

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative flex flex-col">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            {/* Main content - flex-1 takes remaining space */}
            <div className="relative z-10 flex-1 flex flex-col">
                {/* Header Section - Compact */}
                <header className="text-center pt-6 pb-4 px-4 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            Doodle Sketch Generator
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-3 max-w-2xl mx-auto">
                            Take a photo and we'll create a step-by-step doodle tutorial for you!
                        </p>
                    </div>
                </header>

                {/* Camera Component Section - Takes most space */}
                <main className="px-4 pb-4 flex-1 flex items-center justify-center min-h-0">
                    <div className="max-w-2xl w-full">
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4">
                            <CameraCapture />
                        </div>
                    </div>
                </main>

                {/* Features Section - Compact */}
                <section className="px-4 pb-4 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-white/20">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-lg">📸</span>
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">Snap Photo</h3>
                                <p className="text-xs text-gray-600">
                                    Take a clear selfie
                                </p>
                            </div>
                            
                            <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-white/20">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-lg">🎨</span>
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">Get Doodle</h3>
                                <p className="text-xs text-gray-600">
                                    AI creates tutorial
                                </p>
                            </div>
                            
                            <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-md border border-white/20">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-lg">✏️</span>
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">Learn & Draw</h3>
                                <p className="text-xs text-gray-600">
                                    Follow guided steps
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer - Always at bottom */}
            <footer className="text-center py-4 px-4 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm flex-shrink-0">
                <p className="text-sm text-gray-600">
                    Made with ❤️ for aspiring artists everywhere
                </p>
            </footer>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default HomePage