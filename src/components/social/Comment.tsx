'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  TextField, 
  InputAdornment,
  Button,
  Tooltip
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Reply as ReplyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface CommentProps {
  comment: any;
  onReply?: (commentId: string, content: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike
}) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  
  const isCurrentUser = comment.author.id === user?.id;
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    
    if (onLike) {
      onLike(comment.id);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };
  
  const handleSaveEdit = () => {
    if (editedContent.trim() && onEdit) {
      onEdit(comment.id, editedContent);
    }
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };
  
  const handleReply = () => {
    setIsReplying(true);
  };
  
  const handleSaveReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent);
      setReplyContent('');
    }
    setIsReplying(false);
  };
  
  const handleCancelReply = () => {
    setReplyContent('');
    setIsReplying(false);
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment.id);
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {/* Author Avatar */}
        <Avatar
          src={comment.author.avatar}
          alt={comment.author.name}
          component={Link}
          href={`/profile/${comment.author.id}`}
          sx={{ 
            width: 32, 
            height: 32,
            mt: 0.5
          }}
        />
        
        <Box sx={{ flex: 1 }}>
          {/* Comment Content */}
          {isEditing ? (
            <Box sx={{ mb: 1 }}>
              <TextField
                fullWidth
                multiline
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                size="small"
                variant="outlined"
                autoFocus
                sx={{ mb: 1 }}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button 
                  size="small" 
                  onClick={handleCancelEdit}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
                <Button 
                  size="small" 
                  variant="contained" 
                  onClick={handleSaveEdit}
                  disabled={!editedContent.trim()}
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.03)',
                borderRadius: 3,
                px: 2,
                py: 1.5,
                position: 'relative',
              }}
            >
              {/* Comment Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link 
                  href={`/profile/${comment.author.id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {comment.author.name}
                    {comment.author.isVerified && (
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          ml: 0.5,
                          color: 'primary.main',
                          fontSize: '1rem',
                        }}
                      >
                        ✓
                      </Box>
                    )}
                  </Typography>
                </Link>
                
                <IconButton 
                  size="small" 
                  onClick={handleMenuOpen}
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    ml: 'auto',
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {/* Comment Text */}
              <Typography variant="body2" sx={{ mt: 0.5, wordBreak: 'break-word' }}>
                {comment.content}
              </Typography>
            </Box>
          )}
          
          {/* Comment Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </Typography>
            
            <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
              <IconButton 
                size="small" 
                onClick={handleLike}
                sx={{ 
                  p: 0.5,
                  color: isLiked ? 'primary.main' : 'inherit' 
                }}
              >
                {isLiked ? (
                  <FavoriteIcon fontSize="small" color="primary" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            
            {likesCount > 0 && (
              <Typography variant="caption" sx={{ ml: 0.5, mr: 2 }}>
                {likesCount}
              </Typography>
            )}
            
            <Tooltip title="Reply">
              <IconButton 
                size="small" 
                onClick={handleReply}
                sx={{ p: 0.5 }}
              >
                <ReplyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Reply Form */}
          {isReplying && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1, pl: 1 }}>
              <Avatar
                src={user?.avatar || '/assets/images/avatar.svg'}
                alt={user?.name || 'User'}
                sx={{ width: 28, height: 28 }}
              />
              <TextField
                fullWidth
                placeholder="Write a reply..."
                size="small"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                autoFocus
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 4 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={handleSaveReply}
                        disabled={!replyContent.trim()}
                      >
                        <SendIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button 
                size="small" 
                onClick={handleCancelReply}
                sx={{ 
                  minWidth: 'auto', 
                  px: 1,
                  fontSize: '0.75rem',
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
          
          {/* Nested Comments/Replies (if any) */}
          {comment.replies && comment.replies.length > 0 && (
            <Box sx={{ mt: 1, pl: 2 }}>
              {comment.replies.map((reply: any) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onLike={onLike}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      
      {/* Comment Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleReply}>
          <ReplyIcon fontSize="small" sx={{ mr: 1 }} />
          Reply
        </MenuItem>
        
        {isCurrentUser && (
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        
        {isCurrentUser && (
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Comment;