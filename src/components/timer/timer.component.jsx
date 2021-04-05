import React, { useEffect, useContext } from 'react'; 
import { InitialModeContext } from '../../context/initialModeContext';
import { TimerContext } from '../../context/timerContext'
import { StyledTimer } from '../../components/timer/timer.styled';
import { TimerHiddenContext } from '../../context/timerHiddenContext';

const Timer = () => {

  const [counter, setCounter] = useContext(TimerContext);
  const [isStarted, setIsStarted] = useContext(InitialModeContext); //eslint-disable-line no-unused-vars
  const [timerHidden, setTimerHidden] = useContext(TimerHiddenContext); //eslint-disable-line no-unused-vars

  useEffect(() => {

    if (isStarted === true ){
      var timeOutRef = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (isStarted === "redo"){
      setCounter(60);
      clearTimeout(timeOutRef);
    }
    if (isStarted === 'CHANGE'){
      setCounter(3);
      clearTimeout(timeOutRef);
    }

  }, [counter, isStarted, setCounter]);

  return(
    <div> 
      <StyledTimer timerHidden={timerHidden}>
        {counter}
      </StyledTimer>
    </div>
  )
}

export default Timer;