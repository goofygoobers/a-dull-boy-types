import { useState, useEffect, useContext } from 'react'; 
import { InitialModeContext } from '../context/initialModeContext';

const useKeyPress = callback => {
  var tabPressed = false
  var enterPressed = false

  /* 
  useState hook is used here so whenever the user pressed a key, we will trigger the setter function, 'setKeyPressed'
  we will also track the current key being pressed by storing it in, 'keyPressed'
  */

  const [keyPressed, setKeyPressed] = useState();
  const [isStarted, setIsStarted] = useContext(InitialModeContext); 

  useEffect(() => {
    const downHandler = ({ key }) => {

      /* 
      console.log(key.length)
      The way we can differentiate an 'alphabet or numeric button' press vs 'shift, ctrl, enter etc.' 
      is by tracking the key.length value. 
      Alphabet and numeric buttons will output key.length values == 1
      Compared to ctrl, shift etc => 1
      */
      if (keyPressed !== key && key.length ===1){
        // console.log(key, key.length)
        setIsStarted(true); 
        setKeyPressed(key);
        callback && callback(key)
      }
      
      if (key === 'Tab') {
        tabPressed = true;
        console.log('tabPressed', tabPressed)
      }
      if (key === 'Enter'){
        enterPressed = true;
        console.log('enterPressed', enterPressed)
      }

      if (tabPressed === true && enterPressed === true){
        console.log('both tab and enter key pressed')
      }
    };

    const upHandler = ({key}) => {
      setKeyPressed(null); 
      if (key === 'Tab') {
        tabPressed = false;
      }
      if (key === 'Enter'){
        enterPressed = false;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    /* 
    in the return statement we want to add the removeEventListener function 
    to ensure that anytime an EventListener is added, it is also removed to 
    avoid slowing down the app.  
    */
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress; 