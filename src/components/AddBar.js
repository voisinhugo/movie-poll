import React, { useState } from 'react';
import styled from "styled-components";
import { theme } from '../theme';
import { searchMovie } from "../api/MovieApi";

const INPUT_ID = "movieSearchInput";

const Container = styled.div`
  display: flex;
  margin-top: ${theme.margin.x2}px;
  justify-content: center;
`;

const Description = styled.h2`
  display: flex;
  color: ${theme.color.WHITE};
  margin: ${theme.margin.x1}px 0px 0px 0px;
  user-select: none;
`;

const SearchButton = styled.div`
  display: flex;
  margin-left: ${theme.margin.x2}px;
  margin-top: ${theme.margin.x1}px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.BLUE};
  border-radius: 10px;
  height: 35px;
`;

const SearchButtonLabel = styled.p`
  margin-left: ${theme.margin.x1}px;
  margin-right: ${theme.margin.x1}px;
  color: ${theme.color.WHITE};
  user-select: none;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${theme.color.WHITE};
  max-width: 370px;
  margin-left: ${theme.margin.x2}px;
  margin-top: ${theme.margin.x1}px;
  border-radius: 4px;
`;

const SearchBarContainer = styled.input`
  display: flex;
  flex-grow: 1;
  background-color: ${theme.color.WHITE};
  height: 30px;
  max-width: 370px;
`;

const SearchResultContainer = styled.div`
  overflow: auto;
  height: ${props => props.isEmpty ? "0px" : "300px"};
`;

const SearchResultContentContainer = styled.div`
  display: flex;
  background-color: ${theme.color.WHITE};
  border-bottom-width: 1;
  border-bottom-width-color: black;
  padding: ${theme.margin.x1}px ${theme.margin.x1}px ${theme.margin.x1}px ${theme.margin.x1}px;
`;

const SearchResultLabel = styled.p`
  user-select: none;
`;

export const AddBar = ({ addAnwser }) => {
  const [movieList, setMovieList] = useState([]);

  const onSearch = async () => {
    const query = document.getElementById(INPUT_ID);
    if (query.value) {
      const movies = await searchMovie(query.value);
      setMovieList(movies);
    }
  }

  const onMovieSelect = (movieId, movieTitle) => {
    console.log("Selected movie: ", movieId, movieTitle);
    setMovieList([]);
    addAnwser(movieId, movieTitle);
  }

  return (
    <Container>
      <Description>Ajouter un film : </Description>
      <SearchContainer>
        <SearchBarContainer
          id={INPUT_ID}
          type="text"
          placeholder="Rechercher un film"
        />
        <SearchResultContainer isEmpty={!movieList.length}>
          {movieList.map((movie) => (
            <SearchResultContentContainer
              key={movie.id}
              onClick={() => onMovieSelect(movie.id, movie.title)}
            >
              <SearchResultLabel>{movie.title}</SearchResultLabel>
            </SearchResultContentContainer>
          ))}
        </SearchResultContainer>
      </SearchContainer>
      <SearchButton onClick={onSearch}>
        <SearchButtonLabel>
          Rechercher
        </SearchButtonLabel>
      </SearchButton>
    </Container>
  )
}