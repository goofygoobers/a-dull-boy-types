import React, { useState, useContext } from "react";
import '../../App.css';
import { InitialStateContext } from '../../context/initialStateContext';
import Timer from '../../components/timer/timer.component';
import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';
import useKeyPress from '../../hooks/useKeyPress';
import { currentTime } from '../../utils/time';
import { TimerContext } from "../../context/timerContext";
import { InitialModeContext } from '../../context/initialModeContext';

function HomePage() {

  const {state, dispatch} = useContext(InitialStateContext); 

//tracking 

  const [isStarted, setIsStarted] = useContext(InitialModeContext);

  //Time counter context 
  const [counter, setCounter] = useContext(TimerContext);

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
  const [currentChar, setCurrentChar] = useState(state.initialValue.charAt(0)); 
  //string of words/characters excluding the first character 
  const [incomingChars, setIncomingChars] = useState(state.initialValue.substr(1)); 

  function changeNSFWMode(event) {
    dispatch({type: 'NSFW'})
    setIncomingChars(state.initialValue.substr(1))
    setCurrentChar(state.initialValue.charAt(0))
    setOutgoingChars('')
    setIsStarted("redo")
    event.target.blur()
  }

  function changeNormalMode(event) {
    dispatch({type: 'REDO'})
    setIncomingChars(state.initialValue.substr(1))
    setCurrentChar(state.initialValue.charAt(0))
    setOutgoingChars('')
    setIsStarted("redo")
    event.target.blur()
  }

  useKeyPress(key => {
    console.log("state of counter", state.isStarted)
    if (state.isStarted === false) {
      state.isStarted = true;
    }

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
        if (state.sfwMode === true){
          updatedIncomingChars += ' ' + generateWord();
        } 
        else if(state.sfwMode === false) {
            updatedIncomingChars += ' ' + generateNaughtyWord();
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
      <div className="Character">
      <h2>{state.title}</h2>
      <Timer />
      <span className="Character-out"> 
        {(leftPadding + outgoingChars).slice(-20)}
      </span>
      <span className="Character-current">{currentChar}</span>
      <span>{incomingChars.substr(0,20)}</span>
      </div>
    <h3 className="Character"> 
      WPM: {wpm} | Accuracy: {accuracy}%
    </h3>
    <span>
      <button onClick={changeNSFWMode} tabIndex="-1">NSFW Mode</button>
      <button onClick={changeNormalMode}>REDO</button>
    </span>
  </div>

  );
};

export default HomePage;