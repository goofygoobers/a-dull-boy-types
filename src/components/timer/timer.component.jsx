import React, { useState, useEffect, useContext } from 'react'; 
import { InitialModeContext } from '../../context/initialModeContext';
import { TimerContext } from '../../context/timerContext';


const Timer = () => {

  const [counter, setCounter] = useContext(TimerContext);
  const [isStarted, setIsStarted] = useContext(InitialModeContext);

  useEffect(() => {

    if (isStarted === true ){
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (isStarted === "redo"){
      setCounter(60);

    }
  }, [counter, isStarted, setCounter]);

  return(
    <div> 
      <h1> {counter} </h1>
    </div>
  )
}

export default Timer;