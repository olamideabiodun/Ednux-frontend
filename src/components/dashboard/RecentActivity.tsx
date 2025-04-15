'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  SwapVert as SwapVertIcon,
  InsertDriveFile as FileIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import Link from 'next/link';

// Mock data for recent activity
const activitiesMockData = [
  {
    id: '1',
    type: 'post',
    user: {
      name: 'Carn Herrera',
      avatar: '/avatar1.jpg',
      role: 'TUTOR',
      url: '/profile/carn-herrera',
    },
    content: 'New article on neural networks!',
    time: '30 m ago',
    url: '/social-feed/post/1',
  },
  {
    id: '2',
    type: 'file',
    fileName: 'UI Design Guidelines.pdf',
    fileType: 'PDF',
    course: 'Days V.',
    size: '1100KB',
    time: '1 hour ago',
    url: '/files/ui-design-guidelines',
  },
  {
    id: '3',
    type: 'assignment',
    title: 'Completed Assignment',
    details: 'Data Analysis Report',
    time: '3 hours ago',
    url: '/assignments/completed/3',
  },
];

const RecentActivity: React.FC = () => {
  const theme = useTheme();

  // Function to render different activity types
  const renderActivityItem = (activity: any) => {
    switch (activity.type) {
      case 'post':
        return (
          <ListItem 
            sx={{ py: 2.5, px: 0 }}
            secondaryAction={
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70, textAlign: 'right' }}>
                {activity.time}
              </Typography>
            }
          >
            <ListItemAvatar>
              <Avatar src={activity.user.avatar} alt={activity.user.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography component="span" fontWeight={600}>
                    {activity.user.name}
                  </Typography>
                  <Chip 
                    label={activity.user.role} 
                    size="small" 
                    sx={{ 
                      height: 20, 
                      fontSize: '0.65rem',
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                    }} 
                  />
                </Box>
              }
              secondary={activity.content}
              primaryTypographyProps={{ fontWeight: 600 }}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        );
      
      case 'file':
        return (
          <ListItem 
            sx={{ py: 2.5, px: 0 }}
            secondaryAction={
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70, textAlign: 'right' }}>
                {activity.time}
              </Typography>
            }
          >
            <ListItemIcon sx={{ minWidth: 56 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#e2e8f0',
                  color: '#3182ce',
                }}
              >
                <FileIcon />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={activity.fileName}
              secondary={
                <>
                  Uploaded a {activity.course}
                  <Chip
                    label={activity.fileType}
                    size="small"
                    variant="outlined"
                    sx={{
                      ml: 1,
                      height: 20,
                      fontSize: '0.65rem',
                      borderRadius: 1,
                    }}
                  />
                </>
              }
              primaryTypographyProps={{ fontWeight: 600 }}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        );
        
      case 'assignment':
        return (
          <ListItem 
            sx={{ py: 2.5, px: 0 }}
            secondaryAction={
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70, textAlign: 'right' }}>
                {activity.time}
              </Typography>
            }
          >
            <ListItemIcon sx={{ minWidth: 56 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#e5e7f9',
                  color: '#4c51bf',
                }}
              >
                <AssignmentIcon />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={activity.title}
              secondary={activity.details}
              primaryTypographyProps={{ fontWeight: 600 }}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        );
        
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Recent Activity
        </Typography>
        <IconButton size="small" color="primary">
          <SwapVertIcon />
        </IconButton>
      </Box>

      <List sx={{ p: 0 }}>
        {activitiesMockData.map((activity, index) => (
          <Box key={activity.id} sx={{ px: 3 }}>
            <Link href={activity.url} style={{ textDecoration: 'none', color: 'inherit' }}>
              {renderActivityItem(activity)}
            </Link>
            {index < activitiesMockData.length - 1 && (
              <Divider component="li" sx={{ listStyleType: 'none' }} />
            )}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity;