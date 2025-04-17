'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Breadcrumbs, 
  Button, 
  IconButton,
  Chip,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Lightbulb as LightbulbIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  Comment as CommentIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { mockGLERecommendations } from '@/lib/mockSocialData';

// Mock GLE data - in a real app, this would come from an API
const mockGLEDetail = {
  id: 'gle-rec-1',
  title: 'Understanding Neural Networks',
  type: 'insight',
  topic: 'Artificial Intelligence',
  format: 'detailed',
  complexity: 75,
  content: `Neural networks are computational models inspired by the human brain's structure and function. They consist of interconnected nodes (neurons) organized in layers that process information.

Key components include:

1. Input Layer: Receives raw data
2. Hidden Layers: Process information through weighted connections
3. Output Layer: Produces the final result
4. Activation Functions: Non-linear functions that determine neuron output
5. Weights and Biases: Parameters adjusted during training

The power of neural networks lies in their ability to learn complex patterns from data through a process called backpropagation, where the network adjusts its weights based on prediction errors.

Neural networks excel at tasks like image recognition, natural language processing, and decision-making where traditional algorithms struggle with ambiguity and complexity.`,
  sources: [
    { title: 'Deep Learning Fundamentals', url: '#' },
    { title: 'Neural Networks and Deep Learning', url: '#' },
    { title: 'Journal of Machine Learning Research', url: '#' }
  ],
  relatedTopics: ['Deep Learning', 'Backpropagation', 'Computer Vision', 'AI Ethics'],
  author: {
    id: 'user-3',
    name: 'Sarah Williams',
    avatar: '/assets/images/avatar.svg',
    expertise: 'AI Researcher'
  },
  createdAt: '2025-02-15T10:30:00Z',
  likes: 124,
  bookmarks: 56,
  comments: 18,
  isLiked: false,
  isBookmarked: false,
  relevanceScore: 98
};

export default function GLEDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [gleContent, setGleContent] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [relatedContent, setRelatedContent] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchGLE = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use mock data for now
        if (id === 'gle-rec-1' || id === 'gle-rec-2' || id === 'gle-rec-3') {
          // Find GLE in mock recommendations
          const foundGLE = mockGLERecommendations.find(gle => gle.id === id);
          if (foundGLE) {
            // Merge with detailed mock data
            setGleContent({
              ...mockGLEDetail,
              ...foundGLE
            });
            setIsLiked(mockGLEDetail.isLiked);
            setIsBookmarked(mockGLEDetail.isBookmarked);
            setLikesCount(mockGLEDetail.likes);
            
            // Set related content (other GLEs)
            setRelatedContent(
              mockGLERecommendations
                .filter(gle => gle.id !== id)
                .slice(0, 2)
            );
          }
        } else {
          // Use mock detail data
          setGleContent(mockGLEDetail);
          setIsLiked(mockGLEDetail.isLiked);
          setIsBookmarked(mockGLEDetail.isBookmarked);
          setLikesCount(mockGLEDetail.likes);
          
          // Set related content (other GLEs)
          setRelatedContent(mockGLERecommendations.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching GLE:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGLE();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    // In a real app, this would call an API to update the like status
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would call an API to update the bookmark status
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Sharing GLE content');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!gleContent) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">GLE content not found</Typography>
        <Button
          component={Link}
          href="/social-feed"
          variant="contained"
          sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
          startIcon={<ArrowBackIcon />}
        >
          Back to Feed
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Main content column */}
        <Box sx={{ flex: 1 }}>
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
              <Typography color="text.primary">GLE Content</Typography>
            </Breadcrumbs>
          </Box>

          {/* GLE Content */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
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
                width: 8,
                height: '100%',
                bgcolor: 'primary.main',
              }}
            />

            {/* Content header */}
            <Box sx={{ pl: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbIcon color="primary" sx={{ mr: 1 }} />
                <Chip 
                  label={gleContent.type === 'insight' ? 'Learning Insight' : 
                         gleContent.type === 'tips' ? 'Practical Tips' : 
                         'Conceptual Understanding'}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`Complexity: ${gleContent.complexity}%`}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 2 }}>
                {gleContent.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={gleContent.author?.avatar} 
                  alt={gleContent.author?.name}
                  sx={{ mr: 1.5 }}
                />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {gleContent.author?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {gleContent.author?.expertise} • {formatDistanceToNow(new Date(gleContent.createdAt), { addSuffix: true })}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Main content */}
              <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {gleContent.content}
              </Typography>

              {/* Sources */}
              {gleContent.sources && gleContent.sources.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Sources
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {gleContent.sources.map((source: any, index: number) => (
                      <Typography component="li" key={index} variant="body2">
                        <Link href={source.url} style={{ color: 'inherit' }}>
                          {source.title}
                        </Link>
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Related topics */}
              {gleContent.relatedTopics && gleContent.relatedTopics.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Related Topics
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {gleContent.relatedTopics.map((topic: string, index: number) => (
                      <Chip
                        key={index}
                        label={topic}
                        variant="outlined"
                        component={Link}
                        href={`/social-feed/topics/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                        clickable
                        sx={{ borderRadius: 2 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Engagement buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    onClick={handleLike}
                    color={isLiked ? 'primary' : 'inherit'}
                    sx={{ textTransform: 'none' }}
                  >
                    {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                  </Button>
                  <Button
                    startIcon={<CommentIcon />}
                    component={Link}
                    href={`/social-feed/post/${id}`}
                    sx={{ textTransform: 'none' }}
                  >
                    {gleContent.comments} {gleContent.comments === 1 ? 'Comment' : 'Comments'}
                  </Button>
                </Box>
                <Box>
                  <IconButton onClick={handleBookmark} color={isBookmarked ? 'primary' : 'inherit'}>
                    {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: { xs: '100%', lg: 320 } }}>
          {/* Related GLE content */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Related Content
            </Typography>

            {relatedContent.map((item) => (
              <Box
                key={item.id}
                component={Link}
                href={`/gle/${item.id}`}
                sx={{
                  display: 'block',
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  transition: 'background-color 0.2s',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LightbulbIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="primary.main" fontWeight={500}>
                    {item.relevanceScore}% Relevant
                  </Typography>
                </Box>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.topic} • Complexity: {item.complexity}%
                </Typography>
              </Box>
            ))}

            <Button
              component={Link}
              href="/social-feed?tab=gle"
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 2, textTransform: 'none', mt: 1 }}
            >
              Explore More
            </Button>
          </Paper>

          {/* Create your own GLE CTA */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              bgcolor: 'rgba(67, 97, 238, 0.05)',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LightbulbIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="h6" fontWeight={600}>
                Share Your Knowledge
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create your own Guided Learning Experience to share with the community.
            </Typography>
            <Button
              component={Link}
              href="/gle/create"
              fullWidth
              variant="contained"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Create GLE
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}