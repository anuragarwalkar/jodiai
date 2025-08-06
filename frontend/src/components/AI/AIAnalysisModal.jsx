import React, { useState, useEffect } from 'react';
import { X, Brain, Heart, AlertTriangle, MessageCircle, TrendingUp } from 'lucide-react';

const AIAnalysisModal = ({ profile, requirements, onClose }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        compatibilityScore: 86,
        overallRecommendation: 'Highly Recommended',
        positiveFactors: [
          'Education level matches your preference',
          'Age is within your preferred range',
          'Same city - convenient for meetings',
          'Professional background aligns well',
          'Verified profile adds credibility'
        ],
        negativeFactors: [
          'Income below your preferred range',
          'Different subcaste background'
        ],
        conversationStarters: [
          'Ask about her experience in the tech industry',
          'Discuss favorite places in Mumbai',
          'Talk about career aspirations and goals',
          'Share thoughts on work-life balance'
        ],
        redFlags: [
          'Limited profile information available'
        ],
        summary: 'This profile shows strong compatibility based on your requirements. The educational and professional backgrounds align well, and the location match is excellent for building a relationship. While there are minor differences in income expectations, the overall profile demonstrates good potential for a meaningful connection.',
        nextSteps: 'Consider sending an interest or message to initiate conversation. Focus on common professional interests and shared location experiences.'
      });
      setLoading(false);
    }, 2000);
  }, [profile, requirements]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecommendationColor = (recommendation) => {
    if (recommendation === 'Highly Recommended') return 'bg-green-500/20 text-green-400';
    if (recommendation === 'Recommended') return 'bg-blue-500/20 text-blue-400';
    if (recommendation === 'Consider') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">AI Analysis</h2>
              <p className="text-sm text-gray-400">{profile.name} • {profile.age} years</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                <span className="text-gray-400">AI is analyzing the profile...</span>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Compatibility Score */}
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(analysis.compatibilityScore)} mb-2`}>
                  {analysis.compatibilityScore}%
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getRecommendationColor(analysis.overallRecommendation)}`}>
                  {analysis.overallRecommendation}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">AI Summary</h3>
                <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Positive Factors */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-green-400">Positive Factors</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.positiveFactors.map((factor, index) => (
                      <li key={index} className="text-green-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas of Concern */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">Areas to Consider</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.negativeFactors.map((factor, index) => (
                      <li key={index} className="text-yellow-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conversation Starters */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-cyan-400">Conversation Starters</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.conversationStarters.map((starter, index) => (
                    <li key={index} className="text-cyan-300 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                      {starter}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-red-400">Points to Note</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.redFlags.map((flag, index) => (
                      <li key={index} className="text-red-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Recommended Next Steps</h3>
                <p className="text-purple-300 text-sm">{analysis.nextSteps}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Analysis powered by AI • Generated on {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
              Send Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisModal;
