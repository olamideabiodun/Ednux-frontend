// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

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
        Creating a New Account
      </Typography>

      {error && (
        <Typography color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Name"
        type="text"
        fullWidth
        margin="normal"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box component="span" sx={{ color: 'action.active' }}>
                👤
              </Box>
            </InputAdornment>
          ),
        }}
      />

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
        label="Phone Number"
        type="tel"
        fullWidth
        margin="normal"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box component="span" sx={{ color: 'action.active' }}>
                📱
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

      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
              <IconButton onClick={handleToggleConfirmPassword} edge="end">
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
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
        {loading ? 'Creating account...' : 'Log In'}
      </Button>

      <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
        or
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        size="large"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleRegister}
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
        Already have an account?{' '}
        <Link href="/login">
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
            Login
          </Typography>
        </Link>
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
        By creating an account, you agree to our Terms of Use
      </Typography>
    </Box>
  );
};

export default RegisterForm;