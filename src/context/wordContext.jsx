import React, { createContext, useState } from 'react';
import { generateWord } from '../components/wordGenerator/wordGenerator.component'

const warningObject = {
  get foo() {
    throw new Error('You probably forgot to put <MyProvider>.');
  },
};

export const WordContext = createContext(warningObject);

export const WordProvider = props => {
  const [initialValue, setInitialValue] = useState(generateWord);
  console.log("wordcontext", initialValue)

  return(
    <WordContext.Provider value={[initialValue, setInitialValue]}>
      {props.children}
    </WordContext.Provider>
  );
};