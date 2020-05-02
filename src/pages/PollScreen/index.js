import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { getPoll, voteForPoll } from "../../api/PollApi"
import { Loader } from "../../components/Loader";
import { MovieDetails } from "../../components/MovieDetails";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${theme.margin.x1}px;
  background-color: ${theme.color.BLACK};
`;

const Title = styled.h1`
  color: ${theme.color.WHITE};
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  padding: ${theme.margin.x1}px;
  margin-top: ${theme.margin.x1}px;
  margin-bottom: ${theme.margin.x1}px;
  background-color: ${props => {
    switch (props.isAnswer) {
      case true:
        return theme.color.BLUE;
      case false:
        return theme.color.GREY;
      case null:
      default:
        return theme.color.WHITE;
    }
  }};
  border-radius: 8px;
  max-width: 500px;
`;

const AnswerLabel = styled.p`
  margin: ${theme.margin.x2}px ${theme.margin.x1}px ${theme.margin.x2}px ${theme.margin.x1}px;
  user-select: none;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
`

const InfoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${props => props.selected ? theme.color.BLUE : theme.color.GREY};
  margin: ${theme.margin.x1}px;
`

const InfoButtonLabel = styled.p`
  user-select: none;
`

const Spacer = styled.div`
  display: flex;
  flex: 1
`


export const PollScreen = () => {
  const [poll, setPoll] = useState(null);
  const [answerId, setAnswerId] = useState(null);
  const [results, setResults] = useState(null);
  const [infoStates, setInfoStates] = useState({});
  const getPercentage = (id) => {
    const num = results[id];
    const denom = Object.values(results).reduce((accu, curr) => accu + curr, 0);
    return `${Math.round(num / denom * 100)} %`;
  }

  const hasAnswered = !!answerId;

  const fetchPoll = async () => {
    const fetchedPoll = await getPoll();
    setPoll(fetchedPoll);
  }

  const onAnswer = async (id) => {
    if (!hasAnswered) {
      setAnswerId(id);
      const pollAnswers = await voteForPoll(id);
      setResults(pollAnswers);
    }
  }

  useEffect(() => {
    fetchPoll();
  }, []);

  const onInfoClick = (id) => {
    setInfoStates({ ...infoStates, [id]: !infoStates[id] })
  }

  return (
    poll ? 
    <Container>
      <Title>{poll.title}</Title>
      {poll.answers.map(answer => (
        <LineContainer key={`answer-${answer.id}`}>
          <AnswerContainer
            onClick={() => onAnswer(answer.id)}
            isAnswer={answerId ? answerId === answer.id : null}>
            <AnswerLabel>{answer.title}</AnswerLabel>
            <Spacer />
            {results ? <AnswerLabel>{getPercentage(answer.id)}</AnswerLabel> : null}
          </AnswerContainer>
          <InfoButton onClick={() => onInfoClick(answer.id)} selected={infoStates[answer.id]}>
            <InfoButtonLabel>i</InfoButtonLabel>
          </InfoButton>
        </LineContainer>
      ))}
      {poll.answers.map(answer => (
        <div key={`info-${answer.id}`}>{infoStates[answer.id] && <MovieDetails movieId={answer.id} />}</div>
      ))}
    </Container> :
    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
  )
}
