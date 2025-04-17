'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Chip, 
  Breadcrumbs,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  TrendingUp as TrendingIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockTrendingTopics } from '@/lib/mockSocialData';

// Additional mock topics for the page
const allTopics = [
  ...mockTrendingTopics,
  { id: 'topic-6', name: 'Education Technology', postCount: 426 },
  { id: 'topic-7', name: 'Remote Learning', postCount: 375 },
  { id: 'topic-8', name: 'Artificial Intelligence', postCount: 812 },
  { id: 'topic-9', name: 'Software Engineering', postCount: 623 },
  { id: 'topic-10', name: 'UX Design', postCount: 492 },
  { id: 'topic-11', name: 'Data Science', postCount: 739 },
  { id: 'topic-12', name: 'Product Management', postCount: 318 },
  { id: 'topic-13', name: 'Cybersecurity', postCount: 287 },
  { id: 'topic-14', name: 'Blockchain', postCount: 245 },
  { id: 'topic-15', name: 'Mobile Development', postCount: 431 },
  { id: 'topic-16', name: 'Web Development', postCount: 567 },
  { id: 'topic-17', name: 'Cloud Computing', postCount: 389 },
  { id: 'topic-18', name: 'DevOps', postCount: 278 },
  { id: 'topic-19', name: 'Game Development', postCount: 365 },
  { id: 'topic-20', name: 'Digital Marketing', postCount: 412 },
];

// Categorize topics
const topicCategories = [
  { id: 'tech', name: 'Technology', topics: ['Machine Learning', 'Quantum Computing', 'Artificial Intelligence', 'Software Engineering', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'DevOps'] },
  { id: 'edu', name: 'Education', topics: ['Collaborative Learning', 'Remote Learning', 'Education Technology'] },
  { id: 'design', name: 'Design', topics: ['Sustainable Design', 'UX Design'] },
  { id: 'science', name: 'Science', topics: ['Cognitive Science', 'Data Science'] },
  { id: 'dev', name: 'Development', topics: ['Web Development', 'Mobile Development', 'Game Development'] },
  { id: 'business', name: 'Business', topics: ['Product Management', 'Digital Marketing'] },
];

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTopics = searchQuery.trim() 
    ? allTopics.filter(topic => 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory === 'all'
    ? allTopics
    : allTopics.filter(topic => {
        const category = topicCategories.find(cat => cat.id === activeCategory);
        return category?.topics.includes(topic.name);
      });

  return (
    <Box>
      {/* Header with breadcrumbs */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton
          component={Link}
          href="/social-feed"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/social-feed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary">Social Feed</Typography>
          </Link>
          <Typography color="text.primary">Topics</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 3 }}>
        Browse Topics
      </Typography>

      {/* Search and filter */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 4,
        }}
      >
        {/* Search bar */}
        <TextField
          fullWidth
          placeholder="Search topics..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
          sx={{ mb: 3 }}
        />

        {/* Category filters */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="All Topics"
            clickable
            onClick={() => setActiveCategory('all')}
            color={activeCategory === 'all' ? 'primary' : 'default'}
            sx={{ 
              borderRadius: 2,
              fontWeight: activeCategory === 'all' ? 600 : 400,
            }}
          />
          {topicCategories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              clickable
              onClick={() => setActiveCategory(category.id)}
              color={activeCategory === category.id ? 'primary' : 'default'}
              sx={{ 
                borderRadius: 2,
                fontWeight: activeCategory === category.id ? 600 : 400,
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Trending topics section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={600}>
            Trending Topics
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {mockTrendingTopics.map((topic) => (
            <Grid item xs={12} sm={6} md={4} key={topic.id}>
              <Paper
                component={Link}
                href={`/social-feed/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="h6" fontWeight={600}>
                      #{topic.name}
                    </Typography>
                    <Chip 
                      size="small" 
                      icon={<TrendingIcon sx={{ fontSize: '0.75rem !important' }} />}
                      label="Trending" 
                      color="primary"
                      sx={{ 
                        ml: 1, 
                        height: 20, 
                        '& .MuiChip-label': { px: 0.5, fontSize: '0.65rem' },
                        '& .MuiChip-icon': { ml: 0.5 }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {topic.postCount.toLocaleString()} posts
                  </Typography>
                </Box>
                <IconButton>
                  <ArrowForwardIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* All topics or search results */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          {searchQuery ? 'Search Results' : activeCategory !== 'all' ? `${topicCategories.find(cat => cat.id === activeCategory)?.name} Topics` : 'All Topics'}
        </Typography>

        {filteredTopics.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No topics found matching your search.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {filteredTopics.map((topic) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={topic.id}>
                <Paper
                  component={Link}
                  href={`/social-feed/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    textDecoration: 'none',
                    color: 'inherit',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    #{topic.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topic.postCount.toLocaleString()} posts
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}