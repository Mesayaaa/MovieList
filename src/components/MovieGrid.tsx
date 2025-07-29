import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../data/movies';

interface MovieGridProps {
  movies: Movie[];
  onWatchMovie: (movie: Movie) => void;
  onToggleWatchlist: (movieId: string) => void;
  watchlist: string[];
  title: string;
}

export function MovieGrid({ movies, onWatchMovie, onToggleWatchlist, watchlist, title }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onWatch={onWatchMovie}
            onToggleWatchlist={onToggleWatchlist}
            isInWatchlist={watchlist.includes(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}