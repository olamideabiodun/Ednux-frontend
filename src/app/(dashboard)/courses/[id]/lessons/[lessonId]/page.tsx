'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Paper, 
  Breadcrumbs, 
  IconButton, 
  Button,
  LinearProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  LibraryBooks as CourseIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockCourses, mockLessons } from '@/lib/mockData';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const courseId = params.id as string;
  const lessonId = params.lessonId as string;
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Find the course and lesson
  const course = mockCourses.find((c) => c.id === courseId);
  const lesson = mockLessons.find((l) => l.id === lessonId);
  
  if (!course || !lesson) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Lesson not found</Typography>
        <Button 
          component={Link} 
          href={`/courses/${courseId}`} 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Course
        </Button>
      </Box>
    );
  }

  // Get all lessons for this course
  const courseLessons = mockLessons.filter((l) => l.courseId === courseId);
  
  // Get current lesson index
  const lessonIndex = courseLessons.findIndex((l) => l.id === lessonId);
  
  // Determine prev and next lessons
  const prevLesson = lessonIndex > 0 ? courseLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < courseLessons.length - 1 ? courseLessons[lessonIndex + 1] : null;
  
  // Calculate course progress
  const completedCount = courseLessons.filter((l) => l.completed).length;
  const progressPercentage = Math.round((completedCount / courseLessons.length) * 100);

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Top navigation bar */}
      <Box 
        sx={{ 
          px: 2, 
          py: 1.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            component={Link}
            href={`/courses/${courseId}`}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ maxWidth: { xs: 150, sm: 'none' } }}>
            {course.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
            {lessonIndex + 1} of {courseLessons.length} lessons
          </Typography>
          
          <Box sx={{ width: 100, mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                '.MuiLinearProgress-bar': {
                  bgcolor: theme.palette.success.main,
                }
              }} 
            />
          </Box>
          
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              px: 2, 
              py: 0.5, 
              borderRadius: 2,
              textTransform: 'none',
              minWidth: 'auto',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            {lesson.completed ? 'Completed' : 'Mark as Complete'}
          </Button>
          
          <Tooltip title="Course contents">
            <IconButton 
              sx={{ ml: 1 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <CourseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Main content */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Lesson content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
            {lesson.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {lesson.duration} • {lesson.type || 'Reading'}
          </Typography>
          
          {/* Lesson content - placeholder */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              mb: 3, 
              bgcolor: 'background.paper',
              borderRadius: 3,
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Lesson Content Would Be Displayed Here
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 3 }}>
              {lesson.description || 'This is a placeholder for the actual lesson content. In a real application, this would contain videos, text, interactive elements, and more.'}
            </Typography>
            
            <Box sx={{ width: '100%', maxWidth: 600, height: 280, bgcolor: '#f0f0f0', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {lesson.type === 'video' ? (
                <Typography variant="body1" color="text.secondary">Video Content Placeholder</Typography>
              ) : lesson.type === 'quiz' ? (
                <Typography variant="body1" color="text.secondary">Quiz Content Placeholder</Typography>
              ) : (
                <Typography variant="body1" color="text.secondary">Lesson Content Placeholder</Typography>
              )}
            </Box>
            
            <Button 
              variant="contained" 
              color="primary"
              sx={{ 
                px: 4, 
                py: 1, 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              {lesson.completed ? 'Review Completed Lesson' : 'Mark as Complete'}
            </Button>
          </Paper>
          
          {/* Navigation buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 3
            }}
          >
            <Button
              variant="outlined"
              startIcon={<NavigateBeforeIcon />}
              disabled={!prevLesson}
              component={Link}
              href={prevLesson ? `/courses/${courseId}/lessons/${prevLesson.id}` : '#'}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Previous Lesson
            </Button>
            
            <Button
              variant="contained"
              endIcon={<NavigateNextIcon />}
              disabled={!nextLesson}
              component={Link}
              href={nextLesson ? `/courses/${courseId}/lessons/${nextLesson.id}` : '#'}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Next Lesson
            </Button>
          </Box>
        </Box>
        
        {/* Lesson sidebar - conditionally rendered */}
        {sidebarOpen && (
          <Box 
            sx={{ 
              width: 320, 
              borderLeft: '1px solid', 
              borderColor: 'divider',
              bgcolor: 'background.paper',
              overflow: 'auto',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Course Content
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {completedCount} of {courseLessons.length} completed
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{ 
                  mt: 1,
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: 'rgba(0, 0, 0, 0.08)',
                  '.MuiLinearProgress-bar': {
                    bgcolor: theme.palette.success.main,
                  }
                }} 
              />
            </Box>
            
            <List sx={{ p: 0 }}>
              {courseLessons.map((lesson, index) => (
                <ListItem 
                  key={lesson.id}
                  component={Link} 
                  href={`/courses/${courseId}/lessons/${lesson.id}`}
                  selected={lesson.id === lessonId}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'inherit',
                    bgcolor: lesson.id === lessonId ? 'action.selected' : 'inherit',
                    '&:hover': {
                      bgcolor: lesson.id === lessonId ? 'action.selected' : 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {lesson.completed ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <Circle sx={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12, my: 0.5 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${index + 1}. ${lesson.title}`}
                    secondary={lesson.duration}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: lesson.id === lessonId ? 600 : 400,
                      noWrap: true,
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
}