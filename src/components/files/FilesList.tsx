'use client';

import React from 'react';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Typography,
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

interface FilesListProps {
  folders: Folder[];
  files: File[];
  onFolderClick: (folderId: string) => void;
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <PdfIcon color="error" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageIcon color="success" />;
    case 'doc':
    case 'docx':
      return <DocIcon color="primary" />;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
      return <CodeIcon color="secondary" />;
    default:
      return <FileIcon color="action" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FilesList: React.FC<FilesListProps> = ({ folders, files, onFolderClick }) => {
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
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        mb: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Modified</TableCell>
              <TableCell>Size</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folders.length === 0 && files.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    This folder is empty
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {folders.map((folder) => (
              <TableRow 
                key={folder.id} 
                hover 
                onClick={() => onFolderClick(folder.id)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FolderIcon 
                      sx={{ 
                        mr: 1, 
                        color: theme.palette.warning.main 
                      }} 
                    />
                    <Typography noWrap>{folder.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(folder.updatedAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  {/* Folders don't have a size */}
                  -
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, folder.id, 'folder')}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {files.map((file) => (
              <TableRow 
                key={file.id} 
                hover
                sx={{ 
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getFileIcon(file.type)}
                    <Typography sx={{ ml: 1 }} noWrap component="div">{file.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(file.updatedAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  {formatFileSize(file.size)}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, file.id, 'file')}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Paper>
  );
};

export default FilesList;