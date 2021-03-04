import React, { useContext } from 'react';
import {TimerContext } from '../../context/timerContext';
import { InitialModeContext } from '../../context//initialModeContext';

const TimeButton = () => { 

  const [counter, setCounter] = useContext(TimerContext);
  const [isStarted, setIsStarted] = useContext(InitialModeContext);

  function changeTestTime() { 
    console.log("changing test timer")
    setIsStarted("CHANGE")
  }

  return(
    <button onClick={() => changeTestTime()}>
      15
    </button>
  )
}

export default TimeButton;