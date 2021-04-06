import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Streams from './components/Streams';
import Logs from './components/Logs';
import Home from './components/Home';
import io from 'socket.io-client'


function App() {
  const [showConnect, setShowConnect] = useState(false)
  const [showButton, setShowButton] = useState(true)
  // Topics Streams
  const [topicOne, setTopicOne] = useState([])
  const [topicTwo, setTopicTwo] = useState([])
  const [topicThree, setTopicThree] = useState([])
  const [topicFour, setTopicFour] = useState([])
  const [topicFive, setTopicFive] = useState([])

  const handleConnect = () => {
    const socket = io('http://localhost:5000')
    socket.on("connect", () => {
      setShowButton(false)
      setShowConnect(true)
    });
    socket.on('greeting', (data) => {
      console.log('Greeting: ', data);
    });
    socket.on('data', (data) => {
      console.log('Data: ', data);
      getStreamData(data);
    });
    socket.on("disconnect", () => {
      console.log('Disconnected');
      setShowButton(true)
      setShowConnect(false)
    });
  }

  const getStreamData = (data) => {
    switch (data.topic) {
      case 'StreamOne':
        setTopicOne(prevItems => [...prevItems, data])
        break;
      case 'StreamTwo':
        setTopicTwo(prevItems => [...prevItems, data])
        break;
      case 'StreamThree':
        setTopicThree(prevItems => [...prevItems, data])
        break;
      case 'StreamFour':
        setTopicFour(prevItems => [...prevItems, data])
        break;
      case 'StreamFive':
        setTopicFive(prevItems => [...prevItems, data])
        break;
      default:
        console.log('Topic Not Recognized');
    }
  }

  return (
    <div className="App">
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
              <Streams showConnect={showConnect} showButton={showButton} handleConnect={handleConnect} topicOne={topicOne} topicTwo={topicTwo} topicThree={topicThree} topicFour={topicFour} topicFive={topicFive} />
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

    </div>
  );
}

export default App;
