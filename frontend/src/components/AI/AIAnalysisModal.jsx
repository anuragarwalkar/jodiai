import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Close,
  Psychology,
  Favorite,
  Warning,
  Chat,
  TrendingUp,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

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
        summary: 'This profile shows strong compatibility based on your requirements. The educational and professional backgrounds align well, and the location match is excellent for building a relationship.',
        nextSteps: 'Consider sending an interest or message to initiate conversation. Focus on common professional interests and shared location experiences.'
      });
      setLoading(false);
    }, 2000);
  }, [profile, requirements]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getRecommendationColor = (recommendation) => {
    if (recommendation === 'Highly Recommended') return 'success';
    if (recommendation === 'Recommended') return 'primary';
    if (recommendation === 'Consider') return 'warning';
    return 'error';
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Psychology color="primary" />
            <Box>
              <Typography variant="h6" component="div">
                AI Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.name} • {profile.age} years
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress sx={{ mr: 2 }} />
            <Typography color="text.secondary">
              AI is analyzing the profile...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {/* Compatibility Score */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h2" 
                color={getScoreColor(analysis.compatibilityScore)} 
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {analysis.compatibilityScore}%
              </Typography>
              <Chip
                label={analysis.overallRecommendation}
                color={getRecommendationColor(analysis.overallRecommendation)}
                size="large"
                sx={{ fontSize: '1rem', py: 1 }}
              />
            </Box>

            {/* Summary */}
            <Card sx={{ mb: 3, bgcolor: 'action.hover' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp />
                  AI Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {analysis.summary}
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={3}>
              {/* Positive Factors */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                      <CheckCircle />
                      Positive Factors
                    </Typography>
                    <List dense>
                      {analysis.positiveFactors.map((factor, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={factor}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Areas for Consideration */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'warning.main' }}>
                      <Warning />
                      Areas for Consideration
                    </Typography>
                    <List dense>
                      {analysis.negativeFactors.map((factor, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Warning color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={factor}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Conversation Starters */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chat />
                      Conversation Starters
                    </Typography>
                    <List dense>
                      {analysis.conversationStarters.map((starter, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Chat color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={starter}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Next Steps */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: 'primary.50' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Next Steps
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.nextSteps}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Button 
          variant="contained" 
          startIcon={<Favorite />}
          onClick={() => {
            // Handle sending interest
            onClose();
          }}
        >
          Send Interest
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIAnalysisModal;
