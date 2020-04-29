import React from "react";
import styled from "styled-components";
import LoaderSpinner from 'react-loader-spinner'
import { theme } from "../theme";

const LOADER_SIZE = 80;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const Loader = () => (
  <Container>
    <LoaderSpinner
      type="Bars"
      color={theme.color.BLUE}
      height={LOADER_SIZE}
      width={LOADER_SIZE}
    />
  </Container>
)