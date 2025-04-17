'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Grid
} from '@mui/material';
import CourseCard from '@/components/courses/CourseCard';
import { mockCourses } from '@/lib/mockData';

interface CoursesSectionProps {
  userId?: string; // If undefined, shows current user's courses
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
      id={`courses-tabpanel-${index}`}
      aria-labelledby={`courses-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ userId }) => {
  const [tabValue, setTabValue] = useState(0);

  // Filter courses based on status
  const completedCourses = mockCourses.filter(course => course.status === 'completed');
  const inProgressCourses = mockCourses.filter(course => course.status === 'in_progress');
  const notStartedCourses = mockCourses.filter(course => course.status === 'not_started');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="courses tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="In Progress" />
          <Tab label="Completed" />
          <Tab label="Not Started" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {inProgressCourses.length > 0 ? (
            inProgressCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No courses in progress.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No completed courses.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={2}>
          {notStartedCourses.length > 0 ? (
            notStartedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="text.secondary" textAlign="center" py={2}>
                No courses in your wishlist.
              </Typography>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default CoursesSection;