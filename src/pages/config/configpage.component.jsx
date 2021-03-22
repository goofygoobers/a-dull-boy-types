import React from 'react'; 
import { FontSizeButton } from '../../components/fontSizeButton/fontSizeButton.component';
import { FontFamilyButton } from '../../components/fontFamilyButton/fontFamilyButton.component';
import { StyledSectionTitle } from './configpage.styled';

function ConfigPage(){

  return(
    <div>
      <StyledSectionTitle>
      <h1>Configuration</h1>
      Font Family 
      <FontFamilyButton /> 
      Font Size
      <FontSizeButton/>
      </StyledSectionTitle>
    </div>
  )
}

export default ConfigPage; 