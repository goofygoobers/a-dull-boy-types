import React, { useState, useContext } from "react";
import '../../App.css';

import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';
import useKeyPress from '../../hooks/useKeyPress';
// import NsfwButton from '../../components/nsfwButton/nsfwButton.component';
// import  RedoButton  from '../../components/redoButton/redoButton.component';
import { currentTime } from '../../utils/time';
import { InitialWordContext } from '../../hooks/initialWordContext';

import Timer from '../../components/timer/timer.component';

function HomePage() {

  //NSFW Mode
  const [sfwMode, setSfwMode] = useState(true); 
  console.log("what mode are we in??", sfwMode)

  //initial words
  var {initialValue, setInitialValue} = useContext(InitialWordContext)
  console.log("initialValuehomepage:", initialValue)

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

  const [outgoingChars, setOutgoingChars] = useState(''); 
  //first letter of the first word
  const [currentChar, setCurrentChar] = useState(initialValue.charAt(0)); 
  //string of words/characters excluding the first character 
  const [incomingChars, setIncomingChars] = useState(initialValue.substr(1)); 

  function resetApp() {
    console.log("resetting app");
    setInitialValue(generateWord());
    setOutgoingChars('');
    setCurrentChar(initialValue.charAt(0));
    setIncomingChars(initialValue.substr(1));
  }


  function changeTypingMode(event) { 
    setSfwMode(!sfwMode)

    if (sfwMode === true){
      setInitialValue(generateNaughtyWord());
      setTitle("Toxic Warriors");
      setIncomingChars(initialValue.substr(1))
      console.log("sfwMode111true new intialvalue", initialValue)
      setCurrentChar(initialValue.charAt(0))
      event.target.blur(); 
    }
    else if (sfwMode === false){
      setInitialValue(generateWord());
      setTitle("Keyboard Warriors");
      setIncomingChars(initialValue.substr(1))
      console.log("sfwMode111false new intialvalue", initialValue)
      setCurrentChar(initialValue.charAt(0))
      event.target.blur(); 
    }

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
      if (updatedIncomingChars.split('').length < 20) {
        if (sfwMode === true){
          updatedIncomingChars += ' ' + generateWord();
          console.log("Geneartion - what mode are we in? ", sfwMode)
          console.log("generating good words!!!")
        } 
        else if(sfwMode === false) {
            updatedIncomingChars += ' ' + generateNaughtyWord();
            console.log("Generation - what mode are we in? ", sfwMode)
            console.log("generating BAD words!!")
        }
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
      <h2>Keyboard Warriors</h2>
      <Timer />
      <span className="Character-out"> 
        {(leftPadding + outgoingChars).slice(-20)}
      </span>
      <span className="Character-current">{currentChar}</span>
      <span>{incomingChars.substr(0,20)}</span>
      </p>
    <h3 className="Character"> 
      WPM: {wpm} | Accuracy: {accuracy}%
    </h3>
    <span>
      <button onClick={changeTypingMode}>FORTNITE Mode</button>
    </span>
    {/* <span>
      <RedoButton onClick={resetApp}/>
    </span> */}
    {/* <div> 
      {initialValue}
    </div> */}
  </div>

  );
};

export default HomePage;