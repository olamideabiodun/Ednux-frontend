'use client';

import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { 
  Quiz as QuizIcon, 
  UploadFile as UploadFileIcon,
  Feed as FeedIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import Link from 'next/link';

const actionItems = [
  {
    icon: <QuizIcon fontSize="large" />,
    title: 'Start Test',
    color: '#4361ee',
    bgColor: '#eef2ff',
    url: '/tests',
  },
  {
    icon: <UploadFileIcon fontSize="large" />,
    title: 'Upload Files',
    color: '#4361ee',
    bgColor: '#eef2ff',
    url: '/files/upload',
  },
  {
    icon: <FeedIcon fontSize="large" />,
    title: 'Post to Feed',
    color: '#4361ee',
    bgColor: '#eef2ff',
    url: '/social-feed/new',
  },
  {
    icon: <CalendarIcon fontSize="large" />,
    title: 'View Calendar',
    color: '#4361ee',
    bgColor: '#eef2ff',
    url: '/calendar',
  },
];

const QuickActions: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        {actionItems.map((item, index) => (
          <Grid item xs={6} sm={3} md={6} key={index}>
            <Paper
              component={Link}
              href={item.url}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: item.bgColor,
                  color: item.color,
                  mb: 1.5,
                }}
              >
                {item.icon}
              </Box>
              <Typography 
                variant="body1" 
                component="div" 
                fontWeight={600}
                color="text.primary"
              >
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;