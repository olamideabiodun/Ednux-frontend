'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  IconButton,
  Chip,
  Button
} from '@mui/material';
import {
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  Code as CodeIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { mockFiles } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

interface FilesSectionProps {
  userId?: string; // If undefined, shows current user's files
}

const FilesSection: React.FC<FilesSectionProps> = ({ userId }) => {
  // Filter files to show only the most recent (in a real app this would be paginated)
  const recentFiles = mockFiles.slice(0, 5);

  // Get file icon based on file type
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

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Recent Files
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<CloudUploadIcon />}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Upload File
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.paper' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentFiles.map((file) => (
              <TableRow key={file.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getFileIcon(file.type)}
                    <Typography sx={{ ml: 1 }} variant="body2">
                      {file.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={file.type.toUpperCase()} 
                    size="small"
                    sx={{ 
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      height: 22,
                    }}
                  />
                </TableCell>
                <TableCell>{formatFileSize(file.size)}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(file.updatedAt), { addSuffix: true })}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
          variant="text"
          href="/files"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          View All Files
        </Button>
      </Box>
    </Box>
  );
};

export default FilesSection;