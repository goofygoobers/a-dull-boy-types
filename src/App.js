import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import AccountPage from './pages/account/account.component';
import ConfigPage from './pages/config/configpage.component';
import LeaderboardPage from './pages/leaderboard/leaderboardpage.component';

import { generateWord } from './components/wordGenerator/wordGenerator.component';
import useKeyPress from './hooks/useKeyPress';

// const naughtyWords = require("naughty-words");
// console.log(typeof naughtyWords)
// console.log(naughtyWords.en);
// console.log('test', Object.keys(naughtyWords).length)

// function generateNaughtyWords(naughtyWords, max, min) { 
//   // console.log(Math.random() * ( max - min ) + min)
//     var naughtyWordsArray = naughtyWords[Math.floor(Math.random() * Object.keys(naughtyWords).length)]
//   return naughtyWordsArray
// };

// const badWords = generateNaughtyWords(naughtyWords, Object.keys(naughtyWords).length, 1);
// // console.log(badWords)

const initialWords = generateWord();
// console.log(initialWords)

export default function App() {

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );

  const [outgoingChars, setOutgoingChars] = useState(''); 
  //first letter of the first word
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0)); 
  //string of words/characters excluding the first character 
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1)); 

  useKeyPress(key => {
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
      if (updatedIncomingChars.split('').length < 10) {
        updatedIncomingChars += ' ' + generateWord();
      }
      setIncomingChars(updatedIncomingChars);
    }
  });
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/config">Config</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        
          <Route path="/leaderboard">
            <LeaderboardPage /> 
          </Route>

          <Route path="/account">
            <AccountPage />
          </Route>

          <Route path="/config">
            <ConfigPage />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
