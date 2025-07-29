import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { movies, Movie } from './data/movies';

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'basic' | 'premium';
  watchlist: string[];
  history: string[];
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'profile' | 'subscription'>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Initialize demo user
  useEffect(() => {
    const demoUser: User = {
      id: '1',
      email: 'demo@streamflix.com',
      name: 'Demo User',
      subscription: 'premium',
      watchlist: ['1', '3', '7'],
      history: ['2', '5', '8']
    };
    setCurrentUser(demoUser);
  }, []);

  // Simulate search loading
  useEffect(() => {
    if (searchQuery || selectedGenre) {
      setIsSearchLoading(true);
      const timer = setTimeout(() => {
        setIsSearchLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, selectedGenre]);

  const handleLogin = (email: string, password: string) => {
    // Demo login - in production, this would authenticate with backend
    const user: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      subscription: 'basic',
      watchlist: [],
      history: []
    };
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleWatchMovie = (movie: Movie) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    // Add to history
    if (!currentUser.history.includes(movie.id)) {
      setCurrentUser({
        ...currentUser,
        history: [movie.id, ...currentUser.history.slice(0, 19)] // Keep last 20
      });
    }
    
    setSelectedMovie(movie);
  };

  const toggleWatchlist = (movieId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    const isInWatchlist = currentUser.watchlist.includes(movieId);
    setCurrentUser({
      ...currentUser,
      watchlist: isInWatchlist 
        ? currentUser.watchlist.filter(id => id !== movieId)
        : [...currentUser.watchlist, movieId]
    });
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(movies.map(movie => movie.genre))];

  if (selectedMovie) {
    return (
      <VideoPlayer 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        userSubscription={currentUser?.subscription || 'free'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation 
        user={currentUser}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === 'home' && (
        <>
          <Hero 
            movie={movies[0]} 
            onWatch={handleWatchMovie}
            onToggleWatchlist={toggleWatchlist}
            isInWatchlist={currentUser?.watchlist.includes(movies[0].id) || false}
          />
          
          <div className="px-4 py-8">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              genres={genres}
              isLoading={isSearchLoading}
            />
            
            <MovieGrid 
              movies={filteredMovies}
              onWatchMovie={handleWatchMovie}
              onToggleWatchlist={toggleWatchlist}
              watchlist={currentUser?.watchlist || []}
              title={searchQuery || selectedGenre ? "Search Results" : "Featured Movies"}
            />

            {currentUser && currentUser.watchlist.length > 0 && (
              <MovieGrid 
                movies={movies.filter(movie => currentUser.watchlist.includes(movie.id))}
                onWatchMovie={handleWatchMovie}
                onToggleWatchlist={toggleWatchlist}
                watchlist={currentUser.watchlist}
                title="My Watchlist"
              />
            )}

            {currentUser && currentUser.history.length > 0 && (
              <MovieGrid 
                movies={movies.filter(movie => currentUser.history.includes(movie.id))}
                onWatchMovie={handleWatchMovie}
                onToggleWatchlist={toggleWatchlist}
                watchlist={currentUser.watchlist}
                title="Continue Watching"
              />
            )}
          </div>
        </>
      )}

      {currentView === 'profile' && currentUser && (
        <UserProfile 
          user={currentUser}
          onUpdateUser={setCurrentUser}
        />
      )}

      {currentView === 'subscription' && (
        <SubscriptionPlans 
          currentSubscription={currentUser?.subscription || 'free'}
          onSubscriptionChange={(plan) => {
            if (currentUser) {
              setCurrentUser({ ...currentUser, subscription: plan });
            }
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;