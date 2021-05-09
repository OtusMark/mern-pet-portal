import styled from "styled-components/macro";

export const Card = styled.div`
  padding: 2rem;

  background-color: ${({theme}) => theme.color.white};

  border: 1px solid ${({theme}) => theme.color.grey["100"]};
  box-shadow: ${({theme}) => theme.shadow["1"]};
  border-radius: 10px;
`