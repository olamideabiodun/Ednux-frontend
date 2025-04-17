'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Menu, 
  MenuItem, 
  Paper, 
  InputBase, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  ListItemIcon,
  Avatar, 
  IconButton,
  Chip,
  Tab,
  Tabs,
  CircularProgress
} from '@mui/material';
import { 
  Search as SearchIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  EventNote as EventIcon,
  LibraryBooks as LibraryIcon,
  History as HistoryIcon,
  Folder as FolderIcon,
  ChevronRight as ChevronRightIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/lib/mockSocialData';
import { mockCourses } from '@/lib/mockData';

interface SearchPanelProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

// Mock search history data
const mockSearchHistory = [
  "machine learning tutorials",
  "calculus practice problems",
  "collaborative learning methods",
  "quantum computing fundamentals"
];

// Mock trending searches
const mockTrendingSearches = [
  "AI ethics",
  "python programming",
  "data visualization",
  "study techniques"
];

const SearchPanel: React.FC<SearchPanelProps> = ({
  anchorEl,
  open,
  onClose
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    users: typeof mockUsers,
    courses: typeof mockCourses,
    posts: any[],
    files: any[]
  }>({
    users: [],
    courses: [],
    posts: [],
    files: []
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults({
      users: [],
      courses: [],
      posts: [],
      files: []
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);

    // Simulate search API call
    setTimeout(() => {
      // Filter mock data based on search query
      const filteredUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredCourses = mockCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Since we don't have complete mock data for posts and files,
      // we'll just simulate empty results for now
      setSearchResults({
        users: filteredUsers,
        courses: filteredCourses,
        posts: [],
        files: []
      });

      setSearching(false);
    }, 800);
  };

  const handleViewAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  // Reset search state when panel is closed
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSearchResults({
        users: [],
        courses: [],
        posts: [],
        files: []
      });
      setTabValue(0);
    }
  }, [open]);

  const hasResults = searchResults.users.length > 0 || 
                    searchResults.courses.length > 0 || 
                    searchResults.posts.length > 0 || 
                    searchResults.files.length > 0;

  const hasSearchQuery = searchQuery.trim() !== '';

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
          mt: 1.5,
          minWidth: 400,
          maxWidth: 500,
          maxHeight: '80vh',
          borderRadius: 2,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
          },
        },
      }}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Box component="form" onSubmit={handleSearch} sx={{ p: 1.5 }}>
        <Paper
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%',
            borderRadius: 4,
            bgcolor: 'rgba(0, 0, 0, 0.04)',
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search people, courses, files..."
            inputProps={{ 'aria-label': 'search ednux' }}
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
            endAdornment={
              searchQuery && (
                <IconButton 
                  sx={{ p: '5px' }} 
                  onClick={handleClearSearch}
                  aria-label="clear search"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )
            }
          />
        </Paper>
      </Box>

      {searching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} />
        </Box>
      ) : hasSearchQuery ? (
        // Search Results
        hasResults ? (
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="All" icon={<SearchIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="People" icon={<PersonIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Courses" icon={<SchoolIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
            </Tabs>
            
            <Box sx={{ maxHeight: 400, overflow: 'auto', py: 1 }}>
              <TabPanel value={tabValue} index={0}>
                {/* Users section */}
                {searchResults.users.length > 0 && (
                  <>
                    <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        People
                      </Typography>
                      {searchResults.users.length > 2 && (
                        <Typography 
                          variant="caption" 
                          color="primary"
                          component={Link}
                          href={`/search?q=${encodeURIComponent(searchQuery)}&type=people`}
                          onClick={onClose}
                          sx={{ 
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          View all
                        </Typography>
                      )}
                    </Box>
                    
                    <List sx={{ py: 0 }}>
                      {searchResults.users.slice(0, 2).map((user) => (
                        <ListItem
                          key={user.id}
                          component={Link}
                          href={`/profile/${user.id}`}
                          onClick={onClose}
                          sx={{ 
                            py: 1,
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                            textDecoration: 'none',
                            color: 'inherit'
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={user.avatar} alt={user.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.name}
                            secondary={user.email}
                            primaryTypographyProps={{ fontWeight: 500 }}
                          />
                          {user.isVerified && (
                            <Chip 
                              label="Verified" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ 
                                height: 24, 
                                mr: 1,
                                '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } 
                              }}
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {/* People tab */}
                {searchResults.users.length > 0 ? (
                  <List sx={{ py: 0 }}>
                    {searchResults.users.map((user) => (
                      <ListItem
                        key={user.id}
                        component={Link}
                        href={`/profile/${user.id}`}
                        onClick={onClose}
                        sx={{ 
                          py: 1,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={user.avatar} alt={user.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={user.email}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        {user.isVerified && (
                          <Chip 
                            label="Verified" 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ 
                              height: 24, 
                              mr: 1,
                              '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } 
                            }}
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">No people found matching "{searchQuery}"</Typography>
                  </Box>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                {/* Courses tab */}
                {searchResults.courses.length > 0 ? (
                  <List sx={{ py: 0 }}>
                    {searchResults.courses.map((course) => (
                      <ListItem
                        key={course.id}
                        component={Link}
                        href={`/courses/${course.id}`}
                        onClick={onClose}
                        sx={{ 
                          py: 1,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ 
                              bgcolor: course.bgColor || 'primary.main',
                              color: 'white'
                            }}
                          >
                            {course.title.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={course.title}
                          secondary={
                            <>
                              {course.instructor ? `Instructor: ${course.instructor}` : course.category}
                              <br />
                              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="caption" component="span">
                                  Progress: {course.progress}%
                                </Typography>
                              </Box>
                            </>
                          }
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">No courses found matching "{searchQuery}"</Typography>
                  </Box>
                )}
              </TabPanel>
            </Box>
          </>
        ) : (
          <Box sx={{ py: 3, px: 2, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No results found for "{searchQuery}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try different keywords or check your spelling
            </Typography>
          </Box>
        )
      ) : (
        // Default view when no search query
        <>
          <Divider />
          
          {/* Recent searches */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HistoryIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Recent Searches
              </Typography>
            </Box>
            
            {mockSearchHistory.length > 0 ? (
              <List disablePadding>
                {mockSearchHistory.map((query, index) => (
                  <ListItem 
                    key={index}
                    button
                    dense
                    sx={{ 
                      py: 0.5, 
                      px: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                    onClick={() => {
                      setSearchQuery(query);
                      handleSearch(new Event('submit') as any);
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={query} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                No recent searches
              </Typography>
            )}
          </Box>
          
          <Divider />
          
          {/* Trending searches */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" fontWeight={600}>
                Trending Searches
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {mockTrendingSearches.map((query, index) => (
                <Chip
                  key={index}
                  label={query}
                  clickable
                  size="small"
                  onClick={() => {
                    setSearchQuery(query);
                    handleSearch(new Event('submit') as any);
                  }}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
        </>
        
      )}
    </Menu>
  );
};

export default SearchPanel;