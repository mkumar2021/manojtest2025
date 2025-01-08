import React, { useState } from 'react';
import { ArrowRight, Brain, Star, Sparkles, ListChecks } from 'lucide-react';
import { ChatAnalysis } from '../../../types/chat';
import { generateActionPlan } from '../../../utils/actionPlan';
import ActionPlanModal from './ActionPlanModal';

interface AnalysisSectionProps {
  analysis: ChatAnalysis;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ analysis }) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [actionPlan, setActionPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);

  const handleTakeAction = async (suggestion: string) => {
    try {
      setIsLoading(true);
      setSelectedSuggestion(suggestion);
      const plan = await generateActionPlan(suggestion);
      setActionPlan(plan);
      setShowActionPlan(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderActionItemsContent = () => (
    <div className="space-y-4">
      {analysis.suggestions.map((suggestion, index) => (
        <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="w-6 h-6 bg-ocean-dark text-white rounded-full flex items-center justify-center flex-shrink-0">
            {index + 1}
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 mb-2">{suggestion}</p>
            <button
              onClick={() => handleTakeAction(suggestion)}
              className="flex items-center gap-2 text-sm text-ocean-dark hover:text-ocean transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Take action now</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Headline */}
      <h2 className="text-2xl font-semibold text-gray-900">
        {analysis.headline}
      </h2>

      {/* Analysis */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-ocean-dark flex-shrink-0 mt-1" />
          <p className="text-gray-700 leading-relaxed">{analysis.analysis}</p>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-ocean-dark/10 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-ocean-dark flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Key Insight</h3>
            <p className="text-gray-700">{analysis.keyInsight}</p>
          </div>
        </div>
      </div>

      {/* Emotional Landscape */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Emotional Landscape</h3>
        <div className="flex flex-wrap gap-4">
          {analysis.emotions.map((emotion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm"
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="text-gray-700">{emotion.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="w-5 h-5 text-ocean-dark" />
          <h3 className="font-semibold text-gray-900">Suggested Next Steps</h3>
        </div>
        {renderActionItemsContent()}
      </div>

      {/* Action Plan Modal */}
      {actionPlan && (
        <ActionPlanModal
          isOpen={showActionPlan}
          onClose={() => setShowActionPlan(false)}
          plan={actionPlan}
        />
      )}
    </div>
  );
};

export default AnalysisSection;