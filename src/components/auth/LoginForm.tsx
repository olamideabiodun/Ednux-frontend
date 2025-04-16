// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  InputAdornment, 
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import GoogleIcon from '@mui/icons-material/Google';

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
      sx={{
        width: '100%',
        maxWidth: '400px',
        mx: 'auto',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 700,
            color: '#1a365d',
          }}
        >
          Ed<span style={{ color: '#4361ee' }}>nux</span>
        </Typography>
        <Link href="/register">
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
            }}
          >
            Sign up
          </Typography>
        </Link>
      </Box>

      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Glad to have you back again!
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 1 }}>
          Sign in to your account!
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          p: 3,
          mb: 3
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Email</Typography>
          <TextField
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            InputProps={{
              sx: { 
                borderRadius: 2,
                bgcolor: 'white',
                mb: 2
              }
            }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Password</Typography>
          <TextField
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
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

          <Box sx={{ textAlign: 'right', my: 2 }}>
            <Link href="/forgot-password">
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
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
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              bgcolor: '#4361ee',
            }}
          >
            Log In
          </Button>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', position: 'relative', my: 3 }}>
        <Divider sx={{ position: 'absolute', top: '50%', left: 0, right: 0 }} />
        <Typography 
          variant="body2" 
          sx={{ 
            display: 'inline-block', 
            position: 'relative', 
            px: 2, 
            bgcolor: 'rgba(230, 240, 255, 0.7)', 
            backdropFilter: 'blur(5px)',
            color: 'text.secondary' 
          }}
        >
          or
        </Typography>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          color: '#3c4043',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.8)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        Sign in with Google
      </Button>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link href="/register">
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;