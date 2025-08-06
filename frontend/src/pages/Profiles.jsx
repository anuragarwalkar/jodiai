import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Search,
  FilterList,
  ExpandMore,
  ExpandLess,
  ErrorOutline,
  Refresh
} from '@mui/icons-material';
import { useProfiles } from '../context/ProfileContext';
import { useRequirements } from '../context/RequirementsContext';
import ProfileCard from '../components/Profile/ProfileCard';
import AIAnalysisModal from '../components/AI/AIAnalysisModal';

const Profiles = () => {
  const { profiles, loading, error, setCurrentProfile, loadProfiles } = useProfiles();
  const { requirements } = useRequirements();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('matchScore');

  // Load profiles on component mount
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setCurrentProfile(profile);
  };

  const handleAIAnalysis = (profile) => {
    setSelectedProfile(profile);
    setShowAIAnalysis(true);
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.occupation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifiedCount = filteredProfiles.filter(p => p.isVerified).length;
  const onlineCount = filteredProfiles.filter(p => p.isOnline).length;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            Discover Profiles
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Find your perfect match with AI-powered recommendations
          </Typography>
        </Box>

        {/* Search and Filter Controls */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300, flex: 1 }}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              endIcon={filterVisible ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setFilterVisible(!filterVisible)}
            >
              Filters
            </Button>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="matchScore">Match Score</MenuItem>
                <MenuItem value="recentlyActive">Recently Active</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </motion.div>

      {/* Filters Panel */}
      <Collapse in={filterVisible}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Age Range
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField size="small" placeholder="Min" type="number" />
                    <TextField size="small" placeholder="Max" type="number" />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Education</InputLabel>
                  <Select label="Education">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="graduate">Graduate</MenuItem>
                    <MenuItem value="postgraduate">Post Graduate</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Location</InputLabel>
                  <Select label="Location">
                    <MenuItem value="">All Cities</MenuItem>
                    <MenuItem value="mumbai">Mumbai</MenuItem>
                    <MenuItem value="pune">Pune</MenuItem>
                    <MenuItem value="nagpur">Nagpur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Income</InputLabel>
                  <Select label="Income">
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="3-5">3-5 Lakh</MenuItem>
                    <MenuItem value="5-10">5-10 Lakh</MenuItem>
                    <MenuItem value="10+">10+ Lakh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2.4}>
                <Box sx={{ pt: 2.5 }}>
                  <Button variant="contained" fullWidth>
                    Apply Filters
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Collapse>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredProfiles.length} profiles
              </Typography>
              <Chip 
                label={`${verifiedCount} verified`} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={`${onlineCount} online`} 
                size="small" 
                color="success" 
                variant="outlined" 
              />
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Loading profiles...
            </Typography>
          </Box>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <Alert 
              severity="error" 
              sx={{ mb: 3, maxWidth: 400 }}
              icon={<ErrorOutline />}
            >
              <Typography variant="h6">Failed to load profiles</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            </Alert>
            <Button 
              variant="contained"
              startIcon={<Refresh />}
              onClick={() => loadProfiles()}
            >
              Try Again
            </Button>
          </Box>
        </motion.div>
      )}

      {/* Profiles Grid */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Grid container spacing={3}>
            {filteredProfiles.map((profile, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={profile.id}>
                <motion.div
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
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}

      {/* Load More */}
      {!loading && !error && filteredProfiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Load More Profiles
            </Button>
          </Box>
        </motion.div>
      )}

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
    </Container>
  );
};

export default Profiles;
