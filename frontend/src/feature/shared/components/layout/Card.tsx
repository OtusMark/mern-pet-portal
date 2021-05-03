import styled from "styled-components/macro";

export const Card = styled.div`
  
  display: flex;
  
  flex: 0 1 30rem;
  align-items: center;
  
  padding: 2rem;
  
  border: 1px solid ${({theme}) => theme.color.grey["100"] };
  box-shadow: ${({theme}) => theme.shadow["1"]};
  border-radius: 10px;
`