// src/app/(auth)/register/page.tsx
'use client';

import React from 'react';
import { Box } from '@mui/material';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
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
          top: '10%',
          left: '5%',
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          filter: 'blur(50px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '35%',
          height: '35%',
          borderRadius: '50%',
          background: 'rgba(67, 97, 238, 0.15)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '25%',
          width: '15%',
          height: '15%',
          borderRadius: '50%',
          background: 'rgba(165, 110, 244, 0.1)',
          filter: 'blur(30px)',
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
        <RegisterForm />
      </Box>
    </Box>
  );
}