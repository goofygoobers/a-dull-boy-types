import React, { useRef, useEffect, useState } from 'react'; 
import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';

const NsfwButton = () => { 

  /*
  
  */
  const [sfwMode, setSfwMode] = useState(false); 
  var initialWord = useRef('')
  

  useEffect(() => {

    if (sfwMode === true){
      initialWord.current= generateWord();
      console.log("111safe words = ", initialWord.current)
      console.log("111safe word type", typeof initialWord.current)
      // console.log("111charAt test: ", initialWord.charAt(0))

    }
    else {
      initialWord.current =generateNaughtyWord();

      console.log("222bad words = ", initialWord.current)
      console.log("222bad word type", typeof initialWord.current)
      // console.log("222charAt test: ", initialWord.charAt(0))

    }
  }, [sfwMode])

  function changeTypingMode() { 
    setSfwMode(!sfwMode)
    console.log('sfw mode: ',sfwMode)
  }

  return(
    <div>
      <button onClick={changeTypingMode}> NSFW </button>
      <div>
        <h2 style={{backgroundColor: "yellow", color: "black"}}> {initialWord.current} </h2>
      </div>
    </div>

  )
};

export default NsfwButton; 

