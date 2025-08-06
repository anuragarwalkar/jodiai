import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Psychology as PsychologyIcon,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/profiles', icon: PeopleIcon, label: 'Profiles' },
    { path: '/requirements', icon: SettingsIcon, label: 'Requirements' },
    { path: '/analysis', icon: PsychologyIcon, label: 'AI Analysis' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250, mt: 2 }}>
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <FavoriteIcon sx={{ color: 'secondary.main', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', background: theme.palette.primary.main, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            JodiAI
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Smart Marriage Assistant
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <FavoriteIcon sx={{ color: 'secondary.main', fontSize: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              JodiAI
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              Smart Marriage Assistant
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <IconButton
                  key={item.path}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 0.5,
                    bgcolor: isActive(item.path) ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive(item.path) ? 'primary.dark' : 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <item.icon />
                </IconButton>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 4 },
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Fade in timeout={600}>
            <Box>
              {children}
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNavigation
          value={location.pathname}
          onChange={(event, newValue) => navigate(newValue)}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={<item.icon />}
              sx={{
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              }}
            />
          ))}
        </BottomNavigation>
      )}

      {/* Background Effects */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)
          `,
        }}
      />
    </Box>
  );
};

export default Layout;
