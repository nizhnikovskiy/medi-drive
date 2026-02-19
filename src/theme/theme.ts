import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: '#009367',
        light: '#00B37E',
        dark: '#174B3B',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'light' ? '#60697D' : '#8A92A6',
        light: '#8A92A6',
        dark: '#4A5166',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#DC2626',
        light: '#EF4444',
        dark: '#B91C1C',
      },
      warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
      },
      success: {
        main: '#009367',
        light: '#00B37E',
        dark: '#174B3B',
      },
      background: {
        default: mode === 'light' ? '#F5F6F8' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#262022',
      },
      text: {
        primary: mode === 'light' ? '#262022' : '#FAFFFD',
        secondary: mode === 'light' ? '#60697D' : '#8A92A6',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        letterSpacing: '-0.005em',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        letterSpacing: '0em',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        letterSpacing: '0em',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#262022',
            color: mode === 'light' ? '#262022' : '#FAFFFD',
            boxShadow: mode === 'light' 
              ? '0 1px 0 rgba(0, 0, 0, 0.05)' 
              : '0 1px 0 rgba(255, 255, 255, 0.05)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            fontSize: '0.9375rem',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 147, 103, 0.25)',
            },
          },
          containedPrimary: {
            backgroundColor: '#009367',
            '&:hover': {
              backgroundColor: '#00B37E',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
          },
        },
        defaultProps: {
          elevation: 0,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #3A3638',
            backgroundImage: 'none',
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.04)' 
              : '0 1px 3px rgba(0, 0, 0, 0.2)',
          },
        },
        defaultProps: {
          elevation: 0,
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #3A3638',
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: '16px 0',
            },
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? '#FAFFFD' : '#1A1818',
          },
        },
        defaultProps: {
          elevation: 0,
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '0.8125rem',
            borderRadius: 16,
          },
        },
        variants: [
          {
            props: { color: 'success' },
            style: {
              backgroundColor: mode === 'light' ? '#E1F4ED' : '#174B3B',
              color: mode === 'light' ? '#009367' : '#00B37E',
            },
          },
          {
            props: { color: 'warning' },
            style: {
              backgroundColor: mode === 'light' ? '#FEF3C7' : '#92400E',
              color: mode === 'light' ? '#D97706' : '#FCD34D',
            },
          },
          {
            props: { color: 'error' },
            style: {
              backgroundColor: mode === 'light' ? '#FEE2E2' : '#7F1D1D',
              color: mode === 'light' ? '#DC2626' : '#FCA5A5',
            },
          },
        ],
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '16px',
            borderBottom: mode === 'light' ? '1px solid #E5E7EB' : '1px solid #3A3638',
          },
          head: {
            fontWeight: 700,
            backgroundColor: mode === 'light' ? '#EDF9F5' : '#1A1818',
            color: mode === 'light' ? '#174B3B' : '#00B37E',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};
