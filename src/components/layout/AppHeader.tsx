import { AppBar, Toolbar, Tabs, Tab, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { Brightness4, Brightness7, NoteAdd, ListAlt } from '@mui/icons-material';
import { useThemeMode } from '../../theme/ThemeContextProvider';

interface AppHeaderProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

export const AppHeader = ({ activeTab, onTabChange }: AppHeaderProps) => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
    >
      <Toolbar 
        sx={{ 
          gap: { xs: 1, sm: 3 },
          px: { xs: 2, sm: 4 },
          minHeight: { xs: 64, sm: 70 },
        }}
      >
        <Box
          component="img"
          src="/logo.svg"
          alt="MediDrive"
          sx={{
            height: { xs: 28, sm: 32 },
            width: 'auto',
            minWidth: 'fit-content',
          }}
        />

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: { xs: 64, sm: 70 },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: 'primary.main',
              },
              '& .MuiTab-root': {
                minHeight: { xs: 64, sm: 70 },
                textTransform: 'none',
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                fontWeight: 600,
                px: { xs: 2, sm: 3 },
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' 
                      ? theme.palette.primary.main + '0A' 
                      : theme.palette.primary.main + '14',
                },
                transition: 'all 0.2s ease-in-out',
              },
            }}
            variant={isMobile ? 'fullWidth' : 'standard'}
          >
            <Tab
              icon={<NoteAdd sx={{ fontSize: { xs: 20, sm: 22 } }} />}
              iconPosition="start"
              label={isMobile ? 'Create' : 'Create Service Log'}
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<ListAlt sx={{ fontSize: { xs: 20, sm: 22 } }} />}
              iconPosition="start"
              label={isMobile ? 'Logs' : 'Service Logs'}
              sx={{ gap: 1 }}
            />
          </Tabs>
        </Box>

        <IconButton
          onClick={toggleMode}
          aria-label="toggle theme"
          sx={{ 
            minWidth: 'fit-content',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: (theme) => 
                theme.palette.mode === 'light' 
                  ? theme.palette.secondary.main + '14' 
                  : theme.palette.secondary.light + '14',
              color: 'text.primary',
            },
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
