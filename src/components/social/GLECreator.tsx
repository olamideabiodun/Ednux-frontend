'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Slider,
  Tooltip
} from '@mui/material';
import { 
  Lightbulb as LightbulbIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  SchoolOutlined as SchoolIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
  EmojiObjects as InsightsIcon,
  TipsAndUpdates as TipsIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';


// GLECreator Component
const GLECreator: React.FC<{
    onComplete: (content: any) => void;
    onCancel: () => void;
  }> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState('');
    const [gleType, setGleType] = useState('insight');
    const [complexity, setComplexity] = useState(50);
    const [format, setFormat] = useState('concise');
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    
    const handleGenerate = () => {
      if (!topic.trim()) return;
      
      setLoading(true);
      
      // Simulate generating GLE content
      setTimeout(() => {
        // In a real implementation, this would be an API call to the GLE service
        const mockContent = {
          id: `gle-${Date.now()}`,
          type: gleType,
          title: `${gleType === 'insight' ? 'Insight' : gleType === 'tips' ? 'Tips for' : 'Understanding'}: ${topic}`,
          topic: topic,
          format: format,
          complexity: complexity,
          content: generateMockContent(topic, gleType, complexity, format),
          sources: [
            { title: 'Journal of Educational Research', url: '#' },
            { title: 'Learning Analytics Handbook', url: '#' },
          ],
          relatedTopics: ['Learning Strategies', 'Knowledge Retention', 'Study Habits'],
          createdAt: new Date().toISOString(),
        };
        
        setGeneratedContent(mockContent);
        setLoading(false);
        setStep(2);
      }, 2000);
    };
    
    const handleComplete = () => {
      onComplete(generatedContent);
    };
    
    const generateMockContent = (topic: string, type: string, complexity: number, format: string) => {
      let content = '';
      
      switch (type) {
        case 'insight':
          content = `Recent research on ${topic} has shown that interactive learning methods improve retention by up to 40%. Students who engage in discussion and practical application of concepts demonstrate significantly higher understanding. The key factors include active participation, real-world connections, and timely feedback.`;
          break;
        case 'tips':
          content = `1. Start with the fundamentals of ${topic} before advancing to complex concepts.\n2. Use visual aids and diagrams to map relationships between ideas.\n3. Practice explaining concepts in your own words to test understanding.\n4. Connect new information to existing knowledge for better retention.\n5. Take regular breaks during study sessions to improve focus.`;
          break;
        case 'conceptual':
          content = `The conceptual framework of ${topic} is built upon three main pillars: theoretical foundations, practical applications, and interdisciplinary connections. Understanding how these elements interact provides a comprehensive view of the subject. This approach allows learners to develop both depth and breadth in their knowledge base.`;
          break;
        default:
          content = `This is a generated GLE content about ${topic}.`;
      }
      
      // Adjust based on complexity
      if (complexity > 75) {
        content += ` Additionally, advanced studies in this area have revealed nuanced patterns that challenge conventional understanding. These nuances are particularly evident when examining cross-contextual applications.`;
      }
      
      // Adjust based on format
      if (format === 'detailed') {
        content += ` \n\nFurther exploration suggests multiple pathways for implementation, each with distinct advantages depending on the learning context. Recommended resources include specialized publications and interactive learning modules that provide structured practice opportunities.`;
      }
      
      return content;
    };
    
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Create GLE Content</Typography>
        </Box>
        
        {step === 1 ? (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              GLE (Guided Learning Experience) helps create educational content personalized to your learning needs.
            </Alert>
            
            <TextField
              label="Topic or Question"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="E.g., Effective study techniques, Understanding quantum physics"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <SearchIcon color="action" />
                ),
              }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={gleType}
                label="Content Type"
                onChange={(e) => setGleType(e.target.value)}
              >
                <MenuItem value="insight">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InsightsIcon sx={{ mr: 1 }} />
                    Learning Insight
                  </Box>
                </MenuItem>
                <MenuItem value="tips">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TipsIcon sx={{ mr: 1 }} />
                    Practical Tips
                  </Box>
                </MenuItem>
                <MenuItem value="conceptual">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PsychologyIcon sx={{ mr: 1 }} />
                    Conceptual Understanding
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Complexity Level</Typography>
              <Slider
                value={complexity}
                onChange={(_, newValue) => setComplexity(newValue as number)}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={90}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">Simpler</Typography>
                <Typography variant="caption" color="text.secondary">More Advanced</Typography>
              </Box>
            </Box>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Format</InputLabel>
              <Select
                value={format}
                label="Format"
                onChange={(e) => setFormat(e.target.value)}
              >
                <MenuItem value="concise">Concise</MenuItem>
                <MenuItem value="detailed">Detailed</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button 
                onClick={onCancel}
                sx={{ borderRadius: 8, textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={!topic.trim() || loading}
                startIcon={loading ? <CircularProgress size={20} /> : <LightbulbIcon />}
                sx={{ borderRadius: 8, textTransform: 'none' }}
              >
                {loading ? 'Generating...' : 'Generate GLE'}
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                mb: 3,
                border: '1px solid',
                borderColor: 'primary.light',
                bgcolor: 'rgba(67, 97, 238, 0.05)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={generatedContent.type === 'insight' ? 'Learning Insight' : 
                         generatedContent.type === 'tips' ? 'Practical Tips' : 
                         'Conceptual Understanding'}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Complexity: {generatedContent.complexity}%
                </Typography>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>
                {generatedContent.title}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
                {generatedContent.content}
              </Typography>
              
              {generatedContent.sources && generatedContent.sources.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Sources:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                    {generatedContent.sources.map((source: any, index: number) => (
                      <Chip
                        key={index}
                        label={source.title}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              
              {generatedContent.relatedTopics && generatedContent.relatedTopics.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Related Topics:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt:.5 }}>
                    {generatedContent.relatedTopics.map((topic: string, index: number) => (
                      <Chip
                        key={index}
                        label={topic}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                onClick={() => setStep(1)}
                sx={{ borderRadius: 8, textTransform: 'none' }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleComplete}
                sx={{ borderRadius: 8, textTransform: 'none' }}
              >
                Use This Content
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export default GLECreator;