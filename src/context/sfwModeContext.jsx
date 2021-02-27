import React, { createContext, useState } from 'react'; 

export const SfwModeContext = createContext(); 

export const SfwModeProvider = props => {
  const [sfwMode, setSfwMode] = useState(true); 

  return(
    <SfwModeContext.Provider value={[sfwMode, setSfwMode]}>
      {props.children}
    </SfwModeContext.Provider>
  )
}