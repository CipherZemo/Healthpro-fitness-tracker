import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HealthCheck from './components/HealthCheck';

// Create Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HealthCheck />
    </ThemeProvider>
  );
}

export default App;
