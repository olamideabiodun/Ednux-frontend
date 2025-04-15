'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Breadcrumbs, 
  Link as MuiLink,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  PlayArrow as PlayArrowIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockCourses, mockLessons } from '@/lib/mockData';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const courseId = params.id as string;
  
  // Find the course
  const course = mockCourses.find((c) => c.id === courseId);
  
  if (!course) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Course not found</Typography>
        <Button 
          component={Link} 
          href="/courses" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Courses
        </Button>
      </Box>
    );
  }

  // Get lessons for this course
  const courseLessons = mockLessons.filter((lesson) => lesson.courseId === courseId);
  
  // Find the next lesson to continue (first incomplete lesson)
  const nextLesson = courseLessons.find((lesson) => !lesson.completed);

  // Recently accessed courses (excluding current course)
  const recentCourses = mockCourses
    .filter((c) => c.id !== courseId)
    .slice(0, 4);

  return (
    <Box>
      {/* Back button and breadcrumbs */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={() => router.back()} 
          sx={{ mr: 1, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} href="/courses" underline="hover" color="inherit">
            Courses
          </MuiLink>
          <Typography color="text.primary">{course.title}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Course header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 4, 
          mb: 3, 
          backgroundImage: 'linear-gradient(to right, #e0e7ff, #e5e7fb)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              {course.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              {course.instructor ? `Instructor: ${course.instructor}` : course.category}
            </Typography>
            <Typography variant="body1">
              {course.description || 'Learn the fundamentals and advanced concepts of this subject.'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {course.progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Course Completion
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  mt: 2, 
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                {course.status === 'not_started' ? 'Start Course' : 'Continue Learning'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} md={8}>
          {/* Continue section */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Continue
            </Typography>
            
            {nextLesson ? (
              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {nextLesson.title}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                    sx={{ 
                      borderRadius: 8,
                      textTransform: 'none',
                      bgcolor: theme.palette.success.main,
                      '&:hover': {
                        bgcolor: theme.palette.success.dark,
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Lesson {courseLessons.indexOf(nextLesson) + 1} of {courseLessons.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {nextLesson.duration || '15 min'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {nextLesson.description || 'Continue with this lesson to advance your knowledge.'}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  You have completed all lessons in this course!
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  sx={{ mt: 2, borderRadius: 8, textTransform: 'none' }}
                >
                  Review Course
                </Button>
              </Box>
            )}
          </Paper>

          {/* Course content */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Course Content
            </Typography>
            
            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
              {courseLessons.map((lesson, index) => (
                <React.Fragment key={lesson.id}>
                  <ListItem
                    component={Link}
                    href={`/courses/${courseId}/lessons/${lesson.id}`}
                    sx={{ 
                      py: 2, 
                      borderRadius: 2, 
                      textDecoration: 'none', 
                      color: 'inherit',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      {lesson.completed ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CircleIcon sx={{ color: 'rgba(0, 0, 0, 0.3)' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={lesson.completed ? 400 : 600}>
                          {index + 1}. {lesson.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                            {lesson.duration || '15 min'}
                          </Typography>
                          {lesson.type && (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                px: 1, 
                                py: 0.3, 
                                borderRadius: 1, 
                                bgcolor: 'rgba(0, 0, 0, 0.05)',
                                color: 'text.secondary',
                              }}
                            >
                              {lesson.type}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < courseLessons.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Recently accessed courses */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Recently accessed courses
            </Typography>
            
            <Grid container spacing={2}>
              {recentCourses.slice(0, 2).map((course) => (
                <Grid item xs={6} key={course.id}>
                  <Card
                    component={Link}
                    href={`/courses/${course.id}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '56.25%', // 16:9 aspect ratio
                        bgcolor: course.bgColor || theme.palette.primary.main,
                        position: 'relative',
                      }}
                    >
                      {course.image && (
                        <Box 
                          component="img"
                          src={course.image}
                          alt={course.title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {course.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Course stats */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Course Stats
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    {courseLessons.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lessons
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    {courseLessons.filter(l => l.completed).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}