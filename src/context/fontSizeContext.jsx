import React, { createContext, useState } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = props => { 
  const [fontSize, setFontSize] = useState('large');

return( 
  <FontSizeContext.Provider value={[fontSize, setFontSize]}>
    {props.children}
  </FontSizeContext.Provider>
  )
};

