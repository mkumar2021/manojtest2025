import React, { useState } from 'react';
import EmotionCard from './EmotionCard';
import { Brain, Cloud, Battery, Flame, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import SelfDoubtModal from '../modals/SelfDoubtModal';
import { useSelfDoubtModal } from '../../hooks/useSelfDoubtModal';
import { useNavigate } from 'react-router-dom';

interface HandholdStepsSectionProps {
  onModeSelect: (mode: string) => void;
}

const emotions = [
  {
    id: 'self-doubt',
    title: 'Embrace the Day',
    description: 'Transform doubt into self-belief',
    icon: Brain,
    gradient: 'from-violet-400 to-purple-600',
    bgGradient: 'from-indigo-50/90 to-indigo-100/90'
  },
  {
    id: 'worry',
    title: 'Ease Within',
    description: 'Find peace in uncertain times',
    icon: Cloud,
    gradient: 'from-sky-400 to-blue-600',
    bgGradient: 'from-indigo-50/90 to-indigo-100/90'
  },
  {
    id: 'confidence',
    title: 'Empower Yourself',
    description: 'Build lasting self-confidence',
    icon: Battery,
    gradient: 'from-emerald-400 to-teal-600',
    bgGradient: 'from-indigo-50/90 to-indigo-100/90'
  },
  {
    id: 'burnout',
    title: 'Revive You',
    description: 'Restore your energy and balance',
    icon: Flame,
    gradient: 'from-amber-400 to-orange-600',
    bgGradient: 'from-indigo-50/90 to-indigo-100/90'
  },
  {
    id: 'anger',
    title: 'Restoring Balance',
    description: 'Channel emotions positively',
    icon: Zap,
    gradient: 'from-rose-400 to-red-600',
    bgGradient: 'from-indigo-50/90 to-indigo-100/90'
  }
];

const HandholdStepsSection = ({ onModeSelect }: HandholdStepsSectionProps) => {
  const { isOpen, openModal, closeModal } = useSelfDoubtModal();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEmotionClick = (id: string) => {
    if (id === 'self-doubt') {
      openModal();
    } else {
      const emotion = emotions.find(e => e.id === id);
      if (emotion) {
        navigate('/mchat', { state: { mode: emotion.title } });
      }
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between text-white hover:bg-white/20 transition-colors"
      >
        <span className="font-medium">Select Your Journey</span>
        {isDropdownOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      <div className={`space-y-4 transition-all duration-300 overflow-hidden ${
        isDropdownOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {emotions.map((emotion) => (
          <div key={emotion.id} onClick={() => handleEmotionClick(emotion.id)}>
            <EmotionCard {...emotion} />
          </div>
        ))}
      </div>

      <SelfDoubtModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        onModeSelect={onModeSelect}
      />
    </div>
  );
};

export default HandholdStepsSection;