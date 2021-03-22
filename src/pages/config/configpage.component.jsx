import React from 'react'; 
import { FontSizeButton } from '../../components/fontSizeButton/fontSizeButton.component';
import { FontFamilyButton } from '../../components/fontFamilyButton/fontFamilyButton.component';
import { StyledSectionTitle } from './configpage.styled';

function ConfigPage(){

  return(
    <div>
      <StyledSectionTitle>
      <h2>Configuration</h2>
      Font Family 
      <FontFamilyButton /> 
      Font Size
      <FontSizeButton/>
      </StyledSectionTitle>
    </div>
  )
}

export default ConfigPage; 