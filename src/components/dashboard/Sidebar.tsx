'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  Class as ClassroomIcon,
  Assignment as AssignmentsIcon,
  Grade as GradesIcon,
  Checklist as AttendanceIcon,
  Message as MessagesIcon,
  Feed as SocialFeedIcon,
  TaskAlt as ProjectsIcon,
  Folder as FilesIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

const navigationItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  { text: 'Profile', icon: <PersonIcon />, href: '/profile' },
  { text: 'Courses', icon: <CoursesIcon />, href: '/courses' },
  { text: 'Classroom', icon: <ClassroomIcon />, href: '/classroom' },
  { text: 'Assignments', icon: <AssignmentsIcon />, href: '/assignments' },
  { text: 'Grades', icon: <GradesIcon />, href: '/grades' },
  { text: 'Attendance', icon: <AttendanceIcon />, href: '/attendance' },
  { text: 'Messages', icon: <MessagesIcon />, href: '/messages' },
  { text: 'Social Feed', icon: <SocialFeedIcon />, href: '/social-feed' },
  { text: 'Projects', icon: <ProjectsIcon />, href: '/projects' },
  { text: 'Files', icon: <FilesIcon />, href: '/files' },
  { text: 'Calendar', icon: <CalendarIcon />, href: '/calendar' },
  { text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: '#1e40af',
        color: 'white',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        display: { xs: 'none', sm: 'block' },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 800,
            color: 'white',
            mb: 0,
          }}
        >
          Ed<span style={{ color: '#a0c0ff' }}>nux</span>
        </Typography>
      </Box>

      {/* User Info */}
      <Box
        sx={{
          py: 2, 
          px: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <Avatar 
          src={user?.avatar || '/assets/images/avatar.svg'} 
          alt={user?.name || 'User'} 
          sx={{ 
            width: 40, 
            height: 40, 
            border: '2px solid rgba(255, 255, 255, 0.5)' 
          }}
        />
        <Box sx={{ overflow: 'hidden' }}>
          <Typography 
            variant="body1" 
            noWrap 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.95rem' 
            }}
          >
            {user?.name || 'User'}
          </Typography>
          <Typography 
            variant="body2" 
            noWrap
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.8rem' 
            }}
          >
            {user?.email || 'user@example.com'}
          </Typography>
        </Box>
      </Box>

      {/* Navigation Items */}
      <List sx={{ py: 1 }}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: '8px',
                    mx: 1,
                    bgcolor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.95rem',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;