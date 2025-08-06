import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  LinearProgress,
  Fade,
  Slide,
} from '@mui/material';
import {
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Profiles',
      value: '1,248',
      change: '+12%',
      icon: PeopleIcon,
      color: '#00d4ff',
    },
    {
      title: 'AI Analyzed',
      value: '156',
      change: '+8%',
      icon: PsychologyIcon,
      color: '#9c27b0',
    },
    {
      title: 'Matches Found',
      value: '23',
      change: '+3',
      icon: FavoriteIcon,
      color: '#ff6b6b',
    },
    {
      title: 'Compatibility',
      value: '87%',
      change: '+5%',
      icon: TrendingUpIcon,
      color: '#00ff88',
    }
  ];

  const recentActivity = [
    {
      type: 'analysis',
      message: 'AI analyzed profile XSSZ5979 - 86% compatibility',
      time: '2 minutes ago',
      icon: PsychologyIcon,
      color: '#9c27b0'
    },
    {
      type: 'match',
      message: 'New high compatibility match found',
      time: '15 minutes ago',
      icon: FavoriteIcon,
      color: '#ff6b6b'
    },
    {
      type: 'verification',
      message: 'Profile verification completed',
      time: '1 hour ago',
      icon: CheckCircleIcon,
      color: '#00ff88'
    },
    {
      type: 'update',
      message: 'Requirements updated successfully',
      time: '2 hours ago',
      icon: StarIcon,
      color: '#ffa726'
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Fade in timeout={600}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to JodiAI
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your intelligent marriage assistant powered by AI
          </Typography>
        </Box>
      </Fade>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Slide in timeout={600 + index * 100} direction="up">
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: `${stat.color}20`,
                        color: stat.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <stat.icon />
                    </Avatar>
                    <Chip
                      label={stat.change}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={4}>
        {/* Recent Activity */}
        <Grid item xs={12} xl={6}>
          <Slide in timeout={800} direction="left">
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <ScheduleIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    Recent Activity
                  </Typography>
                </Box>
                
                <List>
                  {recentActivity.map((activity, index) => (
                    <ListItem key={index} divider={index < recentActivity.length - 1}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: `${activity.color}20`, color: activity.color, width: 32, height: 32 }}>
                          <activity.icon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.message}
                        secondary={activity.time}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '0.8rem' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} xl={6}>
          <Slide in timeout={800} direction="right">
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <BoltIcon />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    AI Recommendations
                  </Typography>
                </Box>
                
                <Box display="flex" flexDirection="column" gap={2}>
                  {recommendations.map((rec, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {rec.title}
                        </Typography>
                        <Chip
                          label={rec.priority}
                          size="small"
                          color={getPriorityColor(rec.priority)}
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {rec.description}
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        endIcon="→"
                      >
                        {rec.action}
                      </Button>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Fade in timeout={1000}>
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Ready to find your perfect match?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Let our AI analyze profiles and find the best matches for you
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #9c27b0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4de7ff 0%, #ba68c8 100%)',
                  },
                }}
              >
                Browse Profiles
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
              >
                Set Preferences
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Dashboard;
