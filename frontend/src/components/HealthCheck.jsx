import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
import { checkHealth } from '../services/api';

const HealthCheck = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const data = await checkHealth();
        setHealthData(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch health status');
        setHealthData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    
    // Refresh health check every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Fitness Tracker
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center" color="primary">
          API Health Status
        </Typography>
        
        {healthData && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Status:</strong> {healthData.success ? '✅ Healthy' : '❌ Unhealthy'}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Message:</strong> {healthData.message}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Environment:</strong> {healthData.environment}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Uptime:</strong> {Math.floor(healthData.uptime)} seconds
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Timestamp:</strong> {new Date(healthData.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HealthCheck;
