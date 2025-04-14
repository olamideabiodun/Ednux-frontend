// src/app/onboarding/page.tsx
'use client';

import React, { useState } from 'react';
import { Box, Button, Container, Typography, MobileStepper } from '@mui/material';
import Link from 'next/link';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const onboardingSteps = [
  {
    title: "Let's create a space for your work flow",
    description: "Collaborate, learn, and share files in one space. Connect with professionals, join study groups, and manage your projects efficiently.",
    image: "/assets/images/onboarding-1.png",
  },
  {
    title: "Track your project and Manage your Files",
    description: "Keep your projects organized with task tracking and milestone management. Store and share files with specialized support for various formats.",
    image: "/assets/images/onboarding-2.png",
  },
  {
    title: "Collaborate with AI-powered assistance",
    description: "Get intelligent, domain-specific help with our AI assistant. Enhance your productivity with personalized recommendations.",
    image: "/assets/images/onboarding-3.png",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = onboardingSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const handleFinish = () => {
    router.push('/dashboard');
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
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          pt: 4,
          pb: 8,
          px: 2,
          position: 'relative',
        }}
      >
        {activeStep === 0 && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                color: '#1a365d',
                mb: 1,
              }}
            >
              Ed<span style={{ color: '#4361ee' }}>nux</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#4a5568',
              }}
            >
              The social workspace for students and professionals
            </Typography>
          </Box>
        )}

        {activeStep < maxSteps && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
            }}
          >
            <Button
              variant="text"
              onClick={handleSkip}
              sx={{
                color: '#4a5568',
                '&:hover': { color: '#4361ee' },
              }}
            >
              Skip
            </Button>
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 4,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 280,
            }}
          >
            <Image
              src={onboardingSteps[activeStep].image}
              alt={onboardingSteps[activeStep].title}
              layout="fill"
              objectFit="contain"
            />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#1a365d',
            }}
          >
            {onboardingSteps[activeStep].title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#4a5568',
              maxWidth: 450,
            }}
          >
            {onboardingSteps[activeStep].description}
          </Typography>

          {activeStep === maxSteps - 1 ? (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFinish}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  backgroundColor: '#4361ee',
                  mb: 2,
                }}
              >
                Log In
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                component={Link}
                href="/register"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<KeyboardArrowRight />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: '#4361ee',
              }}
            >
              Next
            </Button>
          )}
        </Box>

        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            background: 'transparent',
            width: '100%',
            justifyContent: 'center',
            mt: 4,
            '& .MuiMobileStepper-dot': {
              mx: 0.5,
              width: 10,
              height: 10,
            },
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: '#4361ee',
            },
          }}
          nextButton={null}
          backButton={null}
        />
      </Container>
    </Box>
  );
}