// src/app/(auth)/verify/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import OTPVerification from '@/components/auth/OTPVerification';
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
          top: '5%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(67, 97, 238, 0.15)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />
      
      {/* Main content */}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <OTPVerification method={method} contactInfo={contactInfo} />
      </Container>
    </Box>
  );
}