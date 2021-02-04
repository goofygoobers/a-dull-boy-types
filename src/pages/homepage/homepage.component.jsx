import React, { useState } from "react";
import '../../App.css';

import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import useKeyPress from '../../hooks/useKeyPress';

const initialWords = generateWord();

function HomePage() {

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );

  const [outgoingChars, setOutgoingChars] = useState(''); 
  //first letter of the first word
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0)); 
  //string of words/characters excluding the first character 
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1)); 

  useKeyPress(key => {
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
    }
  });
  
  return (
    
    <p className="Character">
      <h2>Keyboard Warriors</h2>
    <span className="Character-out"> 
      {(leftPadding + outgoingChars).slice(-20)}
    </span>
    <span className="Character-current">{currentChar}</span>
    <span>{incomingChars.substr(0,20)}</span>
  </p>
  );
};

export default HomePage;