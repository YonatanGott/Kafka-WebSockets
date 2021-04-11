import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Streams from './components/Streams';
import Logs from './components/Logs';
import Home from './components/Home';
import TopicContextProvider from './contexts/TopicContext'


function App() {

  return (
    <div className="App">
      <TopicContextProvider>
        <Router>
          <div>
            <nav className="navbar blue-grey lighten-2">
              <ul className="nav-list center-align">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Streams">Streams</Link>
                </li>
                <li>
                  <Link to="/Logs">Logs</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/Streams">
                <Streams />
              </Route>
              <Route path="/Logs">
                <Logs />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </TopicContextProvider>
    </div>
  );
}

export default App;
