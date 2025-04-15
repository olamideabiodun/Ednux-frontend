'use client';

import React from 'react';
import { Box, Chip, useMediaQuery, useTheme } from '@mui/material';
import { 
  Code as CodeIcon,
  Brush as DesignIcon,
  Calculate as MathIcon,
  MusicNote as MusicIcon,
  Apps as AllIcon
} from '@mui/icons-material';

interface CategoryFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All', icon: <AllIcon /> },
  { id: 'coding', label: 'Coding', icon: <CodeIcon /> },
  { id: 'design', label: 'Design', icon: <DesignIcon /> },
  { id: 'math', label: 'Math', icon: <MathIcon /> },
  { id: 'music', label: 'Music', icon: <MusicIcon /> },
];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          icon={category.icon}
          label={category.label}
          onClick={() => setSelectedCategory(category.id)}
          sx={{
            bgcolor: selectedCategory === category.id ? 'primary.main' : 'rgba(0, 0, 0, 0.04)',
            color: selectedCategory === category.id ? 'white' : 'text.primary',
            borderRadius: 8,
            px: 1,
            '& .MuiChip-icon': {
              color: selectedCategory === category.id ? 'white' : 'primary.main',
            },
            '&:hover': {
              bgcolor: selectedCategory === category.id ? 'primary.dark' : 'rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default CategoryFilters;