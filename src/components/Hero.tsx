import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Movie } from '../data/movies';

interface HeroProps {
  movie: Movie;
  onWatch: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
  isInWatchlist: boolean;
}

export function Hero({ movie, onWatch, onToggleWatchlist, isInWatchlist }: HeroProps) {
  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-6">
            <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium">
              {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {movie.description}
          </p>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onWatch(movie)}
              className="flex items-center space-x-2 bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play className="h-5 w-5" />
              <span>Play</span>
            </button>
            
            <button 
              onClick={() => onToggleWatchlist(movie.id)}
              className="flex items-center space-x-2 bg-gray-600/80 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors"
            >
              <Plus className={`h-5 w-5 ${isInWatchlist ? 'text-red-400' : ''}`} />
              <span>{isInWatchlist ? 'In Watchlist' : 'My List'}</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-600/80 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors">
              <Info className="h-5 w-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}