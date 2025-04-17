'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  TextField, 
  InputAdornment, 
  IconButton,
  Divider,
  CircularProgress,
  Breadcrumbs,
} from '@mui/material';
import { 
  Send as SendIcon, 
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import PostCard from '@/components/social/PostCard';
import Comment from '@/components/social/Comment';
import { mockPosts } from '@/lib/mockSocialData';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find post in mock data
        const foundPost = mockPosts.find(p => p.id === id);
        if (foundPost) {
          setPost(foundPost);
          setComments(foundPost.comments || []);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    // In a real app, this would be an API call
    const newComment = {
      id: `comment-${Date.now()}`,
      postId: post.id,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar || '/assets/images/avatar.svg',
      },
      content: commentText,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const handleReplyToComment = (commentId: string, content: string) => {
    // In a real app, this would be an API call
    const parentComment = comments.find(c => c.id === commentId);
    
    if (parentComment) {
      const newReply = {
        id: `reply-${Date.now()}`,
        author: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar || '/assets/images/avatar.svg',
        },
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    // In a real app, this would be an API call
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          updatedAt: new Date().toISOString(),
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId: string) => {
    // In a real app, this would be an API call
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleLikeComment = (commentId: string) => {
    // In a real app, this would be an API call
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.isLiked || false;
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !isLiked,
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6">Post not found</Typography>
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
          <Typography color="text.primary">Post</Typography>
        </Breadcrumbs>
      </Box>

      {/* Post card */}
      <PostCard post={post} />

      {/* Comments section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          mt: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Comments ({comments.length})
        </Typography>

        {/* Comment input */}
        <Box sx={{ display: 'flex', mb: 3 }}>
          <Avatar
            src={user?.avatar || '/assets/images/avatar.svg'}
            alt={user?.name || 'User'}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <TextField
            fullWidth
            placeholder="Write a comment..."
            variant="outlined"
            size="small"
            value={commentText}
            onChange={handleCommentChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Comments list */}
        {comments.length > 0 ? (
          <Box>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReplyToComment}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                onLike={handleLikeComment}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Paper>
    </Box>
  );
}