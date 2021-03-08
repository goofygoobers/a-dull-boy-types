import React, { createContext, useState } from 'react'

export const AccuracyContext = createContext();

export const AccuracyProvider = props => {
  const [accuracy, setAccuracy] = useState(0);

  return(
    <AccuracyContext.Provider value={[accuracy, setAccuracy]}>
      {props.children}
    </AccuracyContext.Provider>
  )
}