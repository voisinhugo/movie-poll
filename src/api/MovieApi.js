const BASE_URL = "https://api.themoviedb.org/3/";
const SEARCH_MOVIE = "search/movie";
const GET_MOVIE = "movie/";

const API_KEY = "f272a5f43ce4cc5810634ac04d30aa7d";

export const searchMovie = async (queryString) => {
  const response = await fetch(`${BASE_URL}${SEARCH_MOVIE}?api_key=${API_KEY}&language=fr-FR&page=1&include_adult=false&query=${queryString}`);
  const data = await response.json();
  if (data.results.length) {
    return data.results[0];
  } else {
    return null;
  }
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}${GET_MOVIE}${movieId}?api_key=${API_KEY}&language=fr-FR`)
  const data = await response.json();  
  return data;
};

// export const getDetailsFromMovies = async (movieIds) => {
//   const movies = await Promise.all(movieIds.map(getMovieDetails));
//   console.warn("movies: ", movies);
//   return movies;
// };
 
// const getImage = async (imageId) => {
//   const response = await fetch(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${imageId}`);
// };
