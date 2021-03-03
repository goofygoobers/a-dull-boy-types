import React, { useState, createContext } from 'react';

export const TimerContext = createContext();

export const TimerProvider = props => { 
  const [counter, setCounter] = useState('60');

  return(
    <TimerContext.Provider value={[counter, setCounter]}>
      {props.children}
    </TimerContext.Provider>
  );
};

