'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  Divider,
  IconButton,
  Badge,
  Popover,
  Button,
  Tab,
  Tabs,
  CircularProgress
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

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
      id={`notification-tabpanel-${index}`}
      aria-labelledby={`notification-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// Mock notifications data
const mockNotifications = [
  {
    id: 'notification-1',
    type: 'like',
    read: false,
    content: 'Alex Johnson liked your post',
    userId: 'user-2',
    userAvatar: '/assets/images/avatar.svg',
    targetId: 'post-1',
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 'notification-2',
    type: 'comment',
    read: false,
    content: 'Sarah Williams commented on your post',
    userId: 'user-3',
    userAvatar: '/assets/images/avatar.svg',
    targetId: 'post-4',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notification-3',
    type: 'follow',
    read: true,
    content: 'Michael Chen started following you',
    userId: 'user-4',
    userAvatar: '/assets/images/avatar.svg',
    targetId: 'user-4',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notification-4',
    type: 'mention',
    read: false,
    content: 'Emily Davis mentioned you in a comment',
    userId: 'user-5',
    userAvatar: '/assets/images/avatar.svg',
    targetId: 'comment-2-1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notification-5',
    type: 'gle',
    read: true,
    content: 'New GLE content recommended for you',
    targetId: 'gle-rec-1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const NotificationsPanel: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleOpenNotifications = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (loading) return;
    
    // Simulate fetching notifications
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleNotificationClick = (notificationId: string) => {
    // Mark notification as read
    setNotifications(
      notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    
    // In a real app, navigate to the target
    // For now, just close the panel
    handleCloseNotifications();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;

  // Filter notifications based on tab
  const filteredNotifications = tabValue === 0 
    ? notifications 
    : tabValue === 1 
    ? notifications.filter(notification => !notification.read)
    : notifications.filter(notification => notification.read);

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleOpenNotifications}
        color="inherit"
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}>
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
          <Box>
            <IconButton size="small" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
              <CheckCircleIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" component={Link} href="/notifications/settings">
              <SettingsIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleCloseNotifications}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All" />
          <Tab 
            label={
              <Badge badgeContent={unreadCount} color="error" max={99}>
                <Typography variant="body2">Unread</Typography>
              </Badge>
            } 
          />
          <Tab label="Read" />
        </Tabs>

        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={30} />
          </Box>
        )}

        {/* Notification lists by tab */}
        {!loading && (
          <>
            <TabPanel value={tabValue} index={0}>
              <NotificationsList 
                notifications={filteredNotifications} 
                onNotificationClick={handleNotificationClick} 
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <NotificationsList 
                notifications={filteredNotifications} 
                onNotificationClick={handleNotificationClick} 
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <NotificationsList 
                notifications={filteredNotifications} 
                onNotificationClick={handleNotificationClick} 
              />
            </TabPanel>
          </>
        )}

        {/* Footer */}
        <Box sx={{ 
          p: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center'
        }}>
          <Button 
            component={Link} 
            href="/notifications"
            fullWidth
            variant="text"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            See All Notifications
          </Button>
        </Box>
      </Popover>
    </>
  );
};

// Notifications list component
interface NotificationsListProps {
  notifications: any[];
  onNotificationClick: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onNotificationClick }) => {
  if (notifications.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No notifications
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {notifications.map((notification, index) => (
        <React.Fragment key={notification.id}>
          <ListItem
            button
            sx={{ 
              px: 2, 
              py: 1.5,
              bgcolor: notification.read ? 'inherit' : 'rgba(67, 97, 238, 0.05)'
            }}
            onClick={() => onNotificationClick(notification.id)}
          >
            <ListItemAvatar>
              {notification.userId ? (
                <Avatar src={notification.userAvatar} alt="User Avatar" />
              ) : (
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <NotificationsIcon />
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={notification.content}
              secondary={formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: notification.read ? 400 : 600,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
              }}
            />
            <IconButton size="small" edge="end">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItem>
          {index < notifications.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationsPanel;