import { useState } from 'react';
import { Container, Box, Fade } from '@mui/material';
import { AppHeader } from './AppHeader';
import { SnackbarProvider } from '../feedback/SnackbarProvider';
import { CreateServiceLogView } from '../../features/drafts/components/CreateServiceLogView';
import { ServiceLogsHub } from '../../features/serviceLogs/components/ServiceLogsHub';
import { FADE_TIMEOUT_MS } from '@/constants';

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
          <Fade in={activeTab === 0} timeout={FADE_TIMEOUT_MS} unmountOnExit>
            <Box>
              <CreateServiceLogView />
            </Box>
          </Fade>
          
          <Fade in={activeTab === 1} timeout={FADE_TIMEOUT_MS} unmountOnExit>
            <Box>
              <ServiceLogsHub />
            </Box>
          </Fade>
        </Container>
      </Box>
    </SnackbarProvider>
  );
};
