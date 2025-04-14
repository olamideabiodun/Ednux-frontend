// src/app/(auth)/verify/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import OTPVerification from '@/components/auth/OTPVerification';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [contactInfo, setContactInfo] = useState<string>('');

  useEffect(() => {
    // Check if we have verification data in localStorage
    const email = localStorage.getItem('ednux_verification_email');
    const phone = localStorage.getItem('ednux_verification_phone');

    if (!email && !phone) {
      // No verification in progress, redirect to register
      router.push('/register');
      return;
    }

    // Prioritize phone verification if available
    if (phone) {
      setMethod('phone');
      setContactInfo(maskPhone(phone));
    } else if (email) {
      setMethod('email');
      setContactInfo(maskEmail(email));
    }
  }, [router]);

  // Mask phone number for privacy (e.g., 123-456-7890 -> ***-***-7890)
  const maskPhone = (phone: string): string => {
    return phone.replace(/^\d{3}-\d{3}-(\d{4})/, '***-***-$1');
  };

  // Mask email for privacy (e.g., user@example.com -> u***@e***.com)
  const maskEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    const [domainName, extension] = domain.split('.');
    return `${username.charAt(0)}***@${domainName.charAt(0)}***.${extension}`;
  };

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
        <OTPVerification method={method} contactInfo={contactInfo} />
      </Container>
    </Box>
  );
}