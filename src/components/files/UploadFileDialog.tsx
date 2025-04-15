'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface UploadFileDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  currentFolder: string | null;
}

interface FileItem {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  open,
  onClose,
  onUpload,
  currentFolder,
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        status: 'pending' as const,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        status: 'pending' as const,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload progress
    const updatedFiles = [...files];
    let completedCount = 0;
    
    files.forEach((_, index) => {
      updatedFiles[index].status = 'uploading';
      updatedFiles[index].progress = 0;
      
      const interval = setInterval(() => {
        setFiles((currentFiles) => {
          const newFiles = [...currentFiles];
          if (newFiles[index]) {
            if (newFiles[index].progress! < 100) {
              newFiles[index].progress = Math.min(100, (newFiles[index].progress || 0) + 10);
            } else {
              clearInterval(interval);
              newFiles[index].status = 'success';
              completedCount++;
              
              if (completedCount === files.length) {
                // All files completed
                setTimeout(() => {
                  onUpload(files.map((f) => f.file));
                  setFiles([]);
                  setUploading(false);
                }, 500);
              }
            }
          } else {
            clearInterval(interval);
          }
          return newFiles;
        });
      }, 300);
    });
  };

  const handleClickBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClose = () => {
    if (!uploading) {
      onClose();
      setFiles([]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={uploading ? undefined : handleClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: '100%',
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Upload Files</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={uploading}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Drag and drop area */}
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        
        {files.length === 0 && (
          <Paper
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              mb: 2,
              cursor: uploading ? 'default' : 'pointer',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleClickBrowse}
          >
            <CloudUploadIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop files here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse
            </Typography>
          </Paper>
        )}

        {/* Selected files list */}
        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Files ({files.length})
            </Typography>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {files.map((fileItem, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    !uploading && (
                      <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveFile(index)}>
                        <CancelIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemIcon>
                    {fileItem.status === 'success' ? (
                      <CheckIcon color="success" />
                    ) : fileItem.status === 'error' ? (
                      <ErrorIcon color="error" />
                    ) : (
                      <FileIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={fileItem.file.name}
                    secondary={
                      <>
                        {fileItem.status === 'uploading' && (
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <LinearProgress variant="determinate" value={fileItem.progress || 0} />
                          </Box>
                        )}
                        {fileItem.error && (
                          <Typography variant="caption" color="error">
                            {fileItem.error}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          disabled={uploading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;