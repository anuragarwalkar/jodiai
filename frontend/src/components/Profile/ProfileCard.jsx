import React from 'react';
import { 
  Heart, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Calendar,
  Verified,
  Brain,
  Star,
  Camera
} from 'lucide-react';

const ProfileCard = ({ profile, onProfileClick, onAIAnalysis }) => {
  const getMatchScoreColor = (score) => {
    if (score >= 85) return 'text-green-400 bg-green-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getStatusColor = (isOnline) => {
    return isOnline ? 'bg-green-400' : 'bg-gray-400';
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group">
      {/* Profile Image */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-12 bg-gray-800">
          {profile.photos && profile.photos.length > 0 ? (
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </div>
        
        {/* Online Status */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(profile.isOnline)}`}></div>
          {profile.isOnline && (
            <span className="text-xs text-green-400 font-medium bg-black/50 px-2 py-1 rounded">
              Online
            </span>
          )}
        </div>

        {/* Match Score */}
        <div className="absolute top-3 right-3">
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(profile.matchScore)}`}>
            {profile.matchScore}% Match
          </div>
        </div>

        {/* Profile Tag */}
        {profile.profileTag && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
              {profile.profileTag}
            </span>
          </div>
        )}

        {/* Verification Badge */}
        {profile.isVerified && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full">
              <Verified className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4">
        {/* Name and Age */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {profile.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{profile.age} years</span>
              <span>•</span>
              <span>{profile.height}</span>
            </div>
          </div>
          <button
            onClick={() => onAIAnalysis(profile)}
            className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            <Brain className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span>{profile.education}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{profile.occupation}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Income */}
        {profile.income && profile.income !== 'No Income' && (
          <div className="mb-4">
            <span className="text-xs text-gray-400">Income:</span>
            <span className="text-sm text-green-400 ml-2">{profile.income}</span>
          </div>
        )}

        {/* Last Online */}
        <div className="mb-4">
          <span className="text-xs text-gray-500">{profile.lastOnline}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onProfileClick(profile)}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            View Profile
          </button>
          <button className="p-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
            <Star className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
