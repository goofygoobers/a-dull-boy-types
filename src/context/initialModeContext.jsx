import React, { useState, createContext } from 'react'; 

export const InitialModeContext = createContext();

export const InitialModeProvider = props => {
  const [isStarted, setIsStarted] = useState(false);

  return(
    <InitialModeContext.Provider value={[isStarted, setIsStarted]}>
      {props.children}
    </InitialModeContext.Provider>
  );
};

