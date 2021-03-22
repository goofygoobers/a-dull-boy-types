import React from 'react'; 
import { FontSizeButton } from '../../components/fontSizeButton/fontSizeButton.component';
import { FontFamilyButton } from '../../components/fontFamilyButton/fontFamilyButton.component';
import { StyledSectionTitle } from './configpage.styled';
import { StyledPageTitle } from './configpage.styled';

function ConfigPage(){

  return(
    <div>
      <StyledPageTitle>
        Configuration
      </StyledPageTitle>
       
      <StyledSectionTitle>
        Font Family 
        <FontFamilyButton />  
        Font Size
        <FontSizeButton/>
        Timer
        
      </StyledSectionTitle>
   
       

      
    </div>
  )
}

export default ConfigPage; 