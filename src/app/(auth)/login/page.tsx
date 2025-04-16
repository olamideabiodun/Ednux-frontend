// src/app/(auth)/login/page.tsx
'use client';

import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e6f0ff 0%, #f0e8ff 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {/* Decorative glass background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: 'rgba(67, 97, 238, 0.15)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          background: 'rgba(165, 110, 244, 0.1)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      
      {/* Main content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '450px',
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}