'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Button,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';

interface VoiceNoteRecorderProps {
  onRecordingComplete: (recording: { url: string; duration: number }) => void;
  onCancel: () => void;
}

const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({ 
  onRecordingComplete, 
  onCancel 
}) => {
  const theme = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(50).fill(5));

  // References
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up audio context for visualizer
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      
      // Start visualizer animation
      updateVisualizer();
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(audioBlob);
        
        // Create URL for audio playback
        const audioURL = URL.createObjectURL(audioBlob);
        setRecordingURL(audioURL);
        
        // Stop audio stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        // Clean up
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
      
      // Start recording
      audioChunksRef.current = [];
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };
  
  // Pause recording
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        // Resume recording
        mediaRecorderRef.current.resume();
        
        // Resume timer
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        
        setIsPaused(false);
      } else {
        // Pause recording
        mediaRecorderRef.current.pause();
        
        // Pause timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        setIsPaused(true);
      }
    }
  };
  
  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  
  // Update visualizer with audio data
  const updateVisualizer = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Reduce the frequency data to a smaller set for the visualizer
      const visualizerBars = 50;
      const visualizerData = Array(visualizerBars).fill(0);
      
      // Calculate average values for visualization
      const samplesPerBar = Math.floor(bufferLength / visualizerBars);
      for (let i = 0; i < visualizerBars; i++) {
        let sum = 0;
        for (let j = 0; j < samplesPerBar; j++) {
          const index = i * samplesPerBar + j;
          if (index < bufferLength) {
            sum += dataArray[index];
          }
        }
        visualizerData[i] = Math.max(5, Math.floor(sum / samplesPerBar) / 5); // Scale down and set a minimum value
      }
      
      setVisualizerData(visualizerData);
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }
  };
  
  // Play/pause recorded audio
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle audio playback ended
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  // Submit completed recording
  const handleSaveRecording = () => {
    if (recordingBlob && recordingURL) {
      onRecordingComplete({
        url: recordingURL,
        duration: recordingTime
      });
    }
  };
  
  // Cancel recording
  const handleCancelRecording = () => {
    // Clean up resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (recordingURL) {
      URL.revokeObjectURL(recordingURL);
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    onCancel();
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Stop recording
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      
      // Stop audio stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Clean up audio URL
      if (recordingURL) {
        URL.revokeObjectURL(recordingURL);
      }
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Close audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecording, recordingURL]);

  return (
    <Box sx={{ width: '100%', p: 2, borderRadius: 2, bgcolor: 'rgba(0, 0, 0, 0.03)' }}>
      {/* Recording interface */}
      {isRecording && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'error.main',
                mr: 2,
                animation: isPaused ? 'none' : 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)',
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)',
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)',
                  },
                },
              }}
            >
              <MicIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h6" component="div">
              {isPaused ? 'Recording Paused' : 'Recording...'}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 'auto', fontFamily: 'monospace' }}
            >
              {formatTime(recordingTime)}
            </Typography>
          </Box>
          
          {/* Audio visualizer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 60,
              mb: 2,
              gap: 0.5,
            }}
          >
            {visualizerData.map((value, index) => (
              <Box
                key={index}
                sx={{
                  height: `${value}%`,
                  width: '100%',
                  bgcolor: isPaused ? 'rgba(0, 0, 0, 0.2)' : 'primary.main',
                  borderRadius: 1,
                  transition: 'height 0.1s ease-in-out',
                }}
              />
            ))}
          </Box>
          
          {/* Recording controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              onClick={pauseRecording}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </IconButton>
            
            <IconButton
              onClick={stopRecording}
              sx={{ 
                bgcolor: 'error.main', 
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' },
              }}
            >
              <StopIcon />
            </IconButton>
            
            <IconButton
              onClick={handleCancelRecording}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {/* Preview interface */}
      {!isRecording && recordingURL && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="div">
              Voice Note Preview
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 'auto', fontFamily: 'monospace' }}
            >
              {formatTime(recordingTime)}
            </Typography>
          </Box>
          
          <audio 
            ref={audioRef} 
            src={recordingURL} 
            onEnded={handleAudioEnded} 
            style={{ display: 'none' }} 
          />
          
          {/* Waveform visualization (static for preview) */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 60,
              mb: 2,
              gap: 0.5,
            }}
          >
            {visualizerData.map((value, index) => (
              <Box
                key={index}
                sx={{
                  height: `${value}%`,
                  width: '100%',
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  opacity: isPlaying ? 1 : 0.6,
                }}
              />
            ))}
          </Box>
          
          {/* Preview controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              onClick={togglePlayback}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            
            <IconButton
              onClick={handleSaveRecording}
              color="primary"
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <DoneIcon />
            </IconButton>
            
            <IconButton
              onClick={handleCancelRecording}
              sx={{ 
                bgcolor: 'background.paper', 
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      
      {/* Initial state */}
      {!isRecording && !recordingURL && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MicIcon />}
            onClick={startRecording}
            sx={{ 
              borderRadius: 8,
              textTransform: 'none',
              px: 3,
            }}
          >
            Start Recording
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VoiceNoteRecorder;