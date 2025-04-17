'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Breadcrumbs, 
  Button, 
  IconButton,
  Alert
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GLECreator from '@/components/social/GLECreator';

export default function CreateGLEPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleGLEComplete = (gleContent: any) => {
    // In a real app, this would be an API call to save the GLE
    console.log('GLE Content Created:', gleContent);
    
    // Show success message
    setSuccess(true);
    
    // Redirect after a brief delay
    setTimeout(() => {
      router.push('/social-feed?tab=gle');
    }, 1500);
  };

  return (
    <Container maxWidth="md">
      {/* Header with breadcrumbs */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton
          component={Link}
          href="/social-feed"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/social-feed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography color="text.secondary">Social Feed</Typography>
          </Link>
          <Typography color="text.primary">Create GLE</Typography>
        </Breadcrumbs>
      </Box>

      {/* Page title */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <LightbulbIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight={700}>
          Create Guided Learning Experience
        </Typography>
      </Box>

      {/* Success message */}
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
        >
          GLE content created successfully! Redirecting to feed...
        </Alert>
      )}

      {/* Description */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          bgcolor: 'rgba(67, 97, 238, 0.05)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          What is a Guided Learning Experience (GLE)?
        </Typography>
        <Typography variant="body1" paragraph>
          GLEs are educational content pieces designed to help users learn and understand complex topics.
          They provide structured, focused information that can be easily consumed and shared with others.
        </Typography>
        <Typography variant="body1">
          Use GLEs to create insightful content, practical tips, or conceptual explanations on topics
          you're knowledgeable about. Share your expertise with the community!
        </Typography>
      </Paper>

      {/* GLE Creator */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <GLECreator onComplete={handleGLEComplete} onCancel={() => router.push('/social-feed')} />
      </Paper>
    </Container>
  );
}