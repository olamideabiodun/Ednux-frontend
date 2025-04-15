'use client';

import React from 'react';
import { Box, Breadcrumbs, Typography, Link, Tooltip } from '@mui/material';
import { HomeOutlined as HomeIcon } from '@mui/icons-material';
import { Folder } from '@/types/file';

interface FolderPathProps {
  currentFolder: string | null;
  folders: Folder[];
  onNavigate: (folderId: string | nu'use client';

import React from 'react';
import { Box, Breadcrumbs, Typography, Link, Tooltip } from '@mui/material';
import { HomeOutlined as HomeIcon } from '@mui/icons-material';
import { Folder } from '@/types/file';

interface FolderPathProps {
  currentFolder: string | null;
  folders: Folder[];
  onNavigate: (folderId: string | null) => void;
}

const FolderPath: React.FC<FolderPathProps> = ({ currentFolder, folders, onNavigate }) => {
  // Build the folder path
  const buildPath = (folderId: string | null): Array<{ id: string | null; name: string }> => {
    if (!folderId) {
      return [{ id: null, name: 'Home' }];
    }

    const path: Array<{ id: string | null; name: string }> = [];
    let currentId = folderId;

    while (currentId) {
      const folder = folders.find((f) => f.id === currentId);
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId;
      } else {
        break;
      }
    }

    path.unshift({ id: null, name: 'Home' });
    return path;
  };

  const folderPath = buildPath(currentFolder);

  return (
    <Breadcrumbs aria-label="folder path" separator="›">
      {folderPath.map((folder, index) => {
        const isLast = index === folderPath.length - 1;

        return isLast ? (
          <Typography 
            key={folder.id || 'home'} 
            color="text.primary" 
            fontWeight={600}
            component="div"
          >
            {folder.id === null ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                Home
              </Box>
            ) : (
              folder.name
            )}
          </Typography>
        ) : (
          <Link
            key={folder.id || 'home'}
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => onNavigate(folder.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {folder.id === null && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
            {folder.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default FolderPath;ll) => void;
}

const FolderPath: React.FC<FolderPathProps> = ({ currentFolder, folders, onNavigate }) => {
  // Build the folder path
  const buildPath = (folderId: string | null): Array<{ id: string | null; name: string }> => {
    if (!folderId) {
      return [{ id: null, name: 'Home' }];
    }

    const path: Array<{ id: string | null; name: string }> = [];
    let currentId = folderId;

    while (currentId) {
      const folder = folders.find((f) => f.id === currentId);
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        currentId = folder.parentId;
      } else {
        break;
      }
    }

    path.unshift({ id: null, name: 'Home' });
    return path;
  };

  const folderPath = buildPath(currentFolder);

  return (
    <Breadcrumbs aria-label="folder path" separator="›">
      {folderPath.map((folder, index) => {
        const isLast = index === folderPath.length - 1;

        return isLast ? (
          <Typography key={folder.id || 'home'} color="text.primary" fontWeight={600}>
            {folder.id === null ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                Home
              </Box>
            ) : (
              folder.name
            )}
          </Typography>
        ) : (
          <Link
            key={folder.id || 'home'}
            component="button"
            underline="hover"
            color="inherit"
            onClick={() => onNavigate(folder.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {folder.id === null && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
            {folder.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default FolderPath;