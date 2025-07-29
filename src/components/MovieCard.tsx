import React, { useState } from 'react';
import { Play, Plus, Check, Star } from 'lucide-react';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  onWatch: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
  isInWatchlist: boolean;
}

export function MovieCard({ movie, onWatch, onToggleWatchlist, isInWatchlist }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-300">{movie.rating}</span>
              </div>
              <span className="text-xs text-gray-300">{movie.year}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onWatch(movie);
                }}
                className="flex-1 flex items-center justify-center space-x-1 bg-white text-gray-900 px-3 py-2 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                <Play className="h-3 w-3" />
                <span>Play</span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWatchlist(movie.id);
                }}
                className="p-2 bg-gray-600/80 hover:bg-gray-600 rounded transition-colors"
              >
                {isInWatchlist ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Plus className="h-3 w-3 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}