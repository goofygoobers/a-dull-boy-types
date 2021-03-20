import React, { useContext } from 'react';

import { InitialModeContext } from '../../context//initialModeContext';

const TimeButton = () => { 

  const [isStarted, setIsStarted] = useContext(InitialModeContext); //eslint-disable-line no-unused-vars

  function changeTestTime(event) { 
    setIsStarted("CHANGE")
    event.target.blur()
  }

  return(
    <button onClick={changeTestTime} tabIndex="-1">
      15
    </button>
  )
}

export default TimeButton;