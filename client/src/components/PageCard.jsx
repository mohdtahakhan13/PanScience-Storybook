import { useState, useEffect } from 'react';

export default function PageCard({ page, index }) {
  const [isReading, setIsReading] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const toggleReading = () => {
    if (isReading) {
      stopReading();
    } else {
      startReading();
    }
  };

  const startReading = () => {
    window.speechSynthesis.cancel();
    const newUtterance = new SpeechSynthesisUtterance();
    newUtterance.text = `${page.page_title}. ${page.page_text}`;
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;
    newUtterance.volume = 1;

    newUtterance.onend = () => {
      setIsReading(false);
      setUtterance(null);
    };

    newUtterance.onerror = (event) => {
      console.error('SpeechSynthesis error:', event);
      setIsReading(false);
      setUtterance(null);
    };

    window.speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
    setIsReading(true);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setUtterance(null);
  };

  useEffect(() => {
    return () => stopReading();
  }, []);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-xl transition duration-200 relative group transform hover:-translate-y-1">
      {/* Read Aloud Button */}
      <button
        onClick={toggleReading}
        className={`absolute top-3 right-3 p-2 rounded-full shadow-lg z-10 transition-all ${
          isReading 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
        aria-label={isReading ? "Stop reading" : "Read aloud"}
        title={isReading ? "Stop reading" : "Read aloud"}
      >
        {isReading ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Page Number Badge */}
      <div className="absolute top-3 left-3 bg-gray-900/80 text-purple-300 px-2 py-1 rounded-md text-sm font-medium">
        Page {index + 1}
      </div>

      {/* Story Image - Fixed to maintain aspect ratio */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <img 
          src={page.imageDataUrl} 
          alt={`Page ${index + 1} illustration`} 
          className="max-h-full max-w-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
      </div>

      {/* Story Content */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-white mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {page.page_title}
        </h3>
        <div className="relative">
          <div className="absolute -left-5 top-0 h-full w-0.5 bg-purple-600/30"></div>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap pl-2">
            {page.page_text}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-2 border-t border-gray-700">
        <button 
          onClick={toggleReading}
          className={`text-sm font-medium px-3 py-1.5 rounded-md flex items-center ${
            isReading
              ? 'bg-red-900/30 text-red-300 hover:bg-red-900/40'
              : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/40'
          }`}
        >
          {isReading ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Stop Reading
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Read Aloud
            </>
          )}
        </button>
      </div>
    </div>
  );
}