'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Avatar, 
  AvatarGroup, 
  LinearProgress,
  IconButton
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  CalendarToday as CalendarIcon 
} from '@mui/icons-material';
import Link from 'next/link';

interface ProjectsSectionProps {
  userId?: string; // If undefined, shows current user's projects
}

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
      id={`projects-tabpanel-${index}`}
      aria-labelledby={`projects-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Mock projects data
const mockProjects = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform Redesign',
    description: 'A complete redesign of the user interface and experience for an e-commerce platform.',
    status: 'in_progress',
    progress: 65,
    dueDate: '2025-05-15',
    members: [
      { id: 'user-1', name: 'Alex Johnson', avatar: '/assets/images/avatar.svg' },
      { id: 'user-2', name: 'Sarah Brown', avatar: '/assets/images/avatar.svg' },
      { id: 'user-3', name: 'Mike Taylor', avatar: '/assets/images/avatar.svg' },
    ],
    tags: ['UI/UX', 'Design', 'Web Development'],
  },
  {
    id: 'project-2',
    title: 'Mobile App Development',
    description: 'Development of a mobile application for task management and productivity.',
    status: 'completed',
    progress: 100,
    dueDate: '2025-03-10',
    members: [
      { id: 'user-1', name: 'Alex Johnson', avatar: '/assets/images/avatar.svg' },
      { id: 'user-4', name: 'Emily Williams', avatar: '/assets/images/avatar.svg' },
    ],
    tags: ['Mobile', 'React Native', 'App Development'],
  },
  {
    id: 'project-3',
    title: 'Data Analysis Dashboard',
    description: 'Creation of an interactive dashboard for data visualization and analysis.',
    status: 'planning',
    progress: 15,
    dueDate: '2025-06-30',
    members: [
      { id: 'user-1', name: 'Alex Johnson', avatar: '/assets/images/avatar.svg' },
      { id: 'user-5', name: 'Daniel Martinez', avatar: '/assets/images/avatar.svg' },
      { id: 'user-6', name: 'Lisa Chen', avatar: '/assets/images/avatar.svg' },
      { id: 'user-7', name: 'Robert Wilson', avatar: '/assets/images/avatar.svg' },
    ],
    tags: ['Data Visualization', 'Dashboard', 'Analytics'],
  },
  {
    id: 'project-4',
    title: 'Marketing Campaign',
    description: 'Planning and execution of a digital marketing campaign for a new product launch.',
    status: 'completed',
    progress: 100,
    dueDate: '2025-02-28',
    members: [
      { id: 'user-1', name: 'Alex Johnson', avatar: '/assets/images/avatar.svg' },
      { id: 'user-8', name: 'Jennifer Lee', avatar: '/assets/images/avatar.svg' },
    ],
    tags: ['Marketing', 'Digital', 'Campaign'],
  },
  {
    id: 'project-5',
    title: 'Content Management System',
    description: 'Development of a custom content management system for a publishing company.',
    status: 'in_progress',
    progress: 40,
    dueDate: '2025-07-15',
    members: [
      { id: 'user-1', name: 'Alex Johnson', avatar: '/assets/images/avatar.svg' },
      { id: 'user-3', name: 'Mike Taylor', avatar: '/assets/images/avatar.svg' },
      { id: 'user-9', name: 'Andrew Smith', avatar: '/assets/images/avatar.svg' },
    ],
    tags: ['CMS', 'Web Development', 'Publishing'],
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ userId }) => {
  const [tabValue, setTabValue] = useState(0);

  // Filter projects based on status
  const inProgressProjects = mockProjects.filter(project => project.status === 'in_progress');
  const completedProjects = mockProjects.filter(project => project.status === 'completed');
  const planningProjects = mockProjects.filter(project => project.status === 'planning');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Function to render project cards
  const renderProjectCard = (project: any) => (
    <Card
      component={Link}
      href={`/projects/${project.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            {project.title}
          </Typography>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary" mb={2}>
          {project.description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {project.tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ 
                borderRadius: 1,
                fontSize: '0.75rem',
                height: 22,
              }}
            />
          ))}
        </Box>
        
        {project.status !== 'completed' && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" fontWeight={600}>
                Progress
              </Typography>
              <Typography variant="caption">
                {project.progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={project.progress} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: 'rgba(0, 0, 0, 0.08)',
              }} 
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Due: {new Date(project.dueDate).toLocaleDateString()}
            </Typography>
          </Box>
          
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28 } }}>
            {project.members.map((member: any) => (
              <Avatar 
                key={member.id} 
                alt={member.name} 
                src={member.avatar}
                sx={{ width: 28, height: 28 }}
              />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="projects tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="In Progress" />
          <Tab label="Completed" />
          <Tab label="Planning" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {inProgressProjects.length > 0 ? (
            inProgressProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                {renderProjectCard(project)}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No projects in progress.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          {completedProjects.length > 0 ? (
            completedProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                {renderProjectCard(project)}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No completed projects.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={2}>
          {planningProjects.length > 0 ? (
            planningProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                {renderProjectCard(project)}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No projects in planning stage.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default ProjectsSection;