'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  LinearProgress, 
  Chip, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip
} from '@mui/material';
import { 
  Lightbulb as LightbulbIcon,
  TipsAndUpdates as TipsIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { mockGLERecommendations } from '@/lib/mockSocialData';

const PersonalGLE: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LightbulbIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight={600}>
            Your GLE Dashboard
          </Typography>
        </Box>
        <IconButton size="small">
          <SearchIcon />
        </IconButton>
      </Box>
      
      {/* GLE Progress */}
      <Card 
        elevation={0} 
        sx={{ 
          mb: 2, 
          borderRadius: 3,
          bgcolor: 'rgba(67, 97, 238, 0.05)',
          border: '1px solid',
          borderColor: 'primary.light',
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">
              Weekly Learning Progress
            </Typography>
            <Chip 
              label="4/5" 
              size="small" 
              color="primary" 
              sx={{ 
                height: 20, 
                '& .MuiChip-label': { px: 1, fontSize: '0.65rem' } 
              }} 
            />
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={80} 
            sx={{ 
              my: 1.5, 
              height: 6, 
              borderRadius: 3,
              bgcolor: 'rgba(0, 0, 0, 0.08)',
            }} 
          />
          
          <Typography variant="caption" color="text.secondary">
            You're on track to reach your weekly goal! Just one more GLE to complete.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Recommended GLEs */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Recommended for You
      </Typography>
      
      <List disablePadding>
        {mockGLERecommendations.map((gle) => (
          <ListItem
            key={gle.id}
            disablePadding
            sx={{ mb: 1 }}
          >
            <Link 
              href={`/gle/${gle.id}`}
              style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                  width: '100%',
                }}
              >
                {/* GLE Type Icon */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    mr: 1.5,
                    flexShrink: 0,
                  }}
                >
                  {gle.id.includes('tips') ? (
                    <TipsIcon fontSize="small" />
                  ) : gle.id.includes('concept') ? (
                    <PsychologyIcon fontSize="small" />
                  ) : (
                    <SchoolIcon fontSize="small" />
                  )}
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {gle.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                    <Chip 
                      label={gle.topic} 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        height: 20, 
                        '& .MuiChip-label': { px: 1, fontSize: '0.65rem' },
                        borderRadius: 1,
                      }} 
                    />
                    
                    <Chip 
                      label={`Complexity: ${gle.complexity}%`} 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        height: 20, 
                        '& .MuiChip-label': { px: 1, fontSize: '0.65rem' },
                        borderRadius: 1,
                      }} 
                    />
                  </Box>
                </Box>
                
                <Tooltip title="Relevance score">
                  <Chip 
                    label={`${gle.relevanceScore}%`} 
                    size="small"
                    color="primary"
                    sx={{ 
                      height: 20, 
                      '& .MuiChip-label': { px: 1, fontSize: '0.65rem' },
                      ml: 1,
                    }} 
                  />
                </Tooltip>
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
      
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AddIcon />}
        component={Link}
        href="/gle/create"
        sx={{ 
          mt: 1,
          borderRadius: 8,
          textTransform: 'none',
        }}
      >
        Create New GLE
      </Button>
    </Box>
  );
};

export default PersonalGLE;