'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Grid, 
  Box, 
  Typography, 
  IconButton,
  Avatar
} from '@mui/material';
import { Close as CloseIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedProfile: any) => void;
  profile: any;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  open,
  onClose,
  onSave,
  profile
}) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    bio: profile.bio || '',
    location: profile.location || '',
    institution: profile.institution || '',
    field: profile.field || '',
    website: profile.website || '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      avatar: avatarPreview,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Edit Profile
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Avatar Upload */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={avatarPreview || '/assets/images/avatar.svg'}
                  alt={profile.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid #4361ee',
                  }}
                />
                <label htmlFor="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Box>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                helperText="Share a brief description about yourself"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Field of Study/Work"
                name="field"
                value={formData.field}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEditModal;