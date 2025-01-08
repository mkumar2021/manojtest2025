import React from 'react';
import { X, CheckCircle, Clock, Lightbulb, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionPlan {
  title: string;
  overview: string;
  steps: Array<{
    step: string;
    action: string;
    timeframe: string;
    tips: string[];
    progress_markers: string[];
  }>;
  resources: string[];
  motivation: string;
}

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: ActionPlan;
}

const ActionPlanModal = ({ isOpen, onClose, plan }: ActionPlanModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-2 text-gray-600">{plan.overview}</p>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Steps */}
              <div className="space-y-6">
                {plan.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-ocean-dark text-white rounded-full flex items-center justify-center">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{step.action}</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Timeframe */}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{step.timeframe}</span>
                      </div>

                      {/* Tips */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Tips
                        </h4>
                        <ul className="space-y-1 ml-6 list-disc text-gray-600">
                          {step.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress Markers */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Progress Markers
                        </h4>
                        <ul className="space-y-1 ml-6 list-disc text-gray-600">
                          {step.progress_markers.map((marker, i) => (
                            <li key={i}>{marker}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
                  <Book className="w-4 h-4" />
                  Helpful Resources
                </h4>
                <ul className="space-y-1 ml-6 list-disc text-gray-600">
                  {plan.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>

              {/* Motivation */}
              <div className="mt-6 bg-ocean-light/20 p-4 rounded-lg text-ocean-dark">
                {plan.motivation}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActionPlanModal;