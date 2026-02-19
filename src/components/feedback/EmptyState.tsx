import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
  <Box sx={{ textAlign: 'center', py: 8, px: 3 }}>
    <Box sx={{ fontSize: 48, color: 'text.disabled', mb: 2, display: 'flex', justifyContent: 'center' }}>
      {icon}
    </Box>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.disabled">
      {description}
    </Typography>
  </Box>
);
