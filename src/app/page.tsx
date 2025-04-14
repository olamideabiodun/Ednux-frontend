// src/app/page.tsx (Landing Page)
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import FeatureCard from '@/components/common/FeatureCard';
import { 
  ChatBubbleOutlineRounded, 
  GroupsOutlined, 
  TrackChangesOutlined, 
  ArticleOutlined, 
  SchoolOutlined,
  FolderOutlined
} from '@mui/icons-material';

export default function Home() {
  const features = [
    {
      title: 'Chat With friends',
      description: 'Connect with friends and share ideas',
      icon: <ChatBubbleOutlineRounded sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
    {
      title: 'Collaborate',
      description: 'Collaborate with teams and connect with professionals',
      icon: <GroupsOutlined sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
    {
      title: 'Progress Tracking',
      description: 'Track your progress and manage your projects efficiently',
      icon: <TrackChangesOutlined sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
    {
      title: 'Posts and news',
      description: 'Get updates, resources and engage with community',
      icon: <ArticleOutlined sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
    {
      title: 'Enhanced Learning Management System',
      description: 'Advanced learning management tools to improve creativity',
      icon: <SchoolOutlined sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
    {
      title: 'File Management',
      description: 'Share, preview and manage your files in a single platform',
      icon: <FolderOutlined sx={{ fontSize: 40, color: '#4361ee' }} />,
    },
  ];

  const workspaceTools = [
    {
      number: '1',
      title: 'Social Networking',
      description: 'Find the right collaborators and academic insights and resources from Miles in real time all on a single platform.',
    },
    {
      number: '2',
      title: 'Workspace Tools',
      description: 'Real-time collaboration, project management, version control and preview of complex files.',
    },
    {
      number: '3',
      title: 'Learning Management',
      description: 'Virtual classrooms, resource sharing, assignment management and study groups.',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 16 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: '#1a365d',
                  mb: 2,
                }}
              >
                Your Social Workspace for Students & Professionals
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: '#4a5568',
                  mb: 4,
                  maxWidth: '600px',
                }}
              >
                Collaborate, learn, and share files in one space. Connect with professionals, join study groups, and manage your projects efficiently.
              </Typography>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 8,
                  fontSize: '1.125rem',
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, #4361ee 0%, #a56ef4 100%)',
                  boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
                  '&:hover': {
                    boxShadow: '0 15px 20px -3px rgba(79, 70, 229, 0.4)',
                  },
                }}
              >
                Get Started. It's FREE →
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  width: '100%',
                }}
              >
                <Image
                  src="/assets/images/hero-illustration.png"
                  alt="Ednux platform illustration"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Productivity Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(180deg, #f8fafc 0%, #e6f0ff 100%)' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{
              fontWeight: 700,
              color: '#1a365d',
              mb: 2,
            }}
          >
            Elevate your productivity with our features tailored to your needs.
          </Typography>
          
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={4}>
              {workspaceTools.map((tool, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        mb: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      {tool.number}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: '#1a365d',
                        mb: 2,
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#4a5568',
                      }}
                    >
                      {tool.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Goal Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                color: '#4361ee',
                mb: 3,
              }}
            >
              Our goal
            </Typography>
            <Typography
              variant="h4"
              component="p"
              sx={{
                fontWeight: 600,
                color: '#1a365d',
                mb: 3,
              }}
            >
              is to improve collaboration and productivity.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#4a5568',
                mb: 4,
                fontSize: '1.125rem',
              }}
            >
              We provide specialized tools that enhance project management and educational experience.
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontWeight: 600,
                color: '#1a365d',
                mb: 4,
              }}
            >
              Trusted by students and professionals
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Typography variant="body2" color="text.secondary">Mobile</Typography>
              <Typography variant="body2" color="text.secondary">companyX</Typography>
              <Typography variant="body2" color="text.secondary">Health+</Typography>
              <Typography variant="body2" color="text.secondary">SnaPost</Typography>
              <Typography variant="body2" color="text.secondary">AidePro</Typography>
              <Typography variant="body2" color="text.secondary">Caps</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: '400px',
                width: '100%',
              }}
            >
              <Image
                src="/assets/images/collaboration-illustration.png"
                alt="Collaboration illustration"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#fff', py: 6, borderTop: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#1a365d',
                  }}
                >
                  Ed<span style={{ color: '#4361ee' }}>nux</span>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box 
                  component="a" 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener"
                  sx={{ 
                    color: '#4a5568',
                    '&:hover': { color: '#4361ee' },
                  }}
                >
                  <img src="/assets/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                </Box>
                <Box 
                  component="a" 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener"
                  sx={{ 
                    color: '#4a5568',
                    '&:hover': { color: '#4361ee' },
                  }}
                >
                  <img src="/assets/icons/twitter.svg" alt="Twitter" width={24} height={24} />
                </Box>
                <Box 
                  component="a" 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener"
                  sx={{ 
                    color: '#4a5568',
                    '&:hover': { color: '#4361ee' },
                  }}
                >
                  <img src="/assets/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                © Ednux 2025. We love our users!
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    Product
                  </Typography>
                  <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/features">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          Features
                        </Typography>
                      </Link>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/support">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          Support
                        </Typography>
                      </Link>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/about">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          About
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    Community
                  </Typography>
                  <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/news">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          News and Updates
                        </Typography>
                      </Link>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/resources">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          Resources
                        </Typography>
                      </Link>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Link href="/trends">
                        <Typography 
                          component="a" 
                          variant="body2" 
                          sx={{ 
                            color: '#4a5568',
                            textDecoration: 'none',
                            '&:hover': { color: '#4361ee' },
                          }}
                        >
                          Trends and media
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    Download the App
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box 
                      component="a" 
                      href="https://apps.apple.com" 
                      target="_blank" 
                      rel="noopener"
                    >
                      <img 
                        src="/assets/images/app-store-badge.png" 
                        alt="Download on the App Store" 
                        width={140} 
                        height={42} 
                      />
                    </Box>
                    <Box 
                      component="a" 
                      href="https://play.google.com" 
                      target="_blank" 
                      rel="noopener"
                    >
                      <img 
                        src="/assets/images/google-play-badge.png" 
                        alt="Get it on Google Play" 
                        width={140} 
                        height={42} 
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
