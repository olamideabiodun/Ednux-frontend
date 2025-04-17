'use client';

import React, { useState, useRef } from 'react';
import { 
  Box, 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  IconButton, 
  Typography, 
  Menu, 
  MenuItem, 
  Divider, 
  Button,
  TextField,
  InputAdornment,
  Collapse,
  styled,
  Tooltip
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  MicNone as MicIcon,
  Send as SendIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  ExpandMore as ExpandMoreIcon,
  Lightbulb as LightbulbIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  Link as LinkIcon,
  Edit as EditIcon,
  AudioFile as AudioFileIcon
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import VoiceNotePlayer from '@/components/social/VoiceNotePlayer';
import GLEContent from '@/components/social/GLEContent';
import Comment from '@/components/social/Comment';
import { useAuth } from '@/hooks/useAuth';

interface PostCardProps {
  post: any;
}

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [comments, setComments] = useState<any[]>(post.comments || []);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const isCurrentUser = post.author.id === user?.id;
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
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
    // Share functionality would be implemented here
    console.log('Sharing post:', post.id);
  };
  
  const handleComment = () => {
    setCommentsExpanded(true);
    // In a real app, this would focus the comment input
  };
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    // In a real app, this would call an API to add the comment
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
  
  const handleVoiceNotePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 3,
        overflow: 'visible',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        mb: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            src={post.author.avatar} 
            alt={post.author.name}
            component={Link}
            href={`/profile/${post.author.id}`}
            sx={{ 
              width: 48, 
              height: 48,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        }
        action={
          <IconButton aria-label="post menu" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link 
            href={`/profile/${post.author.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="body1" component="span" fontWeight={600}>
              {post.author.name}
            </Typography>
            {post.author.isVerified && (
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  ml: 0.5,
                  color: 'primary.main',
                  fontSize: '1.2rem',
                }}
              >
                ✓
              </Box>
            )}
          </Link>
        }
        subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      />
      
      <CardContent sx={{ pt: 0 }}>
        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
        
        {/* Media Attachments */}
        {post.media && post.media.length > 0 && (
          <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            {post.media.map((media: any, index: number) => (
              <Box 
                key={index} 
                sx={{ 
                  position: 'relative',
                  height: media.type === 'image' ? 'auto' : '360px',
                  maxHeight: '500px',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                {media.type === 'image' ? (
                  <img 
                    src={media.url}
                    alt={`Post media ${index + 1}`}
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                      maxHeight: '500px',
                      display: 'block',
                    }}
                  />
                ) : media.type === 'video' && (
                  <video
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  >
                    <source src={media.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </Box>
            ))}
          </Box>
        )}
        
        {/* Voice Note */}
        {post.voiceNote && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.03)',
            }}
          >
            <VoiceNotePlayer voiceNote={post.voiceNote} />
          </Box>
        )}
        
        {/* GLE Content */}
        {post.gleContent && (
          <Box sx={{ mb: 2 }}>
            <GLEContent content={post.gleContent} />
          </Box>
        )}
        
        {/* Engagement Metrics */}
        {(likesCount > 0 || post.shares > 0 || comments.length > 0) && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              color: 'text.secondary',
              fontSize: '0.875rem',
              mt: 2,
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {likesCount > 0 && (
                <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
              )}
            </Typography>
            
            <Box>
              {comments.length > 0 && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  component="span" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    mr: 2,
                  }}
                  onClick={() => setCommentsExpanded(!commentsExpanded)}
                >
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </Typography>
              )}
              
              {post.shares > 0 && (
                <Typography variant="body2" color="text.secondary" component="span">
                  {post.shares} {post.shares === 1 ? 'share' : 'shares'}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </CardContent>
      
      <Divider />
      
      <CardActions disableSpacing>
        <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
          <IconButton 
            onClick={handleLike}
            color={isLiked ? 'primary' : 'default'}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Comment">
          <IconButton onClick={handleComment}>
            <CommentIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Share">
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
          <IconButton 
            onClick={handleBookmark}
            color={isBookmarked ? 'primary' : 'default'}
            sx={{ ml: 'auto' }}
          >
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="View comments">
          <ExpandMore
            expand={commentsExpanded}
            onClick={() => setCommentsExpanded(!commentsExpanded)}
            aria-expanded={commentsExpanded}
            aria-label="show comments"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Tooltip>
      </CardActions>
      
      {/* Comments Section */}
      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ p: 2 }}>
          {/* Comment Input */}
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Avatar 
              src={user?.avatar || '/assets/images/avatar.svg'} 
              alt={user?.name || 'User'} 
              sx={{ width: 40, height: 40, mr: 1.5 }}
            />
            <TextField
              fullWidth
              placeholder="Write a comment..."
              variant="outlined"
              size="small"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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
                }
              }}
            />
          </Box>
          
          {/* Comments List */}
          {comments.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {comments.map((comment: any) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </Box>
      </Collapse>
      
      {/* Post Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <LinkIcon fontSize="small" sx={{ mr: 1 }} />
          Copy link
        </MenuItem>
        
        {isCurrentUser && (
          <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit post
          </MenuItem>
        )}
        
        {isCurrentUser && (
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete post
          </MenuItem>
        )}
        
        {!isCurrentUser && (
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <ReportIcon fontSize="small" sx={{ mr: 1 }} />
            Report post
          </MenuItem>
        )}
      </Menu>
    </Card>
  );
};

export default PostCard;