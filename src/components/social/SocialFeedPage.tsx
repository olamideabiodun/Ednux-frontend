// src/components/social/SocialFeedPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostCard from '@/components/social/PostCard';
import CreatePostModal from '@/components/social/CreatePostModal';
import TrendingTopics from '@/components/social/TrendingTopics';
import SuggestedUsers from '@/components/social/SuggestedUsers';
import PersonalGLE from '@/components/social/PersonalGLE';
import { useAuth } from '@/hooks/useAuth';
import { mockPosts } from '@/lib/mockSocialData';

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
      id={`feed-tabpanel-${index}`}
      aria-labelledby={`feed-tab-${index}`}
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

const SocialFeedPage: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // In a real app, we would fetch different posts based on the tab
  };
  
  const handleCreatePost = (postData: any) => {
    // In a real app, this would be an API call
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar || '/assets/images/avatar.svg',
      },
      content: postData.text,
      media: postData.media,
      voiceNote: postData.voiceNote,
      gleContent: postData.gleContent,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      isLiked: false,
      isBookmarked: false,
    };
    
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
  };
  
  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 3 }}>
        Social Feed
      </Typography>
      
      <Grid container spacing={3}>
        {/* Main Feed Column */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 2,
              mb: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ flexGrow: 1 }}
              >
                <Tab label="For You" />
                <Tab label="Following" />
                <Tab label="Trending" />
                <Tab label="GLE Community" />
              </Tabs>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsCreateModalOpen(true)}
                sx={{ 
                  ml: 2,
                  borderRadius: 8,
                  textTransform: 'none',
                  minWidth: isMobile ? 'auto' : undefined,
                  width: isMobile ? 48 : undefined,
                  px: isMobile ? 0 : 2,
                }}
              >
                {isMobile ? <AddIcon /> : 'Create Post'}
              </Button>
            </Box>
            
            {/* For You Tab */}
            <TabPanel value={tabValue} index={0}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </Box>
              )}
            </TabPanel>
            
            {/* Following Tab */}
            <TabPanel value={tabValue} index={1}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {posts
                    .filter((post) => post.author.isFollowing)
                    .map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </Box>
              )}
            </TabPanel>
            
            {/* Trending Tab */}
            <TabPanel value={tabValue} index={2}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {posts
                    .filter((post) => post.trending)
                    .map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </Box>
              )}
            </TabPanel>
            
            {/* GLE Community Tab */}
            <TabPanel value={tabValue} index={3}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {posts
                    .filter((post) => post.gleContent)
                    .map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Grid>
        
        {/* Right Sidebar */}
        {!isTablet && (
          <Grid item xs={12} lg={4}>
            {/* Personal GLE Section */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                mb: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <PersonalGLE />
            </Paper>
            
            {/* Trending Topics */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                mb: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <TrendingTopics />
            </Paper>
            
            {/* Suggested Users */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
            >
              <SuggestedUsers />
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Create Post Modal */}
      <CreatePostModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </Box>
  );
};

export default SocialFeedPage;