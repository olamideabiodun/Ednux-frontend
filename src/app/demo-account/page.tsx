'use client';

import React, { useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DemoAccountPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        background: 'linear-gradient(135deg, #e6f0ff 0%, #f0e8ff 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography variant="h5" component="h1" textAlign="center" gutterBottom fontWeight={600}>
            Demo Account Login
          </Typography>

          <Typography variant="body1" color="text.secondary" textAlign="center" mb={4}>
            Use this demo account to access the dashboard and protected pages.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Login successful! Redirecting to dashboard...
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || success}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
              For demonstration purposes, any email and password will work with the mock authentication system.
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading || success}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In to Demo Account'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}