import React, { createContext, useReducer } from 'react'; 
import { generateNaughtyWord } from '../components/wordGenerator/badWordGenerator.component';
import { generateWord } from '../components/wordGenerator/wordGenerator.component';
import { currentTime } from '../utils/time';

var testWords = generateWord();
console.log("testword", testWords)


const initialState = {
  title: "Keyboard Warriors",
  wordCount: 0, 
  sfwMode: true, 
  initialValue: testWords, 
  accuracy: 0, 
  typedChars: '', 
  startTime: currentTime(),
  wpm: 0, 
  //currentChar
  //incomingChars
  //outgoingChars
};

const reducer = (state, action) => {
  switch(action.type) {
    case "REDO": 
      return {
        title: "Keyboard Warriors",
        wordCount: 0, 
        sfwMode: true, 
        initialValue: generateWord(), 
        accuracy: 0, 
        typedChars: '', 
        startTime: currentTime(),
        wpm: 0, 
      };
    case "NSFW": 
      return {
        ...state,
        title: "NSFW Mode",
        sfwMode: false,
        wordCount: 0, 
        accuracy: 0, 
        typedChars: '', 
        wpm: 0, 
        initialValue: generateNaughtyWord(),
      }
    default:
      return state;
  }
}

export const  InitialStateContext = createContext();

export const InitialStateProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <InitialStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </InitialStateContext.Provider>
  );
};