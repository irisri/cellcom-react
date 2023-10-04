interface BaseMovie {
  adult: boolean;
  // image link
  backdrop_path: string;
  overview: string;
  popularity: number;
  // image link
  poster_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  id: string;
  original_language: string;
  original_title: string;
  release_date: string;
}

export interface MovieList extends BaseMovie {
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetailsInfo extends BaseMovie {
  genres: Genre[];
  homepage: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  imdb_id: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
  favorite: boolean;
}

export enum Filter {
  Popular = 'popular',
  Now_Playing = 'now',
  Favorite_Movies = 'favorite',
}
