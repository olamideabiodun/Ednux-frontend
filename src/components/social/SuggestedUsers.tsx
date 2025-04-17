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
  Button, 
  Tooltip
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockSuggestedUsers } from '@/lib/mockSocialData';

const SuggestedUsers: React.FC = () => {
  const [following, setFollowing] = React.useState<Record<string, boolean>>({});
  
  const handleFollow = (userId: string) => {
    setFollowing(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
    
    // In a real app, we would call an API to follow/unfollow
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Suggested Connections
        </Typography>
        <PeopleIcon sx={{ color: 'primary.main' }} />
      </Box>
      
      <List disablePadding>
        {mockSuggestedUsers.map((user) => (
          <ListItem
            key={user.id}
            disablePadding
            sx={{ mb: 1.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                p: 1,
                borderRadius: 2,
                bgcolor: 'rgba(0, 0, 0, 0.02)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  component={Link}
                  href={`/profile/${user.id}`}
                  sx={{ 
                    cursor: 'pointer',
                    width: 44,
                    height: 44,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link 
                    href={`/profile/${user.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {user.name}
                    </Typography>
                  </Link>
                }
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {user.bio}
                    </Typography>
                    
                    <Tooltip title="Mutual connections">
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mt: 0.5,
                          color: 'primary.main',
                        }}
                      >
                        <PeopleIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                        <Typography variant="caption" color="primary">
                          {user.mutualConnections} mutual
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                }
                primaryTypographyProps={{
                  sx: { mb: 0 },
                }}
                sx={{ my: 0 }}
              />
              <Button
                variant={following[user.id] ? "outlined" : "contained"}
                size="small"
                startIcon={following[user.id] ? undefined : <PersonAddIcon fontSize="small" />}
                onClick={() => handleFollow(user.id)}
                sx={{ 
                  ml: 1, 
                  minWidth: 90,
                  borderRadius: 8,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                }}
              >
                {following[user.id] ? 'Following' : 'Follow'}
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography 
          component={Link}
          href="/connections"
          variant="body2" 
          color="primary" 
          sx={{ 
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Find more connections
        </Typography>
      </Box>
    </Box>
  );
};

export default SuggestedUsers;