import { useState, useEffect } from 'react'; 

const useKeyPress = ass => {

  /* 
  useState hook is used here so whenever the user pressed a key, we will trigger the setter function, 'setKeyPressed'
  we will also track the current key being pressed by storing it in, 'keyPressed'
  */

  const [keyPressed, setKeyPressed] = useState()

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
        setKeyPressed(key);
        ass && ass(key)
      }
    };

    const upHandler = () => {
      setKeyPressed(null); 
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