import React, { useState, useEffect, useContext } from 'react'; 
import { InitialModeContext } from '../../context/initialModeContext';
import { InitialStateContext } from '../../context/initialStateContext';

const Timer = () => {

  const {state, dispatch} = useContext(InitialStateContext)

  const [counter, setCounter] = useState('60');
  const [isStarted, setIsStarted] = useContext(InitialModeContext);

  useEffect(() => {

    if (isStarted === true ){
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, isStarted]);

  return(
    <div> 
      <h1> {counter} </h1>
    </div>
  )
}

export default Timer;