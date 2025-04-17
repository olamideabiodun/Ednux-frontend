'use client';

import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  IconButton, 
  Avatar, 
  Divider, 
  Tabs, 
  Tab,
  Paper,
  Chip
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Image as ImageIcon, 
  Mic as MicIcon, 
  VideoLibrary as VideoIcon,
  Delete as DeleteIcon,
  Lightbulb as LightbulbIcon,
  InsertLink as LinkIcon,
  EmojiEmotions as EmojiIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/hooks/useAuth';
import VoiceNoteRecorder from './VoiceNoteRecorder';
import GLECreator from './GLECreator';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onCreatePost: (postData: any) => void;
}

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
      id={`post-tabpanel-${index}`}
      aria-labelledby={`post-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  onCreatePost
}) => {
  const { user } = useAuth();
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState<any[]>([]);
  const [voiceNote, setVoiceNote] = useState<any | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [gleContent, setGleContent] = useState<any | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [isGLEMode, setIsGLEMode] = useState(false);
  
  const textFieldRef = useRef<HTMLTextAreaElement | null>(null);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': []
    },
    onDrop: (acceptedFiles) => {
      const newMedia = acceptedFiles.map(file => ({
        file,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: URL.createObjectURL(file)
      }));
      
      setMedia([...media, ...newMedia]);
      setMediaPreview([...mediaPreview, ...newMedia.map(m => m.url)]);
    }
  });
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleRemoveMedia = (index: number) => {
    const newMedia = [...media];
    const newPreviews = [...mediaPreview];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newMedia.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setMedia(newMedia);
    setMediaPreview(newPreviews);
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
  };
  
  const handleRecordingComplete = (recording: any) => {
    setVoiceNote(recording);
    setIsRecording(false);
  };
  
  const handleCancelRecording = () => {
    setIsRecording(false);
  };
  
  const handleRemoveVoiceNote = () => {
    if (voiceNote?.url) {
      URL.revokeObjectURL(voiceNote.url);
    }
    setVoiceNote(null);
  };
  
  const handleToggleGLEMode = () => {
    setIsGLEMode(!isGLEMode);
  };
  
  const handleGLEComplete = (content: any) => {
    setGleContent(content);
    setIsGLEMode(false);
  };
  
  const handleRemoveGLE = () => {
    setGleContent(null);
  };
  
  const handleCreatePost = () => {
    if (!postText.trim() && media.length === 0 && !voiceNote && !gleContent) {
      // Don't allow empty posts
      return;
    }
    
    const postData = {
      text: postText.trim(),
      media: media.map(m => ({
        type: m.type,
        url: m.url
      })),
      voiceNote,
      gleContent
    };
    
    onCreatePost(postData);
    
    // Reset form
    setPostText('');
    setMedia([]);
    setMediaPreview([]);
    setVoiceNote(null);
    setGleContent(null);
    setTabValue(0);
  };
  
  const handleClose = () => {
    // Clean up media URLs
    mediaPreview.forEach(url => URL.revokeObjectURL(url));
    if (voiceNote?.url) {
      URL.revokeObjectURL(voiceNote.url);
    }
    
    // Reset form
    setPostText('');
    setMedia([]);
    setMediaPreview([]);
    setVoiceNote(null);
    setGleContent(null);
    setTabValue(0);
    setIsGLEMode(false);
    
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'visible',
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6">Create Post</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Avatar 
            src={user?.avatar || '/assets/images/avatar.svg'} 
            alt={user?.name || 'User'} 
            sx={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {user?.name || 'User'}
            </Typography>
            <Chip 
              label="Public" 
              size="small" 
              sx={{ 
                height: 24, 
                fontSize: '0.75rem', 
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiChip-label': { px: 1 },
              }} 
            />
          </Box>
        </Box>
        
        {/* Main content area */}
        <Box>
          {isGLEMode ? (
            <GLECreator onComplete={handleGLEComplete} onCancel={() => setIsGLEMode(false)} />
          ) : (
            <>
              <TextField
                placeholder="What's on your mind?"
                multiline
                fullWidth
                minRows={3}
                maxRows={10}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                variant="outlined"
                inputRef={textFieldRef}
                InputProps={{
                  sx: {
                    borderRadius: 3,
                    p: 2,
                  }
                }}
                sx={{ mb: 2 }}
              />
              
              {/* Post attachments */}
              {media.length > 0 && (
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Media ({media.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {media.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={`Media ${index}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <video
                            src={item.url}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveMedia(index)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.7)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              
              {/* Voice note recorder/player */}
              {isRecording ? (
                <Box sx={{ my: 2 }}>
                  <VoiceNoteRecorder
                    onRecordingComplete={handleRecordingComplete}
                    onCancel={handleCancelRecording}
                  />
                </Box>
              ) : voiceNote && (
                <Box sx={{ my: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                      position: 'relative',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={handleRemoveVoiceNote}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MicIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle2">Voice Note</Typography>
                    </Box>
                    
                    <audio
                      src={voiceNote.url}
                      controls
                      style={{ width: '100%', marginTop: 8 }}
                    />
                  </Paper>
                </Box>
              )}
              
              {/* GLE content */}
              {gleContent && (
                <Box sx={{ my: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(67, 97, 238, 0.05)',
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'primary.light',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={handleRemoveGLE}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LightbulbIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle2">GLE Content</Typography>
                    </Box>
                    
                    <Typography variant="body2">
                      {gleContent.title || 'GLE Content'}
                    </Typography>
                  </Paper>
                </Box>
              )}
                
              {/* Attachment options */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 2 }}
              >
                <Tab label="Media" icon={<ImageIcon />} />
                <Tab label="Voice" icon={<MicIcon />} />
                <Tab label="GLE" icon={<LightbulbIcon />} />
              </Tabs>
              
              <TabPanel value={tabValue} index={0}>
                <Paper
                  {...getRootProps()}
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: 'divider',
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <ImageIcon color="primary" />
                      <VideoIcon color="error" />
                    </Box>
                    <Typography variant="body1" fontWeight={500}>
                      Click to upload or drag and drop
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload photos and videos to your post
                    </Typography>
                  </Box>
                </Paper>
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={handleStartRecording}
                    sx={{
                      borderRadius: 8,
                      textTransform: 'none',
                      px: 3,
                    }}
                  >
                    Record Voice Note
                  </Button>
                </Box>
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<LightbulbIcon />}
                    onClick={handleToggleGLEMode}
                    sx={{
                      borderRadius: 8,
                      textTransform: 'none',
                      px: 3,
                    }}
                  >
                    Create GLE Content
                  </Button>
                </Box>
              </TabPanel>
            </>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          onClick={handleClose}
          sx={{ borderRadius: 8, textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreatePost}
          disabled={
            (!postText.trim() && media.length === 0 && !voiceNote && !gleContent) ||
            isGLEMode
          }
          sx={{ 
            borderRadius: 8, 
            textTransform: 'none',
            px: 3,
          }}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;