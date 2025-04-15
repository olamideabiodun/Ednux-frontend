'use client';

import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Folder as FolderIcon,
  MoreVert as MoreVertIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { File, Folder } from '@/types/file';

interface FilesGridProps {
  folders: Folder[];
  files: File[];
  onFolderClick: (folderId: string) => void;
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <PdfIcon fontSize="large" color="error" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageIcon fontSize="large" color="success" />;
    case 'doc':
    case 'docx':
      return <DocIcon fontSize="large" color="primary" />;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
      return <CodeIcon fontSize="large" color="secondary" />;
    default:
      return <FileIcon fontSize="large" color="action" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FilesGrid: React.FC<FilesGridProps> = ({ folders, files, onFolderClick }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<{ id: string, type: 'file' | 'folder' } | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string, type: 'file' | 'folder') => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedItem({ id, type });
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDeleteItem = () => {
    console.log(`Delete ${selectedItem?.type} with id ${selectedItem?.id}`);
    handleMenuClose();
  };

  const handleRenameItem = () => {
    console.log(`Rename ${selectedItem?.type} with id ${selectedItem?.id}`);
    handleMenuClose();
  };

  const handleShareItem = () => {
    console.log(`Share ${selectedItem?.type} with id ${selectedItem?.id}`);
    handleMenuClose();
  };

  const handleDownloadFile = () => {
    console.log(`Download file with id ${selectedItem?.id}`);
    handleMenuClose();
  };

  return (
    <Box>
      {folders.length === 0 && files.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="body1" color="text.secondary">
            This folder is empty
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {folders.map((folder) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={folder.id}>
              <Paper
                elevation={0}
                onClick={() => onFolderClick(folder.id)}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <FolderIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, folder.id, 'folder')}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="subtitle1" 
                  fontWeight={500}
                  component="div"
                  sx={{ 
                    mt: 1, 
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {folder.name}
                </Typography>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ mt: 'auto', pt: 1 }}
                >
                  {formatDistanceToNow(new Date(folder.updatedAt), { addSuffix: true })}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {files.map((file) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={file.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  {getFileIcon(file.type)}
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, file.id, 'file')}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="subtitle1" 
                  fontWeight={500}
                  component="div"
                  sx={{ 
                    mt: 1, 
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {file.name}
                </Typography>
                
                <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(file.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRenameItem}>Rename</MenuItem>
        {selectedItem?.type === 'file' && (
          <MenuItem onClick={handleDownloadFile}>Download</MenuItem>
        )}
        <MenuItem onClick={handleShareItem}>Share</MenuItem>
        <MenuItem onClick={handleDeleteItem} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilesGrid;