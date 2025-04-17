'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Slider,
  Tooltip
} from '@mui/material';
import { 
  Lightbulb as LightbulbIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  SchoolOutlined as SchoolIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
  EmojiObjects as InsightsIcon,
  TipsAndUpdates as TipsIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

// GLE = Guided Learning Experience
// GLEContent Component
const GLEContent: React.FC<{ content: any }> = ({ content }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'primary.light',
        bgcolor: 'rgba(67, 97, 238, 0.05)',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LightbulbIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="subtitle2">
            {content.type === 'insight' ? 'Learning Insight' : 
             content.type === 'tips' ? 'Practical Tips' : 
             'Conceptual Understanding'}
          </Typography>
        </Box>
        
        <Box>
          <Tooltip title="Save">
            <IconButton size="small">
              <BookmarkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
        {content.title}
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
        {content.content}
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        <Chip
          icon={<SchoolIcon />}
          label="Educational Content"
          size="small"
          variant="outlined"
          sx={{ borderRadius: 1 }}
        />
        {content.relatedTopics && content.relatedTopics.length > 0 && 
          content.relatedTopics.slice(0, 1).map((topic: string, index: number) => (
            <Chip
              key={index}
              label={topic}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
          ))}
      </Box>
    </Paper>
  );
};

export default GLEContent;