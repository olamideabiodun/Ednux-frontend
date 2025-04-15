'use client';

import React from 'react';
import { Box, Typography, Paper, CircularProgress, useTheme } from '@mui/material';

interface ProgressOverviewProps {
  progress: number; // 0-100
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ progress }) => {
  const theme = useTheme();

  // Create mock data for line chart
  const lineChartData = [0, 10, 15, 25, 30, 45, 60, 65, 72, 76];
  const maxY = 100;
  const width = 200;
  const height = 60;
  
  // Mock SVG line chart
  const createSVGLineChart = () => {
    const points = lineChartData.map((value, index) => {
      const x = (index / (lineChartData.length - 1)) * width;
      const y = height - (value / maxY) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Area under the line */}
        <path
          d={`M0,${height} ${lineChartData.map((value, index) => {
            const x = (index / (lineChartData.length - 1)) * width;
            const y = height - (value / maxY) * height;
            return `L${x},${y}`;
          }).join(' ')} L${width},${height} Z`}
          fill="url(#lineGradient)"
          opacity="0.5"
        />
        
        {/* The line itself */}
        <polyline
          points={points}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth="2"
        />
        
        {/* End point dot */}
        <circle
          cx={width}
          cy={height - (lineChartData[lineChartData.length - 1] / maxY) * height}
          r="4"
          fill={theme.palette.primary.main}
        />
      </svg>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Progress Overview
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
        <Box>
          <Typography 
            variant="h2" 
            component="div" 
            fontWeight={700} 
            sx={{ color: theme.palette.text.primary }}
          >
            {progress}%
          </Typography>
          
          <Box sx={{ mt: 1, width: 200 }}>
            {createSVGLineChart()}
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mr: 2
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={4}
            sx={{ color: theme.palette.grey[200], position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={120}
            thickness={4}
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography
            variant="h3"
            component="div"
            sx={{
              position: 'absolute',
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            {progress}%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProgressOverview;