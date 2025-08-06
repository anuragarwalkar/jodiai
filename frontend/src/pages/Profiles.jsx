import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Calendar,
  Verified,
  Camera,
  Brain,
  Filter,
  Search
} from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';
import { useRequirements } from '../context/RequirementsContext';
import ProfileCard from '../components/Profile/ProfileCard';
import AIAnalysisModal from '../components/AI/AIAnalysisModal';

const Profiles = () => {
  const { profiles, loading, error, setCurrentProfile } = useProfiles();
  const { requirements } = useRequirements();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - In real app, this would come from API
  const sampleProfiles = [
    {
      id: '36462085',
      name: 'Priya Sharma',
      age: 28,
      height: '5\' 2"',
      education: 'B.E/B.Tech',
      occupation: 'Software Professional',
      location: 'Mumbai',
      income: 'Rs. 7.5 - 10 Lakh',
      caste: 'Brahmin',
      religion: 'Hindu',
      motherTongue: 'Marathi',
      isVerified: true,
      matchScore: 86,
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b4558781?w=400'],
      lastOnline: 'Last Online today',
      profileTag: 'Verified',
      isOnline: false
    },
    {
      id: '57796041',
      name: 'Anita Patil',
      age: 30,
      height: '5\' 1"',
      education: 'Diploma',
      occupation: 'Finance Professional',
      location: 'Pune',
      income: 'Rs. 4 - 5 Lakh',
      caste: 'Teli',
      religion: 'Hindu',
      motherTongue: 'Marathi',
      isVerified: false,
      matchScore: 91,
      photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'],
      lastOnline: 'Last Online today',
      profileTag: 'Nearby',
      isOnline: true
    },
    {
      id: '40530263',
      name: 'Himali Ninawe',
      age: 30,
      height: '5\' 4"',
      education: 'CA',
      occupation: 'Chartered Accountant',
      location: 'Nagpur',
      income: 'Rs. 15 - 20 Lakh',
      caste: 'Halba Koshti',
      religion: 'Hindu',
      motherTongue: 'Marathi',
      isVerified: false,
      matchScore: 90,
      photos: ['https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400'],
      lastOnline: 'Last Online today',
      profileTag: null,
      isOnline: false
    }
  ];

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setCurrentProfile(profile);
  };

  const handleAIAnalysis = (profile) => {
    setSelectedProfile(profile);
    setShowAIAnalysis(true);
  };

  const filteredProfiles = sampleProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover Profiles</h1>
          <p className="text-gray-400">Find your perfect match with AI-powered recommendations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {filterVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm" />
                  <input type="number" placeholder="Max" className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Education</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>All</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Professional</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>All Cities</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Nagpur</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Income</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
                  <option>Any</option>
                  <option>3-5 Lakh</option>
                  <option>5-10 Lakh</option>
                  <option>10+ Lakh</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Showing {filteredProfiles.length} profiles • 
            <span className="text-cyan-400 ml-1">{filteredProfiles.filter(p => p.isVerified).length} verified</span> • 
            <span className="text-green-400 ml-1">{filteredProfiles.filter(p => p.isOnline).length} online</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm">
              <option>Match Score</option>
              <option>Recently Active</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Profiles Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {filteredProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          >
            <ProfileCard 
              profile={profile} 
              onProfileClick={handleProfileClick}
              onAIAnalysis={handleAIAnalysis}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center"
      >
        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300">
          Load More Profiles
        </button>
      </motion.div>

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {showAIAnalysis && selectedProfile && (
          <AIAnalysisModal
            profile={selectedProfile}
            requirements={requirements}
            onClose={() => setShowAIAnalysis(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profiles;
