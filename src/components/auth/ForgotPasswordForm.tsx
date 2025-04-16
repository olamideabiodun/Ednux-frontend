// src/components/auth/ForgotPasswordForm.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {error && (
        <Typography color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}

      {success ? (
        <Box sx={{ 
          textAlign: 'center', 
          my: 4,
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 3,
        }}>
          <Typography color="success.main" gutterBottom fontWeight={600} variant="h6">
            Password reset email sent!
          </Typography>
          <Typography variant="body2" mb={4}>
            Please check your email for instructions to reset your password.
          </Typography>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: '#4361ee',
            }}
          >
            Back to Login
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          p: 4,
          borderRadius: 3,
        }}>
          <Typography variant="body1" mb={3}>
            Enter your email and we'll send you a link to reset your password
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              Email
            </Typography>
            <TextField
              type="email"
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  bgcolor: 'white' 
                }
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              mt: 2,
              mb: 2,
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: '#4361ee',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </Button>

          <Button
            component={Link}
            href="/login"
            variant="text"
            sx={{
              textTransform: 'none',
              mb: 2,
              color: '#4361ee',
              fontWeight: 500,
              display: 'block',
              mx: 'auto',
            }}
          >
            Back to Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPasswordForm;