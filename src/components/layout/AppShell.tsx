import { useState } from 'react';
import { Container, Box, Fade } from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import { AppHeader } from './AppHeader';
import { SnackbarProvider } from '../feedback/SnackbarProvider';
import { CreateServiceLogView } from '../../features/drafts/components/CreateServiceLogView';

const ServiceLogsView = () => {
  return (
    <Box>
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 10,
          px: 3,
        }}
      >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: (theme) => 
                theme.palette.mode === 'light' ? 'success.light' : 'success.dark',
              mb: 3,
            }}
          >
            <ListAlt sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
        <h2 
          style={{ 
            fontWeight: 700, 
            fontSize: '1.75rem', 
            marginBottom: '0.75rem',
            color: 'inherit',
          }}
        >
          Service Logs
        </h2>
        <p 
          style={{ 
            fontSize: '1rem',
            color: 'inherit',
            opacity: 0.7,
          }}
        >
          Table will be implemented in Phase 7
        </p>
      </Box>
    </Box>
  );
};

export const AppShell = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SnackbarProvider>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3 },
            flexGrow: 1,
          }}
        >
          <Fade in={activeTab === 0} timeout={300} unmountOnExit>
            <Box>
              <CreateServiceLogView />
            </Box>
          </Fade>
          
          <Fade in={activeTab === 1} timeout={300} unmountOnExit>
            <Box>
              <ServiceLogsView />
            </Box>
          </Fade>
        </Container>
      </Box>
    </SnackbarProvider>
  );
};
