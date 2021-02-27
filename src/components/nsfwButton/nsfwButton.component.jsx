import React, { useRef, useEffect, useState, useContext } from 'react'; 
import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';
import { WordContext } from '../../context/wordContext';
import { SfwModeContext } from '../../context/sfwModeContext';

const NsfwButton = () => { 

  // const [sfwMode, setSfwMode] = useState(false); 
  const [sfwMode, setSfwMode] = useContext(SfwModeContext); 
  const [initialValue, setInitialValue] = useContext(WordContext);
  // var initialWord = useRef('')
  
  useEffect(() => {

    if (sfwMode === true){
      setInitialValue = generateWord();
      // initialWord.current= generateWord();
      // console.log("111safe words = ", initialWord.current)
      // console.log("111safe word type", typeof initialWord.current)
      // console.log("111charAt test: ", initialWord.charAt(0))

    }
    else {
      setInitialValue= generateNaughtyWord();

      // console.log("222bad words = ", initialWord.current)
      // console.log("222bad word type", typeof initialWord.current)
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
        <h2 style={{backgroundColor: "yellow", color: "black"}}> {initialValue} </h2>
      </div>
    </div>

  )
};

export default NsfwButton; 

