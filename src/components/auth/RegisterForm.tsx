// src/components/auth/RegisterForm.tsx
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

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, phone, password);
      router.push('/verify');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError('Google sign-up failed. Please try again.');
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
      <Typography variant="h5" component="h1" sx={{ mb: 4, fontWeight: 600 }}>
        Creating a New Account
      </Typography>

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

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Name</Typography>
          <TextField
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            InputProps={{
              sx: { 
                borderRadius: 2,
                bgcolor: 'white',
                mb: 2
              }
            }}
          />

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

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Phone Number</Typography>
          <TextField
            type="tel"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
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
            placeholder="Enter your password"
            required
            InputProps={{
              sx: { 
                borderRadius: 2,
                bgcolor: 'white',
                mb: 2
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

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Confirm Password</Typography>
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            InputProps={{
              sx: { 
                borderRadius: 2,
                bgcolor: 'white',
                mb: 2
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
              mt: 1
            }}
          >
            {loading ? 'Creating account...' : 'Log In'}
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
        onClick={handleGoogleRegister}
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
        Sign up with Google
      </Button>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link href="/login">
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              Login
            </Typography>
          </Link>
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2, fontSize: '0.8rem' }}>
        By creating an account, you agree to our Terms of Use
      </Typography>
    </Box>
  );
};

export default RegisterForm;