import React from 'react';
import { Box, Typography, Avatar, AvatarGroup, IconButton, Paper, useTheme } from '@mui/material';
import { MoreHoriz as MoreIcon, Folder as FolderIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import Link from 'next/link';

interface TeamMember {
  id: string;
  avatar: string;
}

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'ongoing' | 'completed' | 'cancelled';
  team: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

const ProjectCard: React.FC<{ project: ProjectProps }> = ({ project }) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return theme.palette.primary.main;
      case 'completed':
        return theme.palette.success.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main, ml: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      component={Link}
      href={`/projects/${project.id}`}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'rgba(67, 97, 238, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <FolderIcon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              {project.title}
              {getStatusIcon(project.status)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          <MoreIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.8rem' } }}>
          {project.team.map((member) => (
            <Avatar key={member.id} src={member.avatar} alt="Team member" />
          ))}
        </AvatarGroup>

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <Box
            sx={{
              width: 45,
              height: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <svg width="45" height="45" viewBox="0 0 45 45">
              {/* Background Circle */}
              <circle
                cx="22.5"
                cy="22.5"
                r="20"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="5"
              />
              {/* Progress Circle */}
              <circle
                cx="22.5"
                cy="22.5"
                r="20"
                fill="none"
                stroke={getStatusColor(project.status)}
                strokeWidth="5"
                strokeDasharray={`${(project.progress / 100) * 2 * Math.PI * 20} ${2 * Math.PI * 20}`}
                strokeDashoffset={2 * Math.PI * 5}
                transform="rotate(-90 22.5 22.5)"
              />
            </svg>
            <Typography
              variant="caption"
              component="div"
              fontWeight="bold"
              sx={{
                position: 'absolute',
                color: getStatusColor(project.status),
              }}
            >
              {project.progress}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectCard;