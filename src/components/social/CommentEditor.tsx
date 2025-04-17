'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  Avatar, 
  Popover, 
  Grid,
  Tooltip,
  Paper,
  Divider,
  Typography
} from '@mui/material';
import { 
  Send as SendIcon, 
  InsertEmoticon as EmojiIcon,
  AttachFile as AttachIcon,
  CameraAlt as ImageIcon,
  Gif as GifIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
  FormatListBulleted as ListIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

interface CommentEditorProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit: (content: string, attachments?: File[]) => void;
  autoFocus?: boolean;
  initialValue?: string;
  replyingTo?: string;
  onCancelReply?: () => void;
  showFormatting?: boolean;
}

// Mock emoji data
const mockEmojis = [
  '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', 
  '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔',
  '👍', '👎', '👌', '👏', '🙌', '👋', '👇', '👆', '👉', '👈',
  '❤️', '💔', '💖', '💙', '💚', '💛', '💜', '💯', '✅', '❌',
];

const CommentEditor: React.FC<CommentEditorProps> = ({
  placeholder = 'Write a comment...',
  buttonText = 'Post',
  onSubmit,
  autoFocus = false,
  initialValue = '',
  replyingTo,
  onCancelReply,
  showFormatting = false
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState(initialValue);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLElement | null>(null);
  const [isFocused, setIsFocused] = useState(autoFocus);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    // Update content if initialValue changes (e.g., when editing a comment)
    setContent(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() || attachments.length > 0) {
      onSubmit(content, attachments.length > 0 ? attachments : undefined);
      setContent('');
      setAttachments([]);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setContent(prevContent => prevContent + emoji);
    setEmojiAnchorEl(null);
    
    // Focus back on the text field after selecting an emoji
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleFormatText = (format: 'bold' | 'italic' | 'underline' | 'link' | 'list') => {
    if (!textFieldRef.current) return;

    const start = textFieldRef.current.selectionStart;
    const end = textFieldRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = content;
    let newCursorPosition = end;

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        newCursorPosition = end + 4; // 4 is the length of the added characters: **...**
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        newCursorPosition = end + 2; // 2 is the length of the added characters: *...*
        break;
      case 'underline':
        newText = content.substring(0, start) + `__${selectedText}__` + content.substring(end);
        newCursorPosition = end + 4; // 4 is the length of the added characters: __...__
        break;
      case 'link':
        newText = content.substring(0, start) + `[${selectedText}](url)` + content.substring(end);
        newCursorPosition = end + 7; // 7 is the length of the added characters: [...]()
        break;
      case 'list':
        newText = content.substring(0, start) + `\n- ${selectedText}` + content.substring(end);
        newCursorPosition = end + 3; // 3 is the length of the added characters: \n- 
        break;
    }

    setContent(newText);
    
    // Reset cursor position after state update
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
        textFieldRef.current.selectionStart = newCursorPosition;
        textFieldRef.current.selectionEnd = newCursorPosition;
      }
    }, 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {replyingTo && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            py: 1,
            px: 2,
            bgcolor: 'rgba(0, 0, 0, 0.03)',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Replying to <Box component="span" fontWeight={600}>{replyingTo}</Box>
          </Typography>
          {onCancelReply && (
            <Button 
              size="small" 
              onClick={onCancelReply}
              sx={{ 
                minWidth: 'auto', 
                px: 1,
                fontSize: '0.75rem',
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', p: 1 }}>
        <Avatar 
          src={user?.avatar || '/assets/images/avatar.svg'} 
          alt={user?.name || 'User'} 
          sx={{ width: 40, height: 40, mr: 1.5 }}
        />
        
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            placeholder={placeholder}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputRef={textFieldRef}
            minRows={1}
            maxRows={6}
            InputProps={{
              sx: {
                borderRadius: 4,
                bgcolor: 'background.paper',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isFocused ? 'primary.main' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          />
          
          {/* Attachments preview */}
          {attachments.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {attachments.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {file.type.includes('image') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Attachment ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                        p: 1,
                      }}
                    >
                      <AttachIcon />
                      <Typography variant="caption" noWrap sx={{ maxWidth: '100%' }}>
                        {file.name}
                      </Typography>
                    </Box>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveAttachment(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      p: 0.5,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    &times;
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
          
          {/* Comment actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Formatting options */}
              {showFormatting && (
                <Box sx={{ mr: 1, display: 'flex' }}>
                  <Tooltip title="Bold">
                    <IconButton 
                      size="small" 
                      onClick={() => handleFormatText('bold')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <BoldIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Italic">
                    <IconButton 
                      size="small" 
                      onClick={() => handleFormatText('italic')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <ItalicIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Underline">
                    <IconButton 
                      size="small" 
                      onClick={() => handleFormatText('underline')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <UnderlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Link">
                    <IconButton 
                      size="small" 
                      onClick={() => handleFormatText('link')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <LinkIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List">
                    <IconButton 
                      size="small" 
                      onClick={() => handleFormatText('list')}
                      sx={{ color: 'text.secondary' }}
                    >
                      <ListIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              
              {/* Media options */}
              <Tooltip title="Emoji">
                <IconButton 
                  size="small" 
                  onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
                  sx={{ color: 'text.secondary' }}
                >
                  <EmojiIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Attach file">
                <IconButton 
                  size="small" 
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ color: 'text.secondary' }}
                >
                  <AttachIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              />
              
              <Tooltip title="Upload image">
                <IconButton 
                  size="small" 
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ color: 'text.secondary' }}
                >
                  <ImageIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Add GIF">
                <IconButton 
                  size="small" 
                  sx={{ color: 'text.secondary' }}
                >
                  <GifIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!content.trim() && attachments.length === 0}
              sx={{ 
                borderRadius: 20,
                textTransform: 'none',
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Emoji picker popover */}
      <Popover
        open={Boolean(emojiAnchorEl)}
        anchorEl={emojiAnchorEl}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Emojis
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={1}>
            {mockEmojis.map((emoji, index) => (
              <Grid item key={index}>
                <Button
                  variant="text"
                  onClick={() => handleEmojiClick(emoji)}
                  sx={{ minWidth: 'auto', p: 0.5 }}
                >
                  <Typography fontSize="1.2rem">{emoji}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popover>
    </Box>
  );
};

export default CommentEditor;