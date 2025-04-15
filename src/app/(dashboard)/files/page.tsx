'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Breadcrumbs,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  CreateNewFolder as CreateNewFolderIcon,
  UploadFile as UploadFileIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import FilesList from '@/components/files/FilesList';
import FilesGrid from '@/components/files/FilesGrid';
import FolderPath from '@/components/files/FolderPath';
import NewFolderDialog from '@/components/files/NewFolderDialog';
import UploadFileDialog from '@/components/files/UploadFileDialog';
import { mockFolders, mockFiles } from '@/lib/mockData';

export default function FilesPage() {
  const theme = useTheme();
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [uploadFileOpen, setUploadFileOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Get folders and files for the current folder
  const currentFolders = mockFolders.filter(folder => folder.parentId === currentFolder);
  const currentFiles = mockFiles.filter(file => file.folderId === currentFolder);

  // Sort items
  const sortedFolders = [...currentFolders].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return 0;
  });

  const sortedFiles = [...currentFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === 'size') {
      return sortOrder === 'asc'
        ? a.size - b.size
        : b.size - a.size;
    }
    return 0;
  });

  // Handle menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortBy: 'name' | 'date' | 'size') => {
    if (sortBy === this.sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortBy);
      setSortOrder('asc');
    }
    handleMenuClose();
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const handleFolderCreate = (name: string) => {
    // In a real app, we would call an API here
    console.log(`Creating folder: ${name} in parent: ${currentFolder}`);
    setNewFolderOpen(false);
    // Refresh folder list would happen after API call
  };

  const handleFileUpload = (files: File[]) => {
    // In a real app, we would call an API here
    console.log(`Uploading ${files.length} files to folder: ${currentFolder}`);
    setUploadFileOpen(false);
    // Refresh file list would happen after API call
  };

  const handleNavigateToFolder = (folderId: string | null) => {
    setCurrentFolder(folderId);
  };

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Files
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CreateNewFolderIcon />}
            onClick={() => setNewFolderOpen(true)}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            New Folder
          </Button>
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={() => setUploadFileOpen(true)}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* Folder navigation */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}
      >
        <FolderPath 
          currentFolder={currentFolder} 
          folders={mockFolders} 
          onNavigate={handleNavigateToFolder} 
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={() => setViewMode('list')}
            color={viewMode === 'list' ? 'primary' : 'default'}
          >
            <ViewListIcon />
          </IconButton>
          <IconButton 
            onClick={() => setViewMode('grid')}
            color={viewMode === 'grid' ? 'primary' : 'default'}
          >
            <ViewModuleIcon />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleSortChange('name')}>
              Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </MenuItem>
            <MenuItem onClick={() => handleSortChange('date')}>
              Sort by Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </MenuItem>
            <MenuItem onClick={() => handleSortChange('size')}>
              Sort by Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setNewFolderOpen(true)}>
              New Folder
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Files and folders display */}
      <Box sx={{ mb: 4 }}>
        {viewMode === 'list' ? (
          <FilesList 
            folders={sortedFolders} 
            files={sortedFiles} 
            onFolderClick={handleFolderClick} 
          />
        ) : (
          <FilesGrid 
            folders={sortedFolders} 
            files={sortedFiles} 
            onFolderClick={handleFolderClick} 
          />
        )}
      </Box>

      {/* Dialogs */}
      <NewFolderDialog 
        open={newFolderOpen} 
        onClose={() => setNewFolderOpen(false)}
        onCreate={handleFolderCreate}
      />
      
      <UploadFileDialog
        open={uploadFileOpen}
        onClose={() => setUploadFileOpen(false)}
        onUpload={handleFileUpload}
        currentFolder={currentFolder}
      />
    </Box>
  );
}