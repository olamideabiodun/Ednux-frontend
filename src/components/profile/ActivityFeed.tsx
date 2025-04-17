'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Divider, 
  Chip, 
  IconButton 
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Forum as ForumIcon,
  InsertDriveFile as FileIcon,
  Star as StarIcon,
  Group as GroupIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  userId?: string; // If undefined, shows current user's activity
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ userId }) => {
  // Mock data - in a real app this would come from an API
  const activities = [
    {
      id: '1',
      type: 'course_completion',
      title: 'Completed a course',
      description: 'Machine Learning Fundamentals',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: <SchoolIcon />,
      iconColor: '#3b82f6',
      iconBg: '#dbeafe',
    },
    {
      id: '2',
      type: 'assignment_submission',
      title: 'Submitted an assignment',
      description: 'Data Analysis Project',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      icon: <AssignmentIcon />,
      iconColor: '#10b981',
      iconBg: '#dcfce7',
    },
    {
      id: '3',
      type: 'forum_post',
      title: 'Posted in forum',
      description: 'React Components Best Practices',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      icon: <ForumIcon />,
      iconColor: '#f59e0b',
      iconBg: '#fef3c7',
    },
    {
      id: '4',
      type: 'file_upload',
      title: 'Uploaded a file',
      description: 'Project Presentation.pptx',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
      icon: <FileIcon />,
      iconColor: '#6366f1',
      iconBg: '#e0e7ff',
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Earned an achievement',
      description: 'Perfect Attendance - 30 days streak',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      icon: <StarIcon />,
      iconColor: '#ec4899',
      iconBg: '#fce7f3',
    },
    {
      id: '6',
      type: 'group_join',
      title: 'Joined a study group',
      description: 'Advanced Algorithms',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      icon: <GroupIcon />,
      iconColor: '#8b5cf6',
      iconBg: '#ede9fe',
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Recent Activity
        </Typography>
      </Box>
      
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton edge="end" aria-label="more options">
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{ py: 2 }}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    bgcolor: activity.iconBg, 
                    color: activity.iconColor 
                  }}
                >
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {activity.title}
                    </Typography>
                    <Chip 
                      label={formatDistanceToNow(activity.timestamp, { addSuffix: true })} 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        height: 20, 
                        fontSize: '0.65rem',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.primary">
                    {activity.description}
                  </Typography>
                }
              />
            </ListItem>
            {index < activities.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ActivityFeed;