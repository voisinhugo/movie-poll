import React, { useState, useEffect, useCallback } from 'react';
import { getMovieDetails } from "../api/MovieApi"
import styled from 'styled-components';
import { theme } from '../theme';

const Title = styled.h3`
  color: ${theme.color.WHITE};
`

const GenreLabel = styled.p`
  color: ${theme.color.WHITE};
`

const Overview = styled.p`
  color: ${theme.color.WHITE};
  text-align: justify;
`

export const MovieDetails = React.memo(({ movieId }) => {
  const [movie, setMovie] = useState(null);

  const fetchMovie = useCallback(async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    setMovie(movieDetails);
  }, []);

  useEffect(() => {
    fetchMovie(movieId);
  }, [fetchMovie, movieId]);

  return movie ? (
    <>
      <Title>{movie.title}</Title>
      <GenreLabel>
        {movie.genres.map(genre => genre.name).join(', ')}
      </GenreLabel>
      <Overview>{movie.overview}</Overview>
    </>
  ) : null;
});
