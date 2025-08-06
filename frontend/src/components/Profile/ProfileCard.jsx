import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  Divider
} from '@mui/material';
import {
  Favorite,
  LocationOn,
  School,
  Work,
  Verified,
  Psychology,
  Star,
  CameraAlt,
  FiberManualRecord
} from '@mui/icons-material';

const ProfileCard = ({ profile, onProfileClick, onAIAnalysis }) => {
  const getMatchScoreColor = (score) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        },
        cursor: 'pointer'
      }}
      onClick={() => onProfileClick(profile)}
    >
      {/* Profile Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={profile.photos && profile.photos.length > 0 ? 
            (profile.photos[0].url || profile.photos[0].thumbnailUrl) : 
            'https://via.placeholder.com/300x200?text=No+Photo'
          }
          alt={profile.name}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Online Status */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <FiberManualRecord 
            sx={{ 
              fontSize: 12, 
              color: profile.isOnline ? 'success.main' : 'grey.500' 
            }} 
          />
        </Box>

        {/* Photo Count */}
        {profile.albumCount > 1 && (
          <Chip
            icon={<CameraAlt />}
            label={profile.albumCount}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white'
            }}
          />
        )}

        {/* Match Score */}
        <Chip
          icon={<Star />}
          label={`${profile.matchScore}%`}
          color={getMatchScoreColor(profile.matchScore)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontWeight: 'bold'
          }}
        />

        {/* Verification Badge */}
        {profile.isVerified && (
          <Chip
            icon={<Verified />}
            label="Verified"
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Profile Info */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.age} years • {profile.height}
          </Typography>
        </Box>

        {/* Details */}
        <Stack spacing={1} sx={{ mb: 2, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {profile.education}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Work sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {profile.occupation}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {profile.location}
            </Typography>
          </Box>
        </Stack>

        {/* Tags */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {profile.profileTag && (
              <Chip 
                label={profile.profileTag} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
            )}
            {profile.motherTongue && (
              <Chip 
                label={profile.motherTongue} 
                size="small" 
                variant="outlined" 
              />
            )}
          </Stack>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Favorite />}
            sx={{ flex: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle like action
            }}
          >
            Like
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<Psychology />}
            sx={{ flex: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onAIAnalysis(profile);
            }}
          >
            AI Match
          </Button>
        </Stack>

        {/* Last Online */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {profile.lastOnline}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
