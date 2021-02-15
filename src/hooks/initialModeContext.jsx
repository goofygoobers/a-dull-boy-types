import React, { createContext, useState, useContext } from 'react';

const InitialModeContext = createContext()
const InitialModeUpdateContext = createContext()

export function useModeContext() {
  return useContext(InitialModeContext)
}

export function useModeContextUpdate() {
  return useContext(InitialModeUpdateContext)
}

export function InitialModeProvider({children}) {
  const [initialMode, setInitialMode] = useState(true)
  console.log("initialModeContext ", initialMode)

  function toggleMode() { 
    setInitialMode(prevInitialMode => !prevInitialMode)
  }

  return  (
    <InitialModeContext.Provider value={initialMode}>
      <InitialModeUpdateContext.Provider value={toggleMode}>
        {children}
      </InitialModeUpdateContext.Provider>
    </InitialModeContext.Provider>
  )
}