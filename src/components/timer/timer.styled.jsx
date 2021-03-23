import styled from 'styled-components'; 

export const StyledTimer = styled.h1`
  visibility: ${({timerHidden}) => {
    if(timerHidden === false) return 'visible';
    else if(timerHidden === true) return 'hidden';
  }}
`