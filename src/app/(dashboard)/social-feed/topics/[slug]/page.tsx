'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Chip, 
  Tabs, 
  Tab,
  Grid,
  Breadcrumbs,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingIcon,
  NotificationsNone as NotificationsNoneIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockTrendingTopics, mockPosts } from '@/lib/mockSocialData';
import PostCard from '@/components/social/PostCard';

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
      id={`topic-tabpanel-${index}`}
      aria-labelledby={`topic-tab-${index}`}
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

export default function TopicDetailPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTopicData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Convert slug to topic name format
        const topicName = (slug as string)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Find topic in mock data
        const foundTopic = mockTrendingTopics.find(
          topic => topic.name.toLowerCase() === topicName.toLowerCase()
        );
        
        if (foundTopic) {
          setTopicData({
            ...foundTopic,
            description: `Explore the latest discussions, insights, and updates about ${foundTopic.name}. Join the conversation and connect with others interested in this topic.`,
            subscriberCount: Math.floor(Math.random() * 5000) + 1000,
          });
          
          // Filter related posts
          const relatedPosts = mockPosts.filter(post => 
            post.content.toLowerCase().includes(foundTopic.name.toLowerCase()) ||
            (post.gleContent && post.gleContent.topic.toLowerCase().includes(foundTopic.name.toLowerCase()))
          );
          
          setPosts(relatedPosts);
        } else {
          // Create mock topic if not found
          setTopicData({
            id: `topic-${Date.now()}`,
            name: topicName,
            postCount: Math.floor(Math.random() * 1000) + 100,
            description: `Explore the latest discussions, insights, and updates about ${topicName}. Join the conversation and connect with others interested in this topic.`,
            subscriberCount: Math.floor(Math.random() * 5000) + 1000,
          });
          
          // Filter related posts (use general posts for unknown topics)
          setPosts(mockPosts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching topic data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTopicData();
    }
  }, [slug]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    // In a real app, this would call an API to subscribe/unsubscribe
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!topicData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Topic not found</Typography>
        <Button
          component={Link}
          href="/social-feed/topics"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Browse Topics
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with breadcrumbs */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton
          component={Link}
          href="/social-feed/topics"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/social-feed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary">Social Feed</Typography>
          </Link>
          <Link href="/social-feed/topics" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary">Topics</Typography>
          </Link>
          <Typography color="text.primary">{topicData.name}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Topic header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative element */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 6,
            height: '100%',
            bgcolor: 'primary.main',
          }}
        />

        <Box sx={{ pl: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h4" component="h1" fontWeight={700} sx={{ mr: 2 }}>
                  #{topicData.name}
                </Typography>
                <Chip
                  icon={<TrendingIcon sx={{ fontSize: '0.875rem !important' }} />}
                  label="Trending"
                  color="primary"
                  size="small"
                  sx={{ 
                    height: 24, 
                    '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                    '& .MuiChip-icon': { ml: 0.5 }
                  }}
                />
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {topicData.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {topicData.postCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {topicData.subscriberCount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Subscribers
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant={subscribed ? "outlined" : "contained"}
              startIcon={subscribed ? <NotificationsIcon /> : <NotificationsNoneIcon />}
              onClick={handleSubscribe}
              sx={{ 
                borderRadius: 8,
                textTransform: 'none',
              }}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Tabs navigation */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab label="Latest Posts" />
          <Tab label="Popular" />
          <Tab label="GLE Content" />
        </Tabs>

        {/* Latest Posts Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2 }}>
            {posts.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No posts found for this topic.
                </Typography>
                <Button
                  component={Link}
                  href="/social-feed"
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                >
                  Explore Feed
                </Button>
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* Popular Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            {posts.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[...posts]
                  .sort((a, b) => b.likes - a.likes)
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No popular posts found for this topic.
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* GLE Content Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 2 }}>
            {posts.filter(post => post.gleContent).length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {posts
                  .filter(post => post.gleContent)
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No GLE content found for this topic.
                </Typography>
                <Button
                  component={Link}
                  href="/gle/create"
                  variant="contained"
                  sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                >
                  Create GLE Content
                </Button>
              </Box>
            )}
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}