// src/app/(auth)/forgot-password/page.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();

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
      }}
    >
      {/* Glass effect background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(67, 97, 238, 0.1)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      
      {/* Main content */}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => router.back()}
            sx={{ 
              mr: 1,
              color: 'primary.main',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1" fontWeight={600}>
            Forgot Password
          </Typography>
        </Box>
        
        <ForgotPasswordForm />
      </Container>
    </Box>
  );
}