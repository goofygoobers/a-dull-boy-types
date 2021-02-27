import React, { createContext, useState } from 'react';
import { generateWord } from '../components/wordGenerator/wordGenerator.component'

export const WordContext = createContext();

export const WordProvider = props => {
  const [initialValue, setInitialValue] = useState(generateWord);
  console.log("wordcontext", initialValue)

  return(
    <WordContext.Provider value={[initialValue, setInitialValue]}>
      {props.children}
    </WordContext.Provider>
  );
};