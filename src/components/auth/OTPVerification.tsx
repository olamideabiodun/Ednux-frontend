// src/components/auth/OTPVerification.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

interface OTPVerificationProps {
  method: 'phone' | 'email';
  contactInfo?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ method, contactInfo }) => {
  const router = useRouter();
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    if (!/^\d*$/.test(value) && value !== '') {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value && index < 3) {
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setFocusedIndex(index - 1);
    }
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
        maxWidth: '400px',
        width: '100%',
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h2" mb={2}>
        OTP Verification
      </Typography>

      <Typography variant="body2" mb={4} color="text.secondary">
        Please enter the OTP (One Time Password) sent to your {method === 'phone' ? 'registered' : ''} {method}{' '}
        {contactInfo && `(${contactInfo})`}. Please wait to confirm your verification.
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2} justifyContent="center" mb={3}>
        {otp.map((digit, index) => (
          <Grid item key={index} xs={2.5}>
            <TextField
              autoFocus={index === focusedIndex}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: '1.5rem' },
              }}
              sx={{ width: '100%' }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" mb={2} color="text.secondary">
        Remaining time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            backgroundColor: '#4361ee',
          }}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>

        <Button
          variant="text"
          color="primary"
          disabled={timeLeft > 0}
          onClick={handleResendOTP}
          sx={{ textTransform: 'none' }}
        >
          {timeLeft > 0 ? `Didn't get the code? Resend (${timeLeft}s)` : "Didn't get the code? Resend"}
        </Button>
      </Box>
    </Box>
  );
};

export default OTPVerification;