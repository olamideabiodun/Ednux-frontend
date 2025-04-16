// src/components/auth/OTPVerification.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  IconButton
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { Backspace, ArrowBack } from '@mui/icons-material';

interface OTPVerificationProps {
  method: 'phone' | 'email';
  contactInfo?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ method, contactInfo }) => {
  const router = useRouter();
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleNumpadClick = (num: number | string) => {
    if (activeInput < 4) {
      const newOtp = [...otp];
      newOtp[activeInput] = num.toString();
      setOtp(newOtp);
      
      // Move to next input if available
      if (activeInput < 3) {
        setActiveInput(activeInput + 1);
      }
    }
  };

  const handleBackspace = () => {
    if (activeInput > 0 || otp[0]) {
      const newOtp = [...otp];
      
      // If current active input has a value, clear it first
      if (newOtp[activeInput]) {
        newOtp[activeInput] = '';
      } else if (activeInput > 0) {
        // Otherwise move back and clear previous
        setActiveInput(activeInput - 1);
        newOtp[activeInput - 1] = '';
      }
      
      setOtp(newOtp);
    }
  };

  const handleOtpBoxClick = (index: number) => {
    setActiveInput(index);
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP(method);
      setTimeLeft(60);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOTP(otpValue, method);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 4,
        px: 2,
      }}
    >
      {/* Header */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => router.back()}
            sx={{ mr: 1, color: 'primary.main' }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight={600}>
            OTP Verification
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please enter the OTP (One-Time Password) sent to your {method === 'phone' ? 'registered' : ''} {method}{' '}
          {contactInfo && `(${contactInfo})`} to complete your verification.
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* OTP Input Boxes */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <Paper
                elevation={0}
                onClick={() => handleOtpBoxClick(index)}
                sx={{
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: activeInput === index ? 'primary.main' : 'divider',
                  bgcolor: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'text.primary',
                  cursor: 'pointer',
                }}
              >
                {digit}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Remaining time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
          
          <Button
            variant="text"
            color="primary"
            disabled={timeLeft > 0}
            onClick={handleResendOTP}
            sx={{ textTransform: 'none', mt: 1 }}
          >
            Didn't get the code? Resend
          </Button>
        </Box>
      </Box>

      {/* Middle section - Verify button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleVerify}
        disabled={otp.join('').length !== 4 || loading}
        sx={{
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem',
          mb: 4,
        }}
      >
        Verify
      </Button>

      {/* Custom Numpad */}
      <Box 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          p: 2,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <Grid item xs={4} key={num} sx={{ textAlign: 'center' }}>
              <Button
                onClick={() => handleNumpadClick(num)}
                sx={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  fontSize: '1.5rem',
                  color: 'text.primary',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                {num}
              </Button>
            </Grid>
          ))}
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Button
              onClick={() => handleNumpadClick(0)}
              sx={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                color: 'text.primary',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              0
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton
              onClick={handleBackspace}
              sx={{
                width: '60px',
                height: '60px',
                color: 'text.secondary',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              <Backspace />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OTPVerification;