import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Show } from '../types';

interface HeroProps {
  movie: Show;
  onWatch: (movie: Show) => void;
  onToggleWatchlist: (movieId: number) => void;
  isInWatchlist: boolean;
}

// A simple function to strip HTML tags for the description
const stripHtml = (html: string | null) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export function Hero({ movie, onWatch, onToggleWatchlist, isInWatchlist }: HeroProps) {
  const imageUrl = movie.image?.original || movie.image?.medium || '';
  const year = movie.premiered ? new Date(movie.premiered).getFullYear() : '';
  const rating = movie.rating?.average || '';
  const genres = movie.genres.join(', ');
  const description = stripHtml(movie.summary);

  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {movie.name}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-6">
            {rating && (
              <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium">
                {rating}
              </span>
            )}
            {year && <span>{year}</span>}
            {genres && <span>{genres}</span>}
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed line-clamp-3">
            {description}
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