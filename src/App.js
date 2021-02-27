import React, { useState } from "react";
import './App.css';

import { StyledLink } from './pages/homepage/homepage.styled';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import AccountPage from './pages/account/account.component';
import ConfigPage from './pages/config/configpage.component';
import LeaderboardPage from './pages/leaderboard/leaderboardpage.component';
import { InitialWordContext } from './hooks/initialWordContext';
import { NsfwModeContext } from './hooks/nsfwModeContext';
import { InitialModeProvider } from './context/initialModeContext';
import { SfwModeProvider } from './context/sfwModeContext';
import { WordProvider } from './context/wordContext';

import { generateWord } from './components/wordGenerator/wordGenerator.component';
export default function App() {

  // const [initialMode, setInitialMode] = useState(true); 
  // const [initialValue, setInitialValue] = useState(generateWord());

  return (
    <Router>
      <div className="App">
        <div>
          <nav>
            <ul>
              <li>
                <StyledLink to="/">Home</StyledLink>
              </li>
              <li>
                <StyledLink to="/account">Account</StyledLink>
              </li>
              <li>
                <StyledLink to="/config">Config</StyledLink>
              </li>
              <li>
                <StyledLink to="/leaderboard">Leaderboard</StyledLink>
              </li>
            </ul>
          </nav>
        </div>
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
          <WordProvider>
            <SfwModeProvider>
              <InitialModeProvider>
              {/* <NsfwModeContext.Provider value={{ initialMode, setInitialMode }}> */}
                {/* <InitialWordContext.Provider value={{ initialValue, setInitialValue }}> */}
                  <Route path="/">
                    <HomePage />
                  </Route>
                {/* </InitialWordContext.Provider> */}
              {/* </NsfwModeContext.Provider> */}
            </InitialModeProvider>
            </SfwModeProvider>
          </WordProvider>
        </Switch>
      </div>
    </Router>
  );
}
