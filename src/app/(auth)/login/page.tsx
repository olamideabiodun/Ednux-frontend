// src/app/(auth)/login/page.tsx
'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #e6f0ff 0%, #f0e8ff 100%)',
      }}
    >
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
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
          </Box>
        </Link>
        <Link href="/register">
          <Box
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontWeight: 600,
                color: '#4361ee',
                px: 3,
                py: 1,
                borderRadius: 2,
                bgcolor: '#fff',
                '&:hover': {
                  bgcolor: '#f8f9fa',
                },
              }}
            >
              Sign up
            </Typography>
          </Box>
        </Link>
      </Box>

      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          px: 2,
          py: 4,
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  );
}