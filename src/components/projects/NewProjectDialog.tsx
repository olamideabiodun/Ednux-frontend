import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Avatar,
  Grid,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

interface NewProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (projectData: any) => void;
}

// Mock team members data
const teamMembers = [
  { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar.png' },
  { id: 'user-2', name: 'Jane Smith', avatar: '/assets/images/avatar.png' },
  { id: 'user-3', name: 'Alex Johnson', avatar: '/assets/images/avatar.png' },
  { id: 'user-4', name: 'Emily Davis', avatar: '/assets/images/avatar.png' },
];

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ open, onClose, onCreate }) => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    status: 'ongoing',
    teamMembers: [] as string[],
  });
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setProjectData({ ...projectData, status: e.target.value });
  };

  const handleTeamMembersChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    setProjectData({
      ...projectData,
      teamMembers: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
    };
    let isValid = true;

    if (!projectData.title.trim()) {
      newErrors.title = 'Project title is required';
      isValid = false;
    }

    if (!projectData.description.trim()) {
      newErrors.description = 'Project description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCreate(projectData);
      // Reset form
      setProjectData({
        title: '',
        description: '',
        status: 'ongoing',
        teamMembers: [],
      });
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form and errors
    setProjectData({
      title: '',
      description: '',
      status: 'ongoing',
      teamMembers: [],
    });
    setErrors({
      title: '',
      description: '',
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Create New Project
        </Typography>
        <IconButton aria-label="close" onClick={handleClose} sx={{ color: 'grey.500' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Project Title"
              fullWidth
              variant="outlined"
              value={projectData.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Project Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={projectData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={projectData.status}
                onChange={handleStatusChange}
                label="Status"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="team-members-label">Team Members</InputLabel>
              <Select
                labelId="team-members-label"
                id="team-members"
                multiple
                value={projectData.teamMembers}
                onChange={handleTeamMembersChange}
                label="Team Members"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((memberId) => {
                      const member = teamMembers.find((m) => m.id === memberId);
                      return (
                        <Chip
                          key={memberId}
                          label={member?.name}
                          size="small"
                          avatar={<Avatar src={member?.avatar} />}
                        />
                      );
                    })}
                  </Box>
                )}
                sx={{ borderRadius: 2 }}
              >
                {teamMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={member.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                      {member.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderRadius: 28, px: 3, textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 28, px: 3, textTransform: 'none' }}
        >
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProjectDialog;