export interface Show {
  id: number;
  name: string;
  summary: string;
  image: {
    medium: string;
    original: string;
  } | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  ended: string | null;
  runtime: number | null;
  // This property is added on the fly in App.tsx for the video player
  trailer?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'basic' | 'premium';
  watchlist: number[];
  history: number[];
}

export interface ShowSearchResult {
  score: number;
  show: Show;
}
