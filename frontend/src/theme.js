import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
      light: '#4de7ff',
      dark: '#0099cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9999',
      dark: '#cc4444',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    surface: {
      main: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    success: {
      main: '#00ff88',
    },
    warning: {
      main: '#ffa726',
    },
    error: {
      main: '#ff5252',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333333',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            borderColor: '#00d4ff',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 212, 255, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4de7ff 0%, #00d4ff 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 25px rgba(0, 212, 255, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111111',
          borderRight: '1px solid #333333',
        },
      },
    },
  },
});

export default theme;
