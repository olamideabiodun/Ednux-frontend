'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip,
  Divider
} from '@mui/material';
import { 
  Assignment as AssignmentIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';

// Mock data for upcoming deadlines
const deadlinesMockData: any[] = [];

const UpcomingDeadlines: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 2,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Upcoming Deadlines
        </Typography>
      </Box>

      <List sx={{ py: 0 }}>
        {deadlinesMockData.length > 0 ? (
          deadlinesMockData.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem
                sx={{
                  py: 2,
                  px: 3,
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: item.type === 'assignment' ? '#e6f7ff' : '#fff0f6',
                      color: item.type === 'assignment' ? '#0098e5' : '#ff4d82',
                    }}
                  >
                    {item.type === 'assignment' ? <AssignmentIcon /> : <QuizIcon />}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Chip
                        label={item.course}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          mr: 1,
                        }}
                      />
                      <Typography variant="caption" color="error">
                        Due {item.dueDate}
                      </Typography>
                    </Box>
                  }
                  primaryTypographyProps={{
                    fontWeight: 600,
                    variant: 'body2',
                  }}
                />
              </ListItem>
              {index < deadlinesMockData.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Box 
            sx={{ 
              p: 4, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: 150
            }}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No upcoming deadlines
            </Typography>
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default UpcomingDeadlines;