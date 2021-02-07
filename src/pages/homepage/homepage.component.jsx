import React, { useState, useRef, useEffect } from "react";
import '../../App.css';

import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';
import useKeyPress from '../../hooks/useKeyPress';
import NsfwButton from '../../components/nsfwButton/nsfwButton.component';
import  RedoButton  from '../../components/redoButton/redoButton.component';
import { FaRedoAlt } from 'react-icons/fa';
import { currentTime } from '../../utils/time';

// var initialWords = generateWord();
// // var initialWords = generateNaughtyWord();
// console.log("home1", initialWords)
// console.log("home1", typeof initialWords)
// console.log("home1", initialWords.charAt(0))

function HomePage() {

  var initialWords = useRef(generateWord());
  var nsfwInitialWord = useRef(generateNaughtyWord())

  var nsfwInitialWordKey = useRef('')
  var initialWordsKey = useRef('')

  initialWordsKey = initialWords.current
  nsfwInitialWordKey = nsfwInitialWord.current;

  console.log("home1", initialWordsKey)
  console.log("home1", typeof initialWordsKey)
  console.log("home1", initialWordsKey.charAt(0))

  const [title, setTitle] = useState("Keyboard Warriors")
  // console.log("title name:", title)

  //tracking typing accuracy
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  //tracking WPM, word count, time
  const [startTime, setStartTime] = useState(); 
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0); 

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );

  //NSFW Mode
  const [sfwMode, setSfwMode] = useState(false); 

  
  /* 
  LOOK INTO THIS!!!! 
  this random attempt of code to change the type of 'nsfwInitalWord' variable from 'object' type to 'string' type
  Since the 'charAt' method will complain if the 'nsfwInitialWord' variable is NOT a 'string' type. 
  Q: ASK is there a way to make this a string? I thought if you provide the string default value in 'useRef()' the variable assigned to it 
  in this scneario, 'nsfwInitialWord' would also be a string
  */

  // nsfwInitialWord = initialWords;
  console.log('HOME3 useref nsfwInitialWord value: ', nsfwInitialWord)
  console.log('HOME3 useref type: ', typeof nsfwInitialWord)

  useEffect(() => {

    if (sfwMode === true){
      
      // nsfwInitialWord.current =generateNaughtyWord();
      initialWordsKey = nsfwInitialWordKey
      console.log("69 home initialwordskey value ", initialWordsKey)
      console.log("69 home initialwordskey type ", typeof initialWordsKey)
      
    }
    else if (sfwMode === false) {

      // initialWords.current = generateWord();
      initialWordsKey = initialWords.current
      console.log("70 home initialwordskey value ", initialWordsKey)
      console.log("70 home initialwordskey type ", typeof initialWordsKey)
      
    }
  }, [sfwMode, initialWordsKey])

  console.log("71 home initialwordskey value ", initialWordsKey)

  if (nsfwInitialWord.current !== ''){
    initialWords = nsfwInitialWord;
    console.log("HOME4 updated initialWords with bad words: ", initialWords)
  }

  const [outgoingChars, setOutgoingChars] = useState(''); 
  //first letter of the first word
  const [currentChar, setCurrentChar] = useState(initialWordsKey.charAt(0)); 
  console.log("80 currentchar value: ", currentChar)
  //string of words/characters excluding the first character 
  const [incomingChars, setIncomingChars] = useState(initialWordsKey.substr(1)); 
  console.log("81 incomingchar value: ", incomingChars)

  function changeTypingMode() { 
    setSfwMode(!sfwMode)
    console.log('home sfw mode: ',sfwMode)
  }

  useKeyPress(key => {

    if (!startTime) {
      setStartTime(currentTime());
      console.log('time', currentTime());
    }

    console.log(key)
    let updatedOutgoingChars = outgoingChars; 
    let updatedIncomingChars = incomingChars; 

    //if key pressed matches the current character
    if (key === currentChar) {

      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1)); 
      }
      updatedOutgoingChars += currentChar; 
      setOutgoingChars(updatedOutgoingChars)

      //set the current character to the value of the next incoming character
      setCurrentChar(incomingChars.charAt(0)); 

      /*
      Since generateWord() method only creates 10 words per call
      In the instance, the user types too fast, we want to generate more words
      and append it to the incoming chars. 
      */
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split('').length < 10) {
        updatedIncomingChars += ' ' + generateWord();
      }
      setIncomingChars(updatedIncomingChars);
      
      /*
      if the next character is a empty space, it means the user has successfully
      typed a full word, increment the wordCount by 1 
      */
      if (incomingChars.charAt(0) === ' '){
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        console.log('minutes', durationInMinutes);
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }

      const updatedTypedChars = typedChars + key;
      setTypedChars(updatedTypedChars);
      setAccuracy(
        ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
          2,
        ),
      );
  });
  
  return (
    <div className="App">
      <p className="Character">
      <h2>{title}</h2>
      <span className="Character-out"> 
        {(leftPadding + outgoingChars).slice(-20)}
      </span>
      <span className="Character-current">{currentChar}</span>
      <span>{incomingChars.substr(0,20)}</span>
    </p>
    <h3 className="Character"> 
      WPM: {wpm} | Accuracy: {accuracy}%
    </h3>
    {/* <span>
      <NsfwButton onClick={() => setTitle('NSfW Warriors')}/>    
    </span> */}
    <span>
      <button onClick={changeTypingMode}>NSFWMODE</button>
    </span>
    {/* <span>
      <button onClick={() => setTitle('NSFW Warriors')}> titleChange </button>
    </span> */}
    <span>
      <RedoButton />
      {/* <button>
        <FaRedoAlt/>
      </button> */}
    </span>
    </div>

  );
};

export default HomePage;