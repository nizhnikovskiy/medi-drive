import { Box, Container, Typography } from '@mui/material'

function App() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Medi Drive
        </Typography>
        <Typography variant="h5" color="text.secondary">
          React + TypeScript + MUI + Redux Toolkit
        </Typography>
      </Box>
    </Container>
  )
}

export default App
