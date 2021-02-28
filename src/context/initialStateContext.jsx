import React, { createContext, useReducer } from 'react'; 
import { generateWord } from '../components/wordGenerator/wordGenerator.component';
import { currentTime } from '../utils/time';

const initialState = {
  title: "Keyboard Warriors",
  wordCount: 0, 
  sfwMode: true, 
  initialValue: generateWord, 
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
        initialValue: generateWord, 
        accuracy: 0, 
        typedChars: '', 
        startTime: currentTime(),
        wpm: 0, 
      };
    case "NSFW": 
      return {
        title: "NSFW Mode",
        sfwMode: false,
      }
    default:
      return state;
  }
}

export const InitialStateContext = createContext();

export const InitialStateProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <InitialStateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </InitialStateContext.Provider>
  );
};