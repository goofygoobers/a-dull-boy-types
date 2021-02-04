const naughtyWords = require("naughty-words");
// console.log(typeof naughtyWords)
// console.log(naughtyWords.en);
// console.log('test', Object.keys(naughtyWords.en).length)

export const generateNaughtyWord = ( count = 10 ) => {
  return new Array(count)
    .fill()
    .map(_ => naughtyWords.en[Math.floor(Math.random() * Object.keys(naughtyWords).length)])
    .join(' ');
};
