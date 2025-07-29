export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  year: number;
  genre: string;
  rating: string;
  duration: string;
  trailer?: string;
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Stellar Odyssey',
    description: 'An epic space adventure that follows a crew of explorers as they venture into the unknown depths of the galaxy, discovering new worlds and facing cosmic dangers that test their courage and unity.',
    poster: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Sci-Fi',
    rating: '8.5',
    duration: '2h 28m'
  },
  {
    id: '2',
    title: 'Urban Legends',
    description: 'A gripping thriller set in the heart of a bustling metropolis, where a detective uncovers a web of mysteries that blur the line between reality and urban folklore.',
    poster: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Thriller',
    rating: '7.8',
    duration: '1h 56m'
  },
  {
    id: '3',
    title: 'The Last Samurai\'s Honor',
    description: 'Set in feudal Japan, this epic tale follows a masterless samurai on a quest to restore honor to his family name while navigating the changing political landscape of ancient Japan.',
    poster: 'https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Action',
    rating: '8.9',
    duration: '2h 15m'
  },
  {
    id: '4',
    title: 'Midnight in Paris',
    description: 'A romantic comedy-drama about a screenwriter who finds himself mysteriously transported back to the 1920s Paris every night at midnight, meeting famous writers and artists.',
    poster: 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Romance',
    rating: '8.2',
    duration: '1h 48m'
  },
  {
    id: '5',
    title: 'Ocean\'s Deep',
    description: 'A stunning underwater adventure documentary that explores the mysterious depths of our oceans, revealing incredible marine life and hidden ecosystems never before captured on film.',
    poster: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Documentary',
    rating: '9.1',
    duration: '1h 32m'
  },
  {
    id: '6',
    title: 'Comedy Central',
    description: 'A hilarious ensemble comedy about a group of friends trying to save their local comedy club from closing down, featuring non-stop laughs and heartwarming moments.',
    poster: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Comedy',
    rating: '7.5',
    duration: '1h 42m'
  },
  {
    id: '7',
    title: 'Forest of Shadows',
    description: 'A spine-chilling horror film about a group of hikers who venture into an ancient forest, only to discover that some places are meant to remain undisturbed.',
    poster: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Horror',
    rating: '7.3',
    duration: '1h 38m'
  },
  {
    id: '8',
    title: 'Children of Tomorrow',
    description: 'An enchanting family adventure about a group of children who discover a magical portal in their backyard that leads to a world where imagination becomes reality.',
    poster: 'https://images.pexels.com/photos/235975/pexels-photo-235975.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Family',
    rating: '8.0',
    duration: '1h 52m'
  },
  {
    id: '9',
    title: 'Desert Storm',
    description: 'An intense war drama following a squad of soldiers during a desert conflict, exploring themes of brotherhood, sacrifice, and the human cost of war.',
    poster: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Drama',
    rating: '8.7',
    duration: '2h 8m'
  },
  {
    id: '10',
    title: 'Neon Nights',
    description: 'A stylish cyberpunk thriller set in a neon-soaked future city, where a hacker uncovers a conspiracy that could change the fate of humanity.',
    poster: 'https://images.pexels.com/photos/374018/pexels-photo-374018.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Sci-Fi',
    rating: '8.3',
    duration: '2h 1m'
  },
  {
    id: '11',
    title: 'The Art of Love',
    description: 'A beautiful romantic drama about two artists from different backgrounds who find love through their shared passion for creativity and self-expression.',
    poster: 'https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Romance',
    rating: '7.9',
    duration: '1h 44m'
  },
  {
    id: '12',
    title: 'Racing Hearts',
    description: 'An adrenaline-pumping action film about underground street racing, where drivers risk everything for the ultimate prize and the respect of their peers.',
    poster: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Action',
    rating: '7.6',
    duration: '1h 58m'
  },
  {
    id: '13',
    title: 'Laugh Track',
    description: 'A comedy about a struggling stand-up comedian who gets a shot at the big time, but must overcome stage fright and personal demons to achieve his dreams.',
    poster: 'https://images.pexels.com/photos/274131/pexels-photo-274131.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Comedy',
    rating: '7.4',
    duration: '1h 36m'
  },
  {
    id: '14',
    title: 'Wildlife Kingdom',
    description: 'A breathtaking nature documentary showcasing the incredible diversity of wildlife across different continents, captured with stunning cinematography.',
    poster: 'https://images.pexels.com/photos/39663/african-lion-zoo-lion-male-39663.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2024,
    genre: 'Documentary',
    rating: '9.0',
    duration: '1h 28m'
  },
  {
    id: '15',
    title: 'The Haunted Manor',
    description: 'A classic horror film about a family who inherits an old manor, only to discover that the previous owners never really left and have sinister plans for the new residents.',
    poster: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    genre: 'Horror',
    rating: '7.2',
    duration: '1h 45m'
  }
];