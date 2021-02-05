import React, { useRef, useEffect, useState } from 'react'; 
import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';

const NsfwButton = () => { 

  const [nsfwMode, setNsfwMode] = useState(false); 
  // const [initialWord] = useRef('');
  // var initialWord = [];
  var initialWord = useRef([])
  

  useEffect(() => {
    console.log("nsfwMode changed")

    if (nsfwMode === true){
      initialWord.current = generateNaughtyWord();
      console.log("bad words = ", initialWord)

    }
    else {
      initialWord.current = generateWord();

      console.log("good words = ", initialWord)
    }
  }, [nsfwMode])

  // var initialWord = [];
  // console.log(buttonPressed)

  function changeTypingMode() { 
    setNsfwMode(!nsfwMode)
    console.log('nsfw mode: ',nsfwMode)
  }
    //use effect 
    
  console.log("why are you empty", initialWord)
  // console.log(initialWord)

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

