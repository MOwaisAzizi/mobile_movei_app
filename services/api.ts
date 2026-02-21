
const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
        accept: 'application/json',
    },
};

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetials = async (
    movieId: string
): Promise<MovieDetails> => {
    if (!movieId) throw new Error('movieId is required');

    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error('Movie not found');
    }

    const data = await response.json();
    return data;
};