import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OpenMindSection = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/mchat')}
      className="bg-gradient-to-br from-violet-100/90 to-purple-200/90 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer h-[120px] flex items-center"
    >
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-rose-400 to-rose-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-rose-900 mb-1">Ana</h3>
          <p className="text-rose-800">Your ever-present AI companion, ready to listen and understand</p>
        </div>
      </div>
    </div>
  );
};

export default OpenMindSection;