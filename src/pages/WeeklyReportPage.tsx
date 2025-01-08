import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Brain, Star, Sparkles, Trophy, Target } from 'lucide-react';
import { format, subDays } from 'date-fns';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { WeeklyReport } from '../types/analysis';
import { generateWeeklyReport, getLastSevenDaysInteractions } from '../utils/analysis';
import chatInteractions from '../../data/chat_interaction_analysis.json';

const WeeklyReportPage = () => {
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const startDate = subDays(today, 7);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        const recentInteractions = getLastSevenDaysInteractions(chatInteractions);
        const weeklyReport = await generateWeeklyReport(recentInteractions);
        setReport(weeklyReport);
      } catch (err) {
        console.error('Error generating weekly report:', err);
        setError('Failed to generate weekly report. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-dark"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link 
          to="/mind-palace" 
          className="inline-flex items-center text-white mb-8 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Mind Palace
        </Link>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Weekly Report</h1>
            <p className="text-gray-600">
              {format(startDate, 'MMM d')} - {format(today, 'MMM d, yyyy')}
            </p>
          </div>

          <div className="space-y-8">
            {/* Headline */}
            <div className="bg-ocean-light/30 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-ocean-dark mb-2">Weekly Headline</h3>
              <p className="text-gray-700">{report?.headline}</p>
            </div>

            {/* Analysis Points */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-ocean-dark" />
                Weekly Analysis
              </h3>
              <ul className="space-y-3">
                {report?.analysis_points.map((point, index) => (
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
                {report?.key_insights.map((insight, index) => (
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
                {report?.emotional_landscape.map((emotion, index) => (
                  <div key={index} className="bg-white shadow rounded-full px-4 py-2 flex items-center gap-2">
                    <span className="text-2xl">{emotion.emoji}</span>
                    <span className="text-gray-700">{emotion.name}</span>
                    <span className="text-ocean-dark font-medium">{emotion.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actionable Items */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-ocean-dark" />
                Actionable Items
              </h3>
              <div className="space-y-4">
                {report?.actionable_items.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : item.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-xs text-gray-500">{item.timeframe}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            {/* Theme Landscape */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme Landscape</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {report?.themes.map((theme, index) => (
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
                {report?.weekly_wins.map((win, index) => (
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklyReportPage;