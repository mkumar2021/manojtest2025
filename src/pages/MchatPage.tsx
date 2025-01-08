import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatContainer from '../components/mchat/layout/ChatContainer';
import ChatHeader from '../components/mchat/ChatHeader';
import MessageList from '../components/mchat/messages/MessageList';
import ChatInputArea from '../components/mchat/input/ChatInputArea';
import { useChat } from '../hooks/useChat';
import { Mic, MessageCircle } from 'lucide-react';

const MchatPage = () => {
  const location = useLocation();
  const initialMode = location.state?.mode || 'Friend Chat';
  const [mode, setMode] = useState(initialMode);
  const [activeTab, setActiveTab] = useState<'chat' | 'speak'>('speak');
  const { messages, isLoading, sendMessage, startConversation } = useChat(mode);

  useEffect(() => {
    if (messages.length === 0) {
      startConversation();
    }
  }, [mode, startConversation]);

  return (
    <ChatContainer>
      <ChatHeader mode={mode} />
      
      {/* Tabs with updated styling */}
      <div className="bg-ocean-dark/50 backdrop-blur-sm border-b border-white/10 py-2">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-6 items-center">
            {/* Speak Tab First */}
            <button
              onClick={() => setActiveTab('speak')}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                ${activeTab === 'speak'
                  ? 'bg-gradient-to-r from-ocean-light to-ocean text-white shadow-lg scale-105 border border-white/20'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Mic className="w-5 h-5" />
              Speak
            </button>

            {/* Chat Tab */}
            <button
              onClick={() => setActiveTab('chat')}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                ${activeTab === 'chat'
                  ? 'bg-gradient-to-r from-ocean to-ocean-dark text-white shadow-lg scale-105 border border-white/20'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'chat' ? (
        <>
          <MessageList messages={messages} isLoading={isLoading} />
          <ChatInputArea 
            onSendMessage={sendMessage} 
            isLoading={isLoading}
            showEndSession={messages.length > 0}
            onVoiceClick={() => {}}
          />
        </>
      ) : (
        <div className="flex-1 bg-gradient-to-br from-ocean-light/10 to-ocean-dark/10">
          <div className="h-full w-full p-4">
            <div className="bg-gradient-to-br from-ocean-light/20 to-ocean-dark/20 backdrop-blur-sm rounded-2xl h-full overflow-hidden border border-white/10 shadow-lg">
              <iframe 
                src="https://app.millis.ai/agents/embedded?id=-OFmWxGbA7UUqEGc41Xp&k=xGqV75chKbVO83pcqxTRxjp6ifjMorLk" 
                width="100%" 
                height="100%" 
                allow="microphone; camera"
                className="border-0 bg-transparent"
                title="Voice Agent"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
                style={{
                  backgroundColor: 'transparent',
                  colorScheme: 'dark'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </ChatContainer>
  );
};

export default MchatPage;