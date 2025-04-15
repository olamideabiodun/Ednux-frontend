'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  IconButton, 
  Chip, 
  Divider 
} from '@mui/material';
import { 
  Code as CodeIcon, 
  ChevronRight as ChevronRightIcon,
  NavigateNext as NavigateNextIcon 
} from '@mui/icons-material';
import Link from 'next/link';

// Mock data for today's classes
const classesMockData = [
  {
    id: '1',
    title: 'Machine Language Course',
    type: 'Coding',
    icon: <CodeIcon />,
    iconColor: '#4361ee',
    iconBg: '#eef2ff',
    time: '10:00 AM - 11:30 AM',
    url: '/courses/machine-language',
  },
];

const TodayClasses: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Today's Classes
        </Typography>
        <IconButton
          size="small"
          component={Link}
          href="/courses"
          sx={{ color: 'text.secondary' }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>

      <List sx={{ pt: 0 }}>
        {classesMockData.length > 0 ? (
          classesMockData.map((course, index) => (
            <React.Fragment key={course.id}>
              <ListItem
                component={Link}
                href={course.url}
                sx={{
                  py: 2,
                  px: 3,
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    mr: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: course.iconBg,
                      color: course.iconColor,
                    }}
                  >
                    {course.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={course.title}
                  secondary={
                    <Chip
                      label={course.type}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        mt: 0.5,
                        bgcolor: course.iconBg,
                        color: course.iconColor,
                      }}
                    />
                  }
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                />
                <ChevronRightIcon color="action" />
              </ListItem>
              {index < classesMockData.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No classes scheduled for today.
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default TodayClasses;