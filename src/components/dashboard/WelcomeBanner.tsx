'use client';

import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { School as SchoolIcon, JoinFull as JoinIcon } from '@mui/icons-material';

interface WelcomeBannerProps {
  name: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: '30%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
        Welcome Back, {name.split(' ')[0]}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
        What would you like to do?
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<SchoolIcon />}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            px: 3,
            py: 1.5,
            borderRadius: 8,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Start Learning
        </Button>
        
        <Button
          variant="contained"
          startIcon={<JoinIcon />}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            px: 3,
            py: 1.5,
            borderRadius: 8,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Join Classroom
        </Button>
      </Box>
    </Paper>
  );
};

export default WelcomeBanner;