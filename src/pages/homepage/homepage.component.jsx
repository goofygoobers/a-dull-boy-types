import React, { useState, useContext, useEffect } from "react";
import '../../App.css';
import { InitialStateContext } from '../../context/initialStateContext';
import Timer from '../../components/timer/timer.component';
import { generateWord } from '../../components/wordGenerator/wordGenerator.component';
import { generateNaughtyWord } from '../../components/wordGenerator/badWordGenerator.component';
import useKeyPress from '../../hooks/useKeyPress';
import { currentTime } from '../../utils/time';
import { TimerContext } from "../../context/timerContext";
import { InitialModeContext } from '../../context/initialModeContext';
import { WpmContext } from '../../context/wpmContext';
import { AccuracyContext } from '../../context/accuracyContext';
import { FontSizeContext } from '../../context/fontSizeContext';
import { FontFamilyContext } from '../../context/fontFamilyContext';
import TimeButton from '../../components/timeButton/timeButton.component';
import { ResultModal } from '../../components/modal/resultModal.component';
import { StyledCharacter } from '../../pages/homepage/homepage.styled';


function HomePage() {

  //modal state
  const [showModal, setShowModal] = useState(false);

  //overall global state 
  const {state, dispatch} = useContext(InitialStateContext); 

  //font size context
  const [fontSize, setFontSize] = useContext(FontSizeContext); //eslint-disable-line no-unused-vars

  //family font
  const [fontFamily, setFontFamily] = useContext(FontFamilyContext); //eslint-disable-line no-unused-vars

  const [isStarted, setIsStarted] = useContext(InitialModeContext); //eslint-disable-line no-unused-vars

  //Time counter context 
  const [counter, setCounter] = useContext(TimerContext); //eslint-disable-line no-unused-vars

  //tracking typing accuracy
  const [accuracy, setAccuracy] = useContext(AccuracyContext);
  const [typedChars, setTypedChars] = useState('');

  //tracking WPM, word count, time
  const [startTime, setStartTime] = useState(); 
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useContext(WpmContext); 

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
    setWordCount(0)
    setWpm(0)
    setAccuracy(0)
    setTypedChars('')
    setStartTime();
    event.target.blur()
  }

  useEffect(() => {
    if (counter === 0){
      setShowModal(prev => !prev);
      console.log("showing modal!")
    }
    else {
      console.log("timer counter is NOT zero")
    }
  }, [counter])

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
    console.log("updatedIncomingChars", updatedIncomingChars);

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
      <StyledCharacter fontFamily ={fontFamily} fontSize={fontSize}>
        <h2>{state.title}</h2>
        <Timer />
        <span className="Character-out"> 
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span className="Character-current">{currentChar}</span>
        <span>{incomingChars.substr(0,20)}</span>
        <h3 className="Character"> 
          WPM: {wpm} | Accuracy: {accuracy}%
        </h3>
      </StyledCharacter>
      
    <span>
      <button onClick={changeNSFWMode} tabIndex="-1">NSFW Mode</button>
      <button onClick={changeNormalMode}>REDO</button>
      <TimeButton />
    </span>
    {/* <StyledContainer> */}
      {/* <StyledButton onClick={openModal}>I'm a Modal</StyledButton> */}
    <ResultModal showModal={showModal} setShowModal={setShowModal} />
    {/* </StyledContainer> */}
  </div>

  );
};

export default HomePage;