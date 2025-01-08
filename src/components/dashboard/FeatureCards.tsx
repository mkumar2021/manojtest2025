import React from 'react';
import { MessageCircle, AtSign, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mindPalaceIcon from '../../icon/mind-palace.png';

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      <div 
        onClick={() => navigate('/ana')}
        className="bg-gradient-to-br from-pink-50/90 to-pink-100/90 rounded-2xl p-6 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
      >
        <div className="bg-gradient-to-br from-pink-400 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-pink-900 text-xl font-semibold mb-2">Ana</h3>
        <p className="text-pink-800/90">Your Forever Friend</p>
      </div>

      <div 
        onClick={() => navigate('/mind-palace')}
        className="bg-gradient-to-br from-violet-50/90 to-violet-100/90 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      >
        <div className="bg-gradient-to-br from-violet-400 to-violet-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-4">
          <img 
            src={mindPalaceIcon} 
            alt="Mind Palace" 
            className="w-6 h-6"
          />
        </div>
        <h3 className="text-violet-900 text-xl font-semibold mb-2">Mind Palace</h3>
        <p className="text-violet-800/90">Discover the Real You</p>
      </div>

      <div 
        onClick={() => navigate('/journal')}
        className="bg-gradient-to-br from-emerald-50/90 to-emerald-100/90 rounded-2xl p-6 backdrop-blur-sm border border-white/50 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
      >
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
          <Book className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-emerald-900 text-xl font-semibold mb-2">Journal</h3>
        <p className="text-emerald-800/90">AI-Powered Journal to Inspire and Drive You Forward</p>
      </div>
    </div>
  );
};

export default FeatureCards;