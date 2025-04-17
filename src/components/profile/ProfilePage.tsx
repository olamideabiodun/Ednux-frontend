// src/components/profile/ProfilePage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Avatar, 
  Button, 
  Tabs, 
  Tab, 
  Divider,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  School as SchoolIcon,
  WorkOutline as WorkIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Link as LinkIcon,
  EventNote as EventNoteIcon
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useParams, useRouter } from 'next/navigation';
import ActivityFeed from '@/components/profile/ActivityFeed';
import FilesSection from '@/components/profile/FilesSection';
import CoursesSection from '@/components/profile/CoursesSection';
import ProjectsSection from '@/components/profile/ProjectsSection';
import ProfileEditModal from '@/components/profile/ProfileEditModal';
import SkillsSection from '@/components/profile/SkillsSection';
import { formatDistanceToNow } from 'date-fns';
import { mockUser } from '@/lib/mockAuth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data for profile (in a real app, this would come from an API)
  const [profile, setProfile] = useState({
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar || '/assets/images/avatar.svg',
    bio: 'Passionate student focused on UI/UX design and front-end development. Currently pursuing my degree in Computer Science with a specialization in Human-Computer Interaction.',
    location: 'San Francisco, CA',
    institution: 'Stanford University',
    field: 'Computer Science',
    website: 'portfolio.example.com',
    joinedDate: '2024-11-15T12:00:00Z',
    skills: ['UI/UX Design', 'React', 'JavaScript', 'Figma', 'User Research', 'Prototyping'],
    completedCourses: 2,
    activeCourses: 3,
    totalProjects: 5
  });

  // Check if viewing own profile or someone else's
  const isOwnProfile = !params.id || params.id === user?.id;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: any) => {
    // In a real app, this would be an API call
    setProfile({
      ...profile,
      ...updatedProfile
    });
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    // In a real app, this would fetch profile data from an API
    // based on the ID in the URL params
    if (params.id && params.id !== mockUser.id) {
      console.log(`Fetching profile for user ID: ${params.id}`);
      // This would be replaced with actual API call in production
    }
  }, [params.id]);

  return (
    <Box>
      {/* Profile Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={10}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" fontWeight={700}>
                  {profile.name}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                  {profile.institution && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <SchoolIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {profile.institution}
                      </Typography>
                    </Box>
                  )}
                  
                  {profile.field && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <WorkIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {profile.field}
                      </Typography>
                    </Box>
                  )}
                  
                  {profile.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <LocationIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {profile.location}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {profile.email}
                    </Typography>
                  </Box>
                  
                  {profile.website && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <LinkIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {profile.website}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <EventNoteIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Joined {formatDistanceToNow(new Date(profile.joinedDate), { addSuffix: true })}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1">
                  {profile.bio}
                </Typography>
              </Box>
              
              {isOwnProfile && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditProfile}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3} md={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {profile.completedCourses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed Courses
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={4} sm={3} md={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {profile.activeCourses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Courses
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={4} sm={3} md={2}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {profile.totalProjects}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Projects
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Skills Section */}
      <SkillsSection skills={profile.skills} isEditable={isOwnProfile} />

      {/* Tabs navigation */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
          }}
        >
          <Tab label="Activity" />
          <Tab label="Courses" />
          <Tab label="Projects" />
          <Tab label="Files" />
        </Tabs>

        {/* Activity Tab */}
        <TabPanel value={tabValue} index={0}>
          <ActivityFeed userId={isOwnProfile ? undefined : params.id as string} />
        </TabPanel>

        {/* Courses Tab */}
        <TabPanel value={tabValue} index={1}>
          <CoursesSection userId={isOwnProfile ? undefined : params.id as string} />
        </TabPanel>

        {/* Projects Tab */}
        <TabPanel value={tabValue} index={2}>
          <ProjectsSection userId={isOwnProfile ? undefined : params.id as string} />
        </TabPanel>

        {/* Files Tab */}
        <TabPanel value={tabValue} index={3}>
          <FilesSection userId={isOwnProfile ? undefined : params.id as string} />
        </TabPanel>
      </Paper>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        profile={profile}
      />
    </Box>
  );
};

export default ProfilePage;