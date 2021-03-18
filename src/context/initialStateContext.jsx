import React, { createContext, useReducer } from 'react'; 
import { generateNaughtyWord } from '../components/wordGenerator/badWordGenerator.component';
import { generateWord } from '../components/wordGenerator/wordGenerator.component';
import { currentTime } from '../utils/time';

const initialState = {
  title: "Keyboard Warriors",
  wordCount: 0, 
  sfwMode: true, 
  initialValue: generateWord(), 
  accuracy: 0, 
  typedChars: '', 
  startTime: currentTime(),
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
      };
    case "NSFW": 
      return {
        ...state,
        title: "NSFW Mode",
        sfwMode: false,
        wordCount: 0, 
        accuracy: 0, 
        typedChars: '', 
        initialValue: generateNaughtyWord(),
      }
    case "CHANGE":
      return {
        ...state,
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