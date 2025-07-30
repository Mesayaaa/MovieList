import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { SearchBar } from './components/SearchBar';
import { VideoPlayer } from './components/VideoPlayer';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { Show, fetchShows, searchShows } from './services/tvmaze';
import { LoadingSpinner } from './components/LoadingSpinner';

// The Movie interface is now Show, but we will adapt it for components that expect Movie
// This is a temporary solution until all components are refactored.
export type Movie = Show;

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'basic' | 'premium';
  watchlist: number[];
  history: number[];
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'subscription'>('home');

  const [shows, setShows] = useState<Show[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetch and demo user setup
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedShows = await fetchShows();
        setShows(fetchedShows);
        setFilteredShows(fetchedShows); // Initially, all shows are visible

        const allGenres = [...new Set(fetchedShows.flatMap(show => show.genres))];
        setGenres(allGenres);

        // Setup a demo user with watchlist/history based on fetched show IDs
        const demoUser: User = {
          id: '1',
          email: 'demo@streamflix.com',
          name: 'Demo User',
          subscription: 'premium',
          watchlist: fetchedShows.slice(0, 5).map(s => s.id),
          history: fetchedShows.slice(5, 10).map(s => s.id)
        };
        setCurrentUser(demoUser);

      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Search and filter effect
  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      let results: Show[] = [];
      if (searchQuery) {
        results = await searchShows(searchQuery);
      } else {
        results = shows;
      }

      let genreFiltered = results;
      if (selectedGenre) {
        genreFiltered = results.filter(show => show.genres.includes(selectedGenre));
      }

      setFilteredShows(genreFiltered);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedGenre, shows]);

  const handleLogin = (email: string) => {
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

  const handleWatchShow = (show: Show) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    if (currentUser && !currentUser.history.includes(show.id)) {
      setCurrentUser({
        ...currentUser,
        history: [show.id, ...currentUser.history.slice(0, 19)]
      });
    }
    
    setSelectedShow(show);
  };

  const toggleWatchlist = (showId: number) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    const isInWatchlist = currentUser.watchlist.includes(showId);
    setCurrentUser({
      ...currentUser,
      watchlist: isInWatchlist 
        ? currentUser.watchlist.filter(id => id !== showId)
        : [...currentUser.watchlist, showId]
    });
  };

  const getShowsByIds = (ids: number[]): Show[] => {
      return shows.filter(show => ids.includes(show.id));
  }

  if (selectedShow) {
    // This is a hacky solution for the VideoPlayer which expects a trailer.
    // TVMaze API does not provide trailers directly. We'll use a placeholder.
    const showWithTrailer = {
        ...selectedShow,
        trailer: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    };
    return (
      <VideoPlayer 
        movie={showWithTrailer}
        onClose={() => setSelectedShow(null)}
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
          {isLoading && !shows.length ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : shows.length > 0 && (
            <>
              <Hero
                movie={shows[0]}
                onWatch={handleWatchShow}
                onToggleWatchlist={() => toggleWatchlist(shows[0].id)}
                isInWatchlist={currentUser?.watchlist.includes(shows[0].id) || false}
              />

              <div className="px-4 py-8">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedGenre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                  genres={genres}
                  isLoading={isLoading}
                />

                <MovieGrid
                  movies={filteredShows}
                  onWatchMovie={handleWatchShow}
                  onToggleWatchlist={toggleWatchlist}
                  watchlist={currentUser?.watchlist || []}
                  title={searchQuery || selectedGenre ? "Search Results" : "Featured Shows"}
                />

                {currentUser && currentUser.watchlist.length > 0 && (
                  <MovieGrid
                    movies={getShowsByIds(currentUser.watchlist)}
                    onWatchMovie={handleWatchShow}
                    onToggleWatchlist={toggleWatchlist}
                    watchlist={currentUser.watchlist}
                    title="My Watchlist"
                  />
                )}

                {currentUser && currentUser.history.length > 0 && (
                  <MovieGrid
                    movies={getShowsByIds(currentUser.history)}
                    onWatchMovie={handleWatchShow}
                    onToggleWatchlist={toggleWatchlist}
                    watchlist={currentUser.watchlist}
                    title="Continue Watching"
                  />
                )}
              </div>
            </>
          )}
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