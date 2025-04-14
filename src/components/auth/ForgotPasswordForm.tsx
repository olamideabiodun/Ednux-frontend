// src/components/auth/ForgotPasswordForm.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Box, Typography, InputAdornment } from '@mui/material';
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
        maxWidth: '400px',
        width: '100%',
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        Forgot Password
      </Typography>

      {error && (
        <Typography color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}

      {success ? (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography color="success.main" gutterBottom>
            Password reset email sent!
          </Typography>
          <Typography variant="body2" mb={3}>
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
        <>
          <Typography variant="body2" mb={3} textAlign="center">
            Enter your email and we'll send you a link to reset your password
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'action.active' }}>
                    ✉️
                  </Box>
                </InputAdornment>
              ),
            }}
          />

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
            {loading ? 'Sending...' : 'Reset Password'}
          </Button>

          <Button
            component={Link}
            href="/login"
            variant="text"
            sx={{
              textTransform: 'none',
              mb: 2,
            }}
          >
            Back to Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default ForgotPasswordForm;