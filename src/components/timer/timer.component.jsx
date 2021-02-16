import React, { useState, useEffect } from 'react'; 

const Timer = () => {

  const [counter, setCounter] = useState('60')

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return(
    <div> 
      <h1> {counter} </h1>
    </div>
  )
}

export default Timer;