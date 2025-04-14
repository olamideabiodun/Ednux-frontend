// src/components/common/FeatureCard.tsx

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, imageSrc }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          {icon}
        </Box>
      )}
      
      {imageSrc && (
        <Box 
          sx={{ 
            mb: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img 
            src={imageSrc} 
            alt={title} 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              maxHeight: '140px',
            }} 
          />
        </Box>
      )}
      
      <Typography
        variant="h6"
        component="h3"
        sx={{
          mb: 1,
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;