import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface VoiceAgentProps {
  onClose: () => void;
}

const VoiceAgent = ({ onClose }: VoiceAgentProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleIframeError = () => {
      setError('Unable to connect to voice service. Please try again later.');
    };

    window.addEventListener('error', handleIframeError, true);
    
    return () => {
      window.removeEventListener('error', handleIframeError, true);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-ocean-blue/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[90vw] h-[90vh] max-w-4xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        {error ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <p className="text-gray-700">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <iframe 
            src="https://app.millis.ai/agents/embedded?id=-OFmWxGbA7UUqEGc41Xp&k=xGqV75chKbVO83pcqxTRxjp6ifjMorLk" 
            width="100%" 
            height="100%" 
            allow="microphone; camera"
            className="border-0"
            title="Voice Agent"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          />
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;