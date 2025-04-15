// src/app/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { 
  ChatBubbleOutlineRounded, 
  GroupsOutlined, 
  TrackChangesOutlined, 
  ArticleOutlined, 
  SchoolOutlined,
  FolderOutlined,
  ArrowForward
} from '@mui/icons-material';

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#ffffff' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            href="/register"
            variant="outlined"
            sx={{
              borderRadius: 28,
              px: 3,
              py: 1,
              textTransform: 'none',
              bgcolor: '#f8f9fa',
              color: '#4361ee',
              border: '1px solid #e6e6e6',
              '&:hover': {
                bgcolor: '#f0f0f0',
                borderColor: '#e0e0e0',
              },
            }}
          >
            Sign up
          </Button>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            sx={{
              borderRadius: 28,
              px: 3,
              py: 1,
              textTransform: 'none',
              bgcolor: '#4361ee',
              '&:hover': {
                bgcolor: '#3652d3',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: { xs: 3, sm: 4, md: 6 }, 
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box
          sx={{
            background: '#ffffff',
            borderRadius: 4, 
            p: { xs: 3, sm: 4, md: 6 },
            mb: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.2rem', md: '2.5rem' },
              color: '#000000',
              mb: 2,
            }}
          >
            Your Social Workspace
            <br />
            for Students & Professionals
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              color: '#555555',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Collaborate, learn, and share files in one space. Connect with professionals, join study groups, and manage your projects efficiently.
          </Typography>
          
          {/* Decorative elements - only visible on larger screens */}
          <Box 
            sx={{
              position: 'absolute',
              top: '15%',
              left: '4%',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              bgcolor: '#4361ee',
              opacity: 0.3,
              display: { xs: 'none', md: 'block' }
            }}
          />
          <Box 
            sx={{
              position: 'absolute',
              top: '25%',
              right: '7%',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              bgcolor: '#a56ef4',
              opacity: 0.3,
              display: { xs: 'none', md: 'block' }
            }}
          />
          
          {/* Blue gradient shape on left */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '-5%',
              width: '140px',
              height: '140px',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: 'linear-gradient(135deg, #4361ee 0%, #3652d3 100%)',
              opacity: 0.1,
              zIndex: -1,
              display: { xs: 'none', md: 'block' }
            }}
          />
          
          {/* Chat notification */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-20px',
              left: '40px',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '10px',
              px: 2,
              py: 1,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              zIndex: 2,
            }}
          >
            <Typography variant="body2">Looking for new ideas...</Typography>
          </Box>

          <Button
            component={Link}
            href="/register"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 8,
              fontSize: { xs: '0.9rem', md: '1.125rem' },
              textTransform: 'none',
              background: 'linear-gradient(90deg, #4361ee 0%, #a56ef4 100%)',
              boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
              '&:hover': {
                boxShadow: '0 15px 20px -3px rgba(79, 70, 229, 0.4)',
              },
              position: 'relative',
              zIndex: 2,
              width: { xs: '100%', sm: 'auto' },
            }}
            endIcon={<ArrowForward />}
          >
            Get Started. It's FREE
          </Button>
        </Box>

        {/* Feature Cards Grid */}
        <Grid container spacing={2}>
          {/* Chat Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/chat-illustration.png" 
                  alt="Chat with friends" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#4dabf5',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                Chat With friends
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Connect with friends and share ideas
              </Typography>
            </Paper>
          </Grid>

          {/* Collaborate Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/collaborate-illustration.png" 
                  alt="Collaborate" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#4361ee',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                Collaborate
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Collaborate with teams and connect with professionals
              </Typography>
            </Paper>
          </Grid>

          {/* Progress Tracking Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/progress-tracking-illustration.png" 
                  alt="Progress Tracking" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#42b3a2',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                Progress Tracking
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Track your progress and manage your projects efficiently
              </Typography>
            </Paper>
          </Grid>

          {/* Posts and News Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/posts-news-illustration.png" 
                  alt="Posts and News" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#8844d5',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                Posts and news
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Get updates, resources and engage with community
              </Typography>
            </Paper>
          </Grid>

          {/* Learning Management Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/learning-management-illustration.png" 
                  alt="Enhanced Learning Management" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#a56ef4',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1,
                  lineHeight: 1.2
                }}
              >
                Enhanced Learning Management System
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Advanced learning management tools to improve creativity
              </Typography>
            </Paper>
          </Grid>

          {/* File Management Feature */}
          <Grid item xs={6} sm={6} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src="/assets/images/file-management-illustration.png" 
                  alt="File Management" 
                  style={{ 
                    maxWidth: '80%', 
                    height: 'auto',
                  }} 
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ 
                  color: '#4dabf5',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  mb: 1 
                }}
              >
                File Management
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Share, preview and manage your files in a single platform
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Productivity Section with Glass Morphism */}
      <Box sx={{ 
        py: { xs: 4, sm: 6, md: 8 }, 
        px: { xs: 2, sm: 3, md: 4 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #e6f0ff 100%)'
      }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{
                fontWeight: 600,
                color: '#1a365d',
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              Elevate your productivity with our features tailored to your needs.
            </Typography>
            
            <Grid container spacing={2}>
              {[
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
                }
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      p: { xs: 2, sm: 3 },
                      height: '100%',
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.8)',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
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
                        mb: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.number}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: '#1a365d',
                        mb: 1,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#4a5568',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Goal Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 3, sm: 4 } }}>
        <Box textAlign="left">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: '#4361ee',
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Our goal
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontWeight: 600,
              color: '#1a365d',
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
            }}
          >
            is to improve collaboration and productivity.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#4a5568',
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            We provide specialized tools that enhance project management and educational experience.
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{
              fontWeight: 600,
              color: '#1a365d',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Trusted by students and professionals
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: { xs: 2, sm: 3 }, 
            mb: 4 
          }}>
            <Typography variant="body2" color="text.secondary">Mobile</Typography>
            <Typography variant="body2" color="text.secondary">companyX</Typography>
            <Typography variant="body2" color="text.secondary">Health+</Typography>
            <Typography variant="body2" color="text.secondary">SnaPost</Typography>
            <Typography variant="body2" color="text.secondary">AidePro</Typography>
            <Typography variant="body2" color="text.secondary">Caps</Typography>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 4, sm: 6 }, borderTop: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: '#1a365d',
                  mb: 2,
                }}
              >
                Ed<span style={{ color: '#4361ee' }}>nux</span>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box component="a" href="#" sx={{ color: '#4a5568' }}>
                  <img src="/assets/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                </Box>
                <Box component="a" href="#" sx={{ color: '#4a5568' }}>
                  <img src="/assets/icons/twitter.svg" alt="Twitter" width={24} height={24} />
                </Box>
                <Box component="a" href="#" sx={{ color: '#4a5568' }}>
                  <img src="/assets/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                © Ednux 2025. We love our users!
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight={600} fontSize={{ xs: '1rem', md: '1.25rem' }}>
                Product
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    Features
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    Support
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    About
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight={600} fontSize={{ xs: '1rem', md: '1.25rem' }}>
                Community
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    News and Updates
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    Resources
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography component="a" href="#" variant="body2" sx={{ color: '#4a5568', textDecoration: 'none' }}>
                    Trends and media
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" component="h3" gutterBottom fontWeight={600} fontSize={{ xs: '1rem', md: '1.25rem' }}>
                Download the App
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box component="a" href="#" sx={{ width: 'fit-content' }}>
                  <img src="/assets/images/app-store-badge.png" alt="App Store" width={140} />
                </Box>
                <Box component="a" href="#" sx={{ width: 'fit-content' }}>
                  <img src="/assets/images/google-play-badge.png" alt="Google Play" width={140} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}