// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
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
        Glad to have you back again!
      </Typography>
      
      <Typography variant="body1" textAlign="center" mb={4}>
        Sign in to your account!
      </Typography>

      {error && (
        <Typography color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}

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

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box component="span" sx={{ color: 'action.active' }}>
                🔒
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
        <Link href="/forgot-password">
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Forgot password?
          </Typography>
        </Link>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{
          py: 1.5,
          mb: 2,
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: '#4361ee',
        }}
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Log in'}
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }} />
        <Typography sx={{ mx: 2, color: 'text.secondary' }}>or</Typography>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'divider' }} />
      </Box>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          py: 1.5,
          mb: 3,
          borderRadius: 2,
          textTransform: 'none',
          borderColor: '#DADCE0',
          color: '#3c4043',
          '&:hover': {
            borderColor: '#DADCE0',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        Sign in with Google
      </Button>

      <Typography textAlign="center">
        Don't have an account?{' '}
        <Link href="/register">
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign Up!
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;