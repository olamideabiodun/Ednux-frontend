'use client';

import React, { useState } from 'react';
import { Box, Typography, InputBase, Tabs, Tab, Grid, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import CourseCard from '@/components/courses/CourseCard';
import CategoryFilters from '@/components/courses/CategoryFilters';
import { mockCourses } from '@/lib/mockData';

export default function CoursesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on selected category and search query
  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Courses
        </Typography>
        
        {!isMobile && (
          <IconButton sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 2 }}>
            <SearchIcon />
          </IconButton>
        )}
      </Box>

      {/* My Courses Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          p: 3,
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          My courses
        </Typography>
        
        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.04)',
            borderRadius: 20,
            p: 1,
            px: 2,
            mb: 3,
          }}
        >
          <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <InputBase
            placeholder="Search courses"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Category Filters */}
        <CategoryFilters 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
        />

        {/* Course List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, textTransform: 'uppercase' }}>
            {selectedCategory === 'all' ? 'All Courses' : selectedCategory}
          </Typography>
          
          <Grid container spacing={2}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
            
            {filteredCourses.length === 0 && (
              <Box sx={{ p: 3, width: '100%', textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No courses found. Try adjusting your filters.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}