import React, { createContext } from 'react';
// import { generateWord } from '../components/wordGenerator/wordGenerator.component';

// export const InitialWordContext = createContext(generateWord());

export const InitialWordContext = createContext(null);
console.log("context999", InitialWordContext);
console.log("context999", typeof InitialWordContext);
