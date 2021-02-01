import React from "react";
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

const initialWords = generateWord();
console.log(initialWords)

export default function App() {
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

        <h3>{initialWords}</h3>
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
