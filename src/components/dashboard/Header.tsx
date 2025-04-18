'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Avatar, 
  Badge, 
  Box, 
  IconButton, 
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  ChatBubble as ChatIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationsPanel from '@/components/social/NotificationsPanel';
import SearchPanel from '@/components/social/SearchPanel';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  backgroundColor: '#EDF2F7',
  borderRadius: 20,
  fontSize: '0.9rem',
  color: '#4A5568',
}));

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleSearchOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    router.push('/login');
  };

  const handleSettings = () => {
    handleMenuClose();
    router.push('/settings');
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push('/profile');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        boxShadow: 'none', 
        backgroundColor: 'transparent',
        color: '#4A5568',
        borderBottom: '1px solid #E2E8F0',
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Search */}
        <Search 
          sx={{ flexGrow: { xs: 1, md: 0 }, mx: { xs: 1, md: 4 } }}
          onClick={handleSearchOpen}
        >
          <StyledInputBase
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start" sx={{ ml: 1 }}>
                <SearchIcon sx={{ color: '#4A5568', fontSize: '1.2rem' }} />
              </InputAdornment>
            }
            readOnly
          />
        </Search>

        {/* Right side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Messages">
            <IconButton 
              color="inherit" 
              sx={{ ml: 1 }}
              component={Link}
              href="/messages"
            >
              <Badge badgeContent={2} color="primary">
                <ChatIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              sx={{ ml: 1 }}
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Help">
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <HelpIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar 
                src={user?.avatar || '/assets/images/avatar.svg'} 
                alt={user?.name || 'User Profile'} 
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile dropdown menu */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 2,
            sx: { 
              minWidth: 200,
              mt: 1.5,
              borderRadius: 2,
              '& .MuiMenuItem-root': {
                py: 1.5,
              }
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
          
          <MenuItem onClick={handleProfile}>
            <PersonIcon sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Panel */}
        <NotificationsPanel 
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsClose}
        />

        {/* Search Panel */}
        <SearchPanel 
          anchorEl={searchAnchorEl}
          open={Boolean(searchAnchorEl)}
          onClose={handleSearchClose}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;