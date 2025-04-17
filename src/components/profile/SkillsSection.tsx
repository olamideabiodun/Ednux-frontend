'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  IconButton, 
  TextField, 
  Button 
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

interface SkillsSectionProps {
  skills: string[];
  isEditable: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skillsList, setSkillsList] = useState<string[]>(skills);
  const [newSkill, setNewSkill] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkillsList(skillsList.filter(skill => skill !== skillToDelete));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList([...skillsList, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Skills & Expertise
        </Typography>
        
        {isEditable && !isEditing && (
          <IconButton onClick={handleEditClick} size="small">
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {isEditing ? (
        <>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddSkill}
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Add
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skillsList.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsEditing(false);
                setSkillsList(skills); // Reset to original skills
              }}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveClick}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Save Changes
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skillsList.length > 0 ? (
            skillsList.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{ borderRadius: 2 }}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No skills added yet.
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default SkillsSection;