// src/components/auth/ResetPasswordForm.tsx

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, TextField, Box, Typography, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || '';
  
  const { resetPassword } = useAuth();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // Use the token from URL or the code entered by user
      const resetToken = token || code;
      await resetPassword(resetToken, newPassword);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
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
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="body1" mb={3}>
        Enter the code from your email and set your new password
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {success ? (
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography color="success.main" gutterBottom variant="h6" fontWeight={600}>
            Password reset successful!
          </Typography>
          <Typography variant="body2" mb={3}>
            You will be redirected to the login page shortly...
          </Typography>
          <CircularProgress size={30} />
        </Box>
      ) : (
        <>
          {!token && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                Code
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required={!token}
                InputProps={{
                  sx: { 
                    borderRadius: 2,
                    bgcolor: 'white' 
                  }
                }}
              />
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              New password
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              fullWidth
              placeholder="Enter your new password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  bgcolor: 'white' 
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
              Confirm new password
            </Typography>
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              placeholder="Confirm your new password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={newPassword !== confirmPassword && confirmPassword !== ''}
              helperText={
                newPassword !== confirmPassword && confirmPassword !== ''
                  ? 'Passwords do not match'
                  : ''
              }
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  bgcolor: 'white' 
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
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
          
          <Typography variant="body2" textAlign="center">
            <Link href="/login" style={{ color: '#4361ee', fontWeight: 500, textDecoration: 'none' }}>
              Back to Login
            </Link>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ResetPasswordForm;