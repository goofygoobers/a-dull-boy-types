import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
  color: #7eddd3;
  font-size: 20px;
  text-decoration: none;
`;

export const StyledCharacter = styled.div`
  color: #54585c;
  background-color: #2d2e30;;
  font-family: ${({fontFamily}) => {
    if(fontFamily === 'papyrus') return 'paryrus';
    else if(fontFamily === 'helvetica') return 'helvetica';
    else return 'monospace';
  }}; 
  // font-size: 30px;
  font-size: ${({fontSize}) => {
    if(fontSize === 'small') return '20px';
    else if(fontSize === 'medium') return '30px'
    else return '40px';
  }}
`;