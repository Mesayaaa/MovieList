import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward, 
  Settings,
  X
} from 'lucide-react';
import { Movie } from '../data/movies';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
  userSubscription: 'free' | 'basic' | 'premium';
}

export function VideoPlayer({ movie, onClose, userSubscription }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Available qualities based on subscription
  const availableQualities = {
    free: ['480p'],
    basic: ['480p', '720p'],
    premium: ['480p', '720p', '1080p', '4K']
  };

  // Main play/pause effect
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Keyboard and mouse controls effect
  useEffect(() => {
    const playerElement = playerRef.current;

    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            toggleFullscreen();
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
          break;
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
          break;
        case 'KeyM':
          setIsMuted(prev => !prev);
          break;
      }
    };

    playerElement?.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      playerElement?.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, onClose, duration]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hours > 0 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    videoRef.current.currentTime = percentage * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const skip = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += time;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={playerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={movie.trailer}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={() => setIsPlaying(!isPlaying)}
        onDoubleClick={toggleFullscreen}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
            <p className="text-gray-300 text-sm">{movie.year} • {movie.genre} • {movie.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Center Play/Pause button (optional, as clicking video toggles play) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all transform hover:scale-110 pointer-events-auto ${
              showControls && !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Play className="h-12 w-12" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-white/30 rounded-full mb-4 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-red-600 rounded-full transition-all relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -mt-2 -mr-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>

              <button
                onClick={() => skip(-10)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={() => skip(10)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <SkipForward className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-sm">{quality}</span>
                </button>

                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 min-w-[120px]">
                    {availableQualities[userSubscription].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setShowQualityMenu(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 transition-colors ${
                          quality === q ? 'text-red-400' : 'text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}