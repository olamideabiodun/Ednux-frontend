'use client';

import React from 'react';
import { Box, Typography, Chip, LinearProgress, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getStatusText = () => {
    if (course.status === 'completed') return 'Completed';
    if (course.status === 'in_progress') return `${course.progress}% Progress`;
    return 'Not started';
  };

  const getActionButton = () => {
    switch (course.status) {
      case 'completed':
        return (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#334155',
              color: 'white',
              '&:hover': { bgcolor: '#1e293b' },
              borderRadius: 1,
              textTransform: 'none',
              minWidth: 'auto',
              px: 2,
            }}
          >
            Review
          </Button>
        );
      case 'in_progress':
        return (
          <Chip
            label={`${course.progress}%`}
            size="small"
            sx={{
              bgcolor: '#3b82f6',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        );
      default:
        return (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#3b82f6',
              color: 'white',
              '&:hover': { bgcolor: '#2563eb' },
              borderRadius: 1,
              textTransform: 'none',
              minWidth: 'auto',
              px: 2,
            }}
          >
            Start
          </Button>
        );
    }
  };

  return (
    <Box
      component={Link}
      href={`/courses/${course.id}`}
      sx={{
        display: 'flex',
        p: 1.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        bgcolor: 'background.paper',
        mb: 1,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {/* Course Image */}
      <Box sx={{ mr: 2, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
        <Box 
          sx={{ 
            width: 60, 
            height: 60, 
            position: 'relative',
            borderRadius: 2, 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: course.bgColor || '#e5e7eb',
          }}
        >
          {course.image ? (
            <Image 
              src={course.image} 
              alt={course.title}
              width={60}
              height={60}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Typography 
              variant="h6" 
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              {course.title.charAt(0)}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Course Info */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" component="div" fontWeight={600} noWrap>
          {course.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          {getStatusText()}
        </Typography>
        
        {course.status === 'in_progress' && (
          <LinearProgress 
            variant="determinate" 
            value={course.progress} 
            sx={{ 
              height: 4, 
              borderRadius: 2,
              mb: 1,
              bgcolor: 'rgba(0, 0, 0, 0.08)',
              '.MuiLinearProgress-bar': {
                bgcolor: '#3b82f6',
              }
            }} 
          />
        )}
      </Box>

      {/* Action Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
        {getActionButton()}
      </Box>
    </Box>
  );
};

export default CourseCard;