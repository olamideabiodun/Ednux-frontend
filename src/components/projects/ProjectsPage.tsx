'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Grid, 
  Button, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ProjectCard from '@/components/projects/ProjectCard';
import NewProjectDialog from '@/components/projects/NewProjectDialog';

// Mock data for projects - would be fetched from API in production
const mockProjects = [
  {
    id: 'project-1',
    title: 'Ednux Project',
    description: 'Task Management project',
    progress: 85,
    status: 'ongoing',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' },
      { id: 'user-2', avatar: '/assets/images/avatar.png' },
      { id: 'user-3', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-03-20',
  },
  {
    id: 'project-2',
    title: 'Dashboard Design',
    description: 'Task Management project',
    progress: 100,
    status: 'completed',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' },
      { id: 'user-2', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-01-10',
    updatedAt: '2025-03-15',
  },
  {
    id: 'project-3',
    title: 'Personal Project',
    description: 'Task Management project',
    progress: 40,
    status: 'ongoing',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-02-20',
    updatedAt: '2025-03-22',
  },
  {
    id: 'project-4',
    title: 'Ednux Project',
    description: 'UI Development project',
    progress: 95,
    status: 'ongoing',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' },
      { id: 'user-3', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-02-05',
    updatedAt: '2025-03-21',
  },
  {
    id: 'project-5',
    title: 'Ednux Project',
    description: 'Backend Development',
    progress: 65,
    status: 'ongoing',
    team: [
      { id: 'user-2', avatar: '/assets/images/avatar.png' },
      { id: 'user-3', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-03-01',
    updatedAt: '2025-03-18',
  },
  {
    id: 'project-6',
    title: 'Dashboard Design',
    description: 'Analytics Dashboard',
    progress: 100,
    status: 'completed',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' },
      { id: 'user-2', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-01-10',
    updatedAt: '2025-02-28',
  },
  {
    id: 'project-7',
    title: 'Marketing Website',
    description: 'Company marketing site',
    progress: 0,
    status: 'cancelled',
    team: [
      { id: 'user-1', avatar: '/assets/images/avatar.png' },
      { id: 'user-3', avatar: '/assets/images/avatar.png' }
    ],
    createdAt: '2025-01-05',
    updatedAt: '2025-01-20',
  },
];

type TabValue = 'all' | 'ongoing' | 'completed' | 'cancelled';

export default function ProjectsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState<TabValue>('all');
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  const filteredProjects = mockProjects.filter(project => {
    if (tabValue === 'all') return true;
    return project.status === tabValue;
  });

  const handleCreateProject = (projectData: any) => {
    console.log('Creating new project:', projectData);
    setNewProjectDialogOpen(false);
    // In a real app, you would call an API here
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Project Tracking
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewProjectDialogOpen(true)}
          sx={{
            borderRadius: 28,
            px: 3,
            py: 1,
            textTransform: 'none',
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Add a new Project
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: 4, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        mb: 4, 
        px: 2 
      }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile}
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Tab 
            label="All" 
            value="all"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab 
            label="Ongoing" 
            value="ongoing"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab 
            label="Completed" 
            value="completed"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab 
            label="Cancelled" 
            value="cancelled"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={2}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
        
        {filteredProjects.length === 0 && (
          <Box sx={{ p: 4, width: '100%', textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No {tabValue === 'all' ? '' : tabValue} projects found.
            </Typography>
          </Box>
        )}
      </Grid>

      {/* New Project Dialog */}
      <NewProjectDialog
        open={newProjectDialogOpen}
        onClose={() => setNewProjectDialogOpen(false)}
        onCreate={handleCreateProject}
      />
    </Box>
  );
}