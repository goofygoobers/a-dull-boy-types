import React, { useContext } from 'react';
import {TimerContext } from '../../context/timerContext';
import { InitialModeContext } from '../../context//initialModeContext';

const TimeButton = () => { 

  const [counter, setCounter] = useContext(TimerContext);
  const [isStarted, setIsStarted] = useContext(InitialModeContext);

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