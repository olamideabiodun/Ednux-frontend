'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  MenuItem,
  Menu,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack,
  MoreVert,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  AssignmentTurnedIn as TaskIcon,
  ChatBubbleOutline as CommentIcon,
  InsertDriveFile as FileIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import Link from 'next/link';

// Mock tasks data
const mockTasks = [
  {
    id: 'task-1',
    title: 'Design UI components',
    status: 'completed',
    dueDate: '2025-03-10',
    assignee: { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar.png' },
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Implement authentication',
    status: 'in_progress',
    dueDate: '2025-03-15',
    assignee: { id: 'user-2', name: 'Jane Smith', avatar: '/assets/images/avatar.png' },
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'Create responsive layouts',
    status: 'todo',
    dueDate: '2025-03-18',
    assignee: { id: 'user-3', name: 'Alex Johnson', avatar: '/assets/images/avatar.png' },
    priority: 'high',
  },
  {
    id: 'task-4',
    title: 'Write unit tests',
    status: 'todo',
    dueDate: '2025-03-20',
    assignee: { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar.png' },
    priority: 'low',
  },
];

// Mock team members
const mockTeam = [
  { id: 'user-1', name: 'John Doe', role: 'Frontend Developer', avatar: '/assets/images/avatar.png' },
  { id: 'user-2', name: 'Jane Smith', role: 'UI/UX Designer', avatar: '/assets/images/avatar.png' },
  { id: 'user-3', name: 'Alex Johnson', role: 'Backend Developer', avatar: '/assets/images/avatar.png' },
];

// Mock project data
const mockProject = {
  id: 'project-1',
  title: 'Ednux Project',
  description: 'Task Management project with multiple features including authentication, user management, and real-time updates.',
  status: 'ongoing',
  progress: 85,
  startDate: '2025-01-15',
  endDate: '2025-04-30',
  team: mockTeam,
  tasks: mockTasks,
};

type TabValue = 'tasks' | 'files' | 'team';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#3b82f6';
    default:
      return '#3b82f6';
  }
};

export default function ProjectDetailsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const params = useParams();
  const router = useRouter();
  const [tabValue, setTabValue] = useState<TabValue>('tasks');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [taskMenuAnchorEl, setTaskMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const projectId = params.id as string;
  const project = mockProject; // In a real app, you would fetch the specific project

  // Calculate task statistics
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = project.tasks.filter(task => task.status === 'in_progress').length;
  const todoTasks = project.tasks.filter(task => task.status === 'todo').length;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTaskMenuOpen = (event: React.MouseEvent<HTMLElement>, taskId: string) => {
    event.stopPropagation();
    setTaskMenuAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleTaskMenuClose = () => {
    setTaskMenuAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleDeleteProject = () => {
    handleMenuClose();
    // In a real app, you would call an API to delete the project
    router.push('/projects');
  };

  const handleEditProject = () => {
    handleMenuClose();
    // In a real app, you would navigate to edit page or open edit dialog
  };

  const handleTaskStatusChange = (taskId: string) => {
    // In a real app, you would update the task status
    console.log(`Toggling status for task ${taskId}`);
  };

  return (
    <Box>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          component={Link}
          href="/projects"
          sx={{ mr: 2, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Project Details
        </Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEditProject}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit Project
          </MenuItem>
          <MenuItem onClick={handleDeleteProject} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete Project
          </MenuItem>
        </Menu>
      </Box>

      {/* Project summary */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {new Date(project.startDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Due Date
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {new Date(project.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  size="small"
                  sx={{
                    bgcolor: project.status === 'ongoing' ? 'primary.main' : 'success.main',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                Team Members
              </Typography>
              <AvatarGroup max={5}>
                {project.team.map((member) => (
                  <Avatar key={member.id} src={member.avatar} alt={member.name} />
                ))}
              </AvatarGroup>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ textAlign: { xs: 'left', md: 'center' }, mb: 2 }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {project.progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 3,
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: project.progress === 100 ? theme.palette.success.main : theme.palette.primary.main,
                },
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="primary.main">
                    {todoTasks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    To Do
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="warning.main">
                    {inProgressTasks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center', p: 1, bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="success.main">
                    {completedTasks}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs for project content */}
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile}
          allowScrollButtonsMobile
          sx={{
            px: 2,
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Tab
            icon={<TaskIcon />}
            label="Tasks"
            value="tasks"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab
            icon={<FileIcon />}
            label="Files"
            value="files"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
          <Tab
            icon={<TeamIcon />}
            label="Team"
            value="team"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </Tabs>

        <Divider />

        {/* Tab content */}
        <Box sx={{ p: 3 }}>
          {/* Tasks Tab */}
          {tabValue === 'tasks' && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Tasks
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ borderRadius: 28, textTransform: 'none' }}
                >
                  Add Task
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Task</TableCell>
                      <TableCell>Assignee</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.tasks.map((task) => (
                      <TableRow key={task.id} hover>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleTaskStatusChange(task.id)}
                            color={task.status === 'completed' ? 'success' : 'default'}
                          >
                            {task.status === 'completed' ? <CheckCircleIcon /> : <UncheckedIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                              color: task.status === 'completed' ? 'text.secondary' : 'text.primary',
                            }}
                          >
                            {task.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={task.assignee.avatar} sx={{ width: 30, height: 30, mr: 1 }} />
                            <Typography variant="body2">{task.assignee.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            size="small"
                            sx={{
                              bgcolor: `${getPriorityColor(task.priority)}20`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 500,
                              borderRadius: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={(e) => handleTaskMenuOpen(e, task.id)}>
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Task Action Menu */}
              <Menu
                anchorEl={taskMenuAnchorEl}
                open={Boolean(taskMenuAnchorEl)}
                onClose={handleTaskMenuClose}
              >
                <MenuItem onClick={handleTaskMenuClose}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit Task
                </MenuItem>
                <MenuItem onClick={handleTaskMenuClose}>
                  <CommentIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Comment
                </MenuItem>
                <MenuItem onClick={handleTaskMenuClose} sx={{ color: 'error.main' }}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete Task
                </MenuItem>
              </Menu>
            </>
          )}

          {/* Files Tab */}
          {tabValue === 'files' && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No files uploaded yet
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2, borderRadius: 28, textTransform: 'none' }}
              >
                Upload Files
              </Button>
            </Box>
          )}

          {/* Team Tab */}
          {tabValue === 'team' && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Team Members
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ borderRadius: 28, textTransform: 'none' }}
                >
                  Add Member
                </Button>
              </Box>

              <Grid container spacing={2}>
                {project.team.map((member) => (
                  <Grid item xs={12} sm={6} md={4} key={member.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar src={member.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.role}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}