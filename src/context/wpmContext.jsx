import React, { createContext, useState } from 'react'

export const WpmContext = createContext();

export const WpmProvider = props => {
  const [wpm, setWpm] = useState(0);

  return(
    <WpmContext.Provider value={[wpm, setWpm]}>
      {props.children}
    </WpmContext.Provider>
  )
}