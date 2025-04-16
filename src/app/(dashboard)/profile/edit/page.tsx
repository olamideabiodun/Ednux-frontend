// src/app/(dashboard)/profile/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Avatar, 
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Key as KeyIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// Mock user data for demo purposes - in a real app, this would come from the API
const userProfileData = {
  name: 'Boss Samsay',
  email: 'boss.samsay@example.com',
  phone: '+1 123-456-7890',
  role: 'student',
  bio: 'Student at XYZ University, studying Computer Science.',
  dateOfBirth: '1998-05-15',
  department: 'Computer Science',
  year: '3rd Year',
  location: 'New York, USA',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  avatar: '/assets/images/avatar.png',
};

export default function ProfileEditPage() {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();
  const [profile, setProfile] = useState(userProfileData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the user's profile here
    // For now, we're using the mock data
    if (user) {
      setProfile({
        ...userProfileData,
        name: user.name || userProfileData.name,
        email: user.email || userProfileData.email,
        avatar: user.avatar || userProfileData.avatar,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedAvatar(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call to update the profile
      // const response = await axios.put('/api/profile', profile);
      
      setSuccess(true);
      
      // Automatically navigate to profile page after brief delay
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          component={Link}
          href="/profile"
          sx={{ mr: 2, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Edit Profile
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Paper
        component="form"
        onSubmit={handleSave}
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Grid container spacing={4}>
          {/* Profile Photo */}
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 2 }}>
              <Avatar
                src={avatarPreview || profile.avatar}
                alt={profile.name}
                sx={{ width: 150, height: 150, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              />
            </Box>
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PhotoCameraIcon />}
                sx={{ 
                  mb: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Change Photo
              </Button>
            </label>
            
            <Typography variant="body2" color="text.secondary" align="center">
              Upload a square image for best results
            </Typography>
          </Grid>

          {/* Profile Info */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Personal Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Academic Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={profile.role}
                    label="Role"
                    onChange={handleInputChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={profile.department}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={profile.year}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Security
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  component={Link}
                  href="/profile/change-password"
                  variant="outlined"
                  color="primary"
                  startIcon={<KeyIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  Change Password
                </Button>
              </Grid>
                           
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  component={Link}
                  href="/profile"
                  variant="outlined"
                  sx={{ 
                    mr: 2, 
                    borderRadius: 28,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loading}
                  sx={{ 
                    borderRadius: 28,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}