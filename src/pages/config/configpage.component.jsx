import React from 'react'; 
import { FontSizeButton } from '../../components/fontSizeButton/fontSizeButton.component';
import { FontFamilyButton } from '../../components/fontFamilyButton/fontFamilyButton.component';

function ConfigPage(){

  return(
    <div>
      <h1>Configuration</h1>
      <h2> font family</h2>
      <FontFamilyButton /> 
      <h2>font size</h2>
      <FontSizeButton/> 

    </div>
  )
}

export default ConfigPage; 