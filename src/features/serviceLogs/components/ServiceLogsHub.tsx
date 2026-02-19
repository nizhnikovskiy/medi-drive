import { useState } from 'react';
import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditNote, ListAlt } from '@mui/icons-material';
import { DraftsView } from '../../drafts/components/DraftsView';
import { ServiceLogsView } from './ServiceLogsView';

type ActiveView = 'drafts' | 'logs';

export const ServiceLogsHub = () => {
  const [activeView, setActiveView] = useState<ActiveView>('logs');

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ActiveView | null,
  ) => {
    if (newView !== null) {
      setActiveView(newView);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          variant="outlined"
          sx={{
            p: 0.5,
            borderRadius: 99,
            border: (theme) =>
              theme.palette.mode === 'light'
                ? '1px solid #E5E7EB'
                : '1px solid #3A3638',
          }}
        >
          <ToggleButtonGroup
            value={activeView}
            exclusive
            onChange={handleViewChange}
            aria-label="view selector"
            sx={{
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 99,
                px: 3,
                py: 1,
                gap: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  color: 'primary.contrastText',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              },
              '& .MuiToggleButtonGroup-grouped': {
                '&:not(:last-of-type)': {
                  borderRadius: 99,
                },
                '&:not(:first-of-type)': {
                  borderRadius: 99,
                  ml: 0.5,
                },
              },
            }}
          >
            <ToggleButton value="drafts" aria-label="drafts view">
              <EditNote fontSize="small" />
              Drafts
            </ToggleButton>
            <ToggleButton value="logs" aria-label="service logs view">
              <ListAlt fontSize="small" />
              Service Logs
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      <Box>
        {activeView === 'drafts' ? <DraftsView /> : <ServiceLogsView />}
      </Box>
    </Box>
  );
};
