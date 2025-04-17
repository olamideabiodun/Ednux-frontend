'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  IconButton 
} from '@mui/material';
import { 
  TrendingUp as TrendingIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockTrendingTopics } from '@/lib/mockSocialData';

const TrendingTopics: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Trending Topics
        </Typography>
        <TrendingIcon sx={{ color: 'primary.main' }} />
      </Box>
      
      <List disablePadding>
        {mockTrendingTopics.map((topic) => (
          <ListItem
            key={topic.id}
            disablePadding
            secondaryAction={
              <IconButton edge="end" size="small">
                <ArrowRightIcon />
              </IconButton>
            }
            sx={{ mb: 1 }}
          >
            <Link 
              href={`/social-feed/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" fontWeight={600}>
                    #{topic.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {topic.postCount.toLocaleString()} posts
                  </Typography>
                </Box>
                <Chip 
                  icon={<TrendingIcon sx={{ fontSize: '0.75rem !important' }} />}
                  label="Trending"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    height: 20, 
                    '& .MuiChip-label': { px: 0.5, fontSize: '0.65rem' },
                    '& .MuiChip-icon': { ml: 0.5 }
                  }}
                />
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography 
          component={Link}
          href="/social-feed/topics"
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
          See all topics
        </Typography>
      </Box>
    </Box>
  );
};

export default TrendingTopics;