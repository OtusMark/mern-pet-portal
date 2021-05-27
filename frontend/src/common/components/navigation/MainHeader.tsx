import React from "react";
import styled from "styled-components/macro";

export const MainHeader: React.FC = (props) => {
    return (
        <StyledHeader>
            {props.children}
        </StyledHeader>
    )
}

// Styles
const StyledHeader = styled.header`
  position: relative;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 0 2rem;
  
  height: ${({theme}) => theme.variable.headerHeight};
`