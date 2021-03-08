import React from "react";
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
import { InitialModeProvider } from './context/initialModeContext';
import { SfwModeProvider } from './context/sfwModeContext';
import { WordProvider } from './context/wordContext';
import { InitialStateProvider } from './context/initialStateContext';
import { TimerProvider } from './context/timerContext';
import { WpmProvider } from './context/wpmContext';
import { AccuracyProvider } from './context/accuracyContext';
import { GlobalStyle } from '../src/globalStyles';

export default function App() {

  return (
    <Router>
      <GlobalStyle/>
      <div className="App">
        <div>
          <nav>
            <ul>
              <li>
                <StyledLink to="/" tabIndex="-1">Home </StyledLink>
              </li>
              <li>
                <StyledLink to="/account" tabIndex="-1">Account </StyledLink>
              </li>
              <li>
                <StyledLink to="/config" tabIndex="-1">Config </StyledLink>
              </li>
              <li>
                <StyledLink to="/leaderboard" tabIndex="-1">Leaderboard </StyledLink>
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
        <AccuracyProvider>
          <WpmProvider>
            <TimerProvider>
              <InitialStateProvider>
                  <WordProvider>
                    <SfwModeProvider>
                      <InitialModeProvider>
                          <Route path="/">
                            <HomePage />
                          </Route>
                    </InitialModeProvider>
                    </SfwModeProvider>
                  </WordProvider>
                </InitialStateProvider>
            </TimerProvider>
          </WpmProvider>
        </AccuracyProvider>

        </Switch>
      </div>
    </Router>
  );
}
