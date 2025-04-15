'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f9fc' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            pt: 2,
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}