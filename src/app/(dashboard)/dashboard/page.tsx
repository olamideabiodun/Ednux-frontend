'use client';

import React, { useEffect } from 'react';
import { Box, Grid, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import TodayClasses from '@/components/dashboard/TodayClasses';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Main content column */}
        <Grid item xs={12} lg={9}>
          <Grid container spacing={3}>
            {/* Welcome Banner */}
            <Grid item xs={12}>
              <WelcomeBanner name={user?.name || 'User'} />
            </Grid>

            {/* Today's Classes */}
            <Grid item xs={12} md={6}>
              <TodayClasses />
            </Grid>

            {/* Progress Overview */}
            <Grid item xs={12} md={6}>
              <ProgressOverview progress={76} />
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <RecentActivity />
            </Grid>

            {/* Quick Actions on mobile */}
            {isMobile && (
              <Grid item xs={12}>
                <QuickActions />
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Right sidebar column */}
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'block', lg: 'block' } }}>
          <Grid container spacing={3}>
            {/* Upcoming Deadlines */}
            <Grid item xs={12}>
              <UpcomingDeadlines />
            </Grid>

            {/* Quick Actions on desktop */}
            {!isMobile && (
              <Grid item xs={12}>
                <QuickActions />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}