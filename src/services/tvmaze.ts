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
  premiered: string;
  ended: string | null;
  runtime: number | null;
}

export interface ShowSearchResult {
  score: number;
  show: Show;
}

const API_BASE_URL = 'https://api.tvmaze.com';

export async function fetchShows(): Promise<Show[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function searchShows(query: string): Promise<Show[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search shows');
    }
    const results: ShowSearchResult[] = await response.json();
    return results.map(result => result.show);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}
