import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Brain, 
  Heart, 
  TrendingUp, 
  Zap,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Profiles',
      value: '1,248',
      change: '+12%',
      icon: Users,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      title: 'AI Analyzed',
      value: '156',
      change: '+8%',
      icon: Brain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Matches Found',
      value: '23',
      change: '+3',
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20'
    },
    {
      title: 'Compatibility',
      value: '87%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  const recentActivity = [
    {
      type: 'analysis',
      message: 'AI analyzed profile XSSZ5979 - 86% compatibility',
      time: '2 minutes ago',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      type: 'match',
      message: 'New high compatibility match found',
      time: '15 minutes ago',
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      type: 'verification',
      message: 'Profile verification completed',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      type: 'update',
      message: 'Requirements updated successfully',
      time: '2 hours ago',
      icon: Star,
      color: 'text-yellow-400'
    }
  ];

  const recommendations = [
    {
      title: 'Update Your Requirements',
      description: 'Your preferences seem to have evolved. Update them for better matches.',
      action: 'Update Now',
      priority: 'high'
    },
    {
      title: 'Enable Auto-Analysis',
      description: 'Let AI automatically analyze new profiles as they arrive.',
      action: 'Enable',
      priority: 'medium'
    },
    {
      title: 'Verify Your Profile',
      description: 'Verified profiles get 3x more responses.',
      action: 'Verify',
      priority: 'low'
    }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Welcome to JodiAI
        </h1>
        <p className="text-gray-400 text-lg">
          Your intelligent marriage assistant powered by AI
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg"
              >
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">AI Recommendations</h2>
          </div>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium">{rec.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rec.priority === 'high' 
                      ? 'bg-red-500/20 text-red-400' 
                      : rec.priority === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{rec.description}</p>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
                  {rec.action} →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-gray-700 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Ready to find your perfect match?</h2>
        <p className="text-gray-400 mb-6">Let our AI analyze profiles and find the best matches for you</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Browse Profiles
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-600">
            Set Preferences
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
