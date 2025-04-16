// src/app/(dashboard)/profile/page.tsx
'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Avatar, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  EmojiEvents as AchievementIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// Mock achievements data - in a real app, this would come from the API
const achievements = [
  { id: 1, name: 'Course Completion', description: 'Completed Machine Language C course', icon: <AchievementIcon />, date: '2025-03-15' },
  { id: 2, name: 'Perfect Score', description: 'Achieved 100% on Advanced Data Structures Final Exam', icon: <AchievementIcon />, date: '2025-02-20' },
];

export default function ProfilePage() {
  const theme = useTheme();
  const { user } = useAuth();
  
  // Mock user profile data - in a real app, this would come from the API
  const profile = {
    name: user?.name || 'Boss Samsay',
    email: user?.email || 'boss.samsay@example.com',
    phone: '+1 123-456-7890',
    role: user?.role || 'student',
    bio: 'Student at XYZ University, studying Computer Science.',
    dateOfBirth: '1998-05-15',
    department: 'Computer Science',
    year: '3rd Year',
    location: 'New York, USA',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    avatar: user?.avatar || '/assets/images/avatar.png',
    completedCourses: 3,
    activeCourses: 2,
    projects: 5,
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          My Profile
        </Typography>
        
        <Button
          component={Link}
          href="/profile/edit"
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            borderRadius: 28,
            px: 3,
            py: 1,
            textTransform: 'none',
            bgcolor: theme.palette.primary.main,
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Main Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {profile.name}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {profile.bio}
            </Typography>
            
            <Chip
              label={profile.role === 'student' ? 'Student' : profile.role === 'teacher' ? 'Teacher' : 'Professional'}
              color="primary"
              size="small"
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ width: '100%', mb: 3 }} />
            
            <Box sx={{ width: '100%' }}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={profile.email}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={profile.phone}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CakeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date of Birth"
                    secondary={new Date(profile.dateOfBirth).toLocaleDateString()}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Department"
                    secondary={`${profile.department}, ${profile.year}`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={profile.location}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Statistics */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Stats
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" fontWeight={700} color="primary.main">
                        {profile.completedCourses}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed Courses
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" fontWeight={700} color="primary.main">
                        {profile.activeCourses}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Courses
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" fontWeight={700} color="primary.main">
                        {profile.projects}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Projects
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Skills */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Skills
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {profile.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      icon={<CodeIcon />}
                      label={skill}
                      sx={{
                        borderRadius: 2,
                        bgcolor: 'rgba(67, 97, 238, 0.1)',
                        color: 'primary.main',
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Achievements */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Achievements
                </Typography>
                
                <List>
                  {achievements.map((achievement) => (
                    <ListItem key={achievement.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(67, 97, 238, 0.1)',
                            color: 'primary.main',
                          }}
                        >
                          {achievement.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {achievement.description}
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                              {new Date(achievement.date).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Activity / Recent Courses */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Activity
                  </Typography>
                  
                  <Button
                    component={Link}
                    href="/courses"
                    variant="text"
                    endIcon={<SchoolIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    All Courses
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No recent activity to display
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}