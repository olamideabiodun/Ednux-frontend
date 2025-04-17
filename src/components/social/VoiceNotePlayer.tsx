'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Slider, 
  Tooltip
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeMuteIcon,
  MicNone as MicIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

interface VoiceNotePlayerProps {
  voiceNote: {
    url: string;
    duration: number;
  };
}

const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({ voiceNote }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(voiceNote.duration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Set up event listeners
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleAudioEnded);
      
      // Clean up event listeners
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleAudioEnded);
        }
      };
    }
  }, []);
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (event: Event, value: number | number[]) => {
    const time = value as number;
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  const handleVolumeChange = (event: Event, value: number | number[]) => {
    const newVolume = value as number;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = volume;
      }
    }
  };
  
  const handleVolumeMouseEnter = () => {
    setIsVolumeSliderVisible(true);
  };
  
  const handleVolumeMouseLeave = () => {
    setIsVolumeSliderVisible(false);
  };
  
  const handleDownload = () => {
    // Create a temporary link to download the audio file
    const link = document.createElement('a');
    link.href = voiceNote.url;
    link.download = 'voice-note.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Generate an array of numbers to create the waveform visualization
  const generateWaveform = () => {
    const waveData = [];
    const segments = 40; // Number of bars in the waveform
    
    for (let i = 0; i < segments; i++) {
      // Create a pseudo-random but deterministic height for each bar
      const height = Math.sin(i * (Math.PI / 10)) * 0.5 + 0.5;
      waveData.push(height * 100);
    }
    
    return waveData;
  };
  
  const waveform = generateWaveform();
  const activeSegments = Math.floor((currentTime / duration) * waveform.length) || 0;

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <audio ref={audioRef} src={voiceNote.url} preload="metadata" />
      
      <IconButton onClick={handlePlayPause} sx={{ color: 'primary.main' }}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      
      <Box sx={{ ml: 1, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <MicIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Voice Note
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              height: 30, 
              alignItems: 'center', 
              flex: 1,
              cursor: 'pointer',
              position: 'relative',
              '&:hover': {
                '& .waveform-overlay': {
                  opacity: 0.7,
                },
              },
            }}
            onClick={(e) => {
              if (audioRef.current && duration > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const percentage = offsetX / rect.width;
                const newTime = percentage * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
          >
            {/* Waveform */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%', 
                height: '100%', 
                gap: 0.5,
              }}
            >
              {waveform.map((height, index) => (
                <Box 
                  key={index}
                  sx={{
                    height: `${Math.max(20, height)}%`,
                    width: '100%',
                    maxWidth: 4,
                    borderRadius: 4,
                    bgcolor: index < activeSegments ? 'primary.main' : 'rgba(0, 0, 0, 0.2)',
                    transition: 'height 0.1s ease-in-out',
                  }}
                />
              ))}
            </Box>
            
            {/* Overlay for hover effect */}
            <Box 
              className="waveform-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.05)',
                opacity: 0,
                transition: 'opacity 0.2s',
                borderRadius: 1,
              }}
            />
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: 45, textAlign: 'right' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ml: 1,
        }}
        onMouseEnter={handleVolumeMouseEnter}
        onMouseLeave={handleVolumeMouseLeave}
      >
        <IconButton onClick={handleMuteToggle} size="small">
          {isMuted ? <VolumeMuteIcon fontSize="small" /> : <VolumeIcon fontSize="small" />}
        </IconButton>
        
        {isVolumeSliderVisible && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: 1,
              p: 1,
              zIndex: 10,
            }}
          >
            <Slider
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              min={0}
              max={1}
              step={0.01}
              sx={{ width: '100%' }}
            />
          </Box>
        )}
      </Box>
      
      <Tooltip title="Download">
        <IconButton onClick={handleDownload} size="small" sx={{ ml: 0.5 }}>
          <DownloadIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default VoiceNotePlayer;