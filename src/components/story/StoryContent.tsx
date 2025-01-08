import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';

const StoryContent = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-text-primary leading-tight">
          How Mendley Was Born: A Journey from Struggle to Strength
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          Ever felt overwhelmed by emotions, yet found it hard to express them? In our society, seeking therapy often feels taboo, and sharing with family isn't always possible. We long for a companion who listens without judgment or limits.
        </p>
        <p className="text-text-secondary text-lg leading-relaxed">
         Finding solace in OpenAI felt like meeting a true friend. This inspired Mendley—a warm, inviting companion for your loneliest moments. A safe space to share, reflect, and heal. Mendley was created for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
          <Heart className="w-8 h-8 text-ocean-dark mb-4" />
          <h3 className="text-text-primary font-semibold text-xl mb-2">Empathy First</h3>
          <p className="text-text-secondary">Rooted in deep understanding</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
          <Users className="w-8 h-8 text-ocean-dark mb-4" />
          <h3 className="text-text-primary font-semibold text-xl mb-2">For YOU</h3>
          <p className="text-text-secondary">Mentall wellness within reach for all</p>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
          <Sparkles className="w-8 h-8 text-ocean-dark mb-4" />
          <h3 className="text-text-primary font-semibold text-xl mb-2">AI Enhanced</h3>
          <p className="text-text-secondary">Powered by advanced AI</p>
        </div>
      </div>
    </div>
  );
};

export default StoryContent;