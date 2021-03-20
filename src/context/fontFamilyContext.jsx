import React, { createContext, useState } from 'react'; 

export const FontFamilyContext = createContext();

export const FontFamilyProvider = props => {
  const [fontFamily, setFontFamily] = useState('monospace')

  return(
    <FontFamilyContext.Provider value={[fontFamily, setFontFamily]}>
      {props.children}
    </FontFamilyContext.Provider>
  )
}

