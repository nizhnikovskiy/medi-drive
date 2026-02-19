import { Box, Stack, Typography, Container } from '@mui/material';
import { ServiceLogForm } from './ServiceLogForm';

export const CreateServiceLogView = () => {
  return (
    <Container maxWidth="lg" disableGutters>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Create Service Log
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill out the form below to create a new service log.
          </Typography>
        </Box>

        <ServiceLogForm />
      </Stack>
    </Container>
  );
};
