import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Brain, Star, Sparkles, Trophy } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeeklyReportModal = ({ isOpen, onClose }: WeeklyReportModalProps) => {
  const today = new Date();
  const startDate = subDays(today, 7);

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
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Weekly Report</h2>
                <p className="text-gray-600">
                  {format(startDate, 'MMM d')} - {format(today, 'MMM d, yyyy')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] space-y-8">
              {/* Headline */}
              <div className="bg-ocean-light/30 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-ocean-dark mb-2">Weekly Headline</h3>
                <p className="text-gray-700">A week of significant emotional growth and self-discovery</p>
              </div>

              {/* Analysis Points */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-ocean-dark" />
                  Weekly Analysis
                </h3>
                <ul className="space-y-3">
                  {[
                    "Showed consistent emotional regulation throughout challenging situations",

                  ].map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="w-6 h-6 bg-ocean-light/50 rounded-full flex items-center justify-center flex-shrink-0 text-ocean-dark font-medium">
                        {index + 1}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Insights */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-ocean-dark" />
                  Key Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Morning routines significantly impact daily mood",

                  ].map((insight, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emotional Landscape */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-ocean-dark" />
                  Emotional Landscape
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { emoji: "😊", name: "Joy", percentage: "45%" },
                    { emoji: "😌", name: "Calm", percentage: "30%" },
                    { emoji: "🤔", name: "Contemplative", percentage: "15%" },
                    { emoji: "😤", name: "Frustrated", percentage: "10%" }
                  ].map((emotion, index) => (
                    <div key={index} className="bg-white shadow rounded-full px-4 py-2 flex items-center gap-2">
                      <span className="text-2xl">{emotion.emoji}</span>
                      <span className="text-gray-700">{emotion.name}</span>
                      <span className="text-ocean-dark font-medium">{emotion.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Landscape */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme Landscape</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Personal Growth",
          
                    "Learning"
                  ].map((theme, index) => (
                    <div key={index} className="bg-ocean-light/30 p-4 rounded-xl text-center">
                      <p className="text-ocean-dark font-medium">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Wins */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-ocean-dark" />
                  Weekly Wins
                </h3>
                <div className="space-y-4">
                  {[
                    "Completed all daily meditation sessions",
                    "Maintained consistent exercise routine",
                    "Successfully handled a challenging work situation",
                    "Improved communication in relationships"
                  ].map((win, index) => (
                    <div key={index} className="flex items-center gap-3 bg-green-50 p-4 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        🏆
                      </div>
                      <p className="text-gray-700">{win}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeeklyReportModal;