import React, { createContext, useState } from 'react'; 

export const TimerHiddenContext = createContext(); 

export const TimerHiddenProvider = props => {
  const [timerHidden, setTimerHidden] = useState(false); 

  return(
    <TimerHiddenContext.Provider value={[timerHidden, setTimerHidden]}>
      {props.children}
    </TimerHiddenContext.Provider>
  )
}

