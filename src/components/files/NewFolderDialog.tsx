'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Folder as FolderIcon } from '@mui/icons-material';

interface NewFolderDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({ open, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!folderName.trim()) {
      setError('Please enter a folder name');
      return;
    }
    
    onCreate(folderName.trim());
    setFolderName('');
  };

  const handleClose = () => {
    onClose();
    setFolderName('');
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: '100%',
          maxWidth: 400,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FolderIcon sx={{ mr: 1, color: 'warning.main' }} />
          <Typography variant="h6">Create New Folder</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            variant="outlined"
            value={folderName}
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
            InputProps={{
              sx: {
                borderRadius: 2,
              }
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose} 
            sx={{ 
              borderRadius: 2,
              textTransform: 'none', 
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              borderRadius: 2,
              textTransform: 'none', 
            }}
          >
            Create Folder
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewFolderDialog;