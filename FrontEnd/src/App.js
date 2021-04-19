import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import TopicContextProvider from './contexts/TopicContext'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { cyan } from '@material-ui/core/colors'
import Home from './components/Home';
import GameLogs from './components/GameLogs';
import Analytics from './components/Analytics';
import Graphs from './components/Graphs';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: {
      main: '#2F4F4F'
    },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopicContextProvider>
          <Router>
            <Layout >
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/gameLogs">
                  <GameLogs />
                </Route>
                <Route path="/analytics">
                  <Analytics />
                </Route>
                <Route path="/graphs">
                  <Graphs />
                </Route>
              </Switch>
            </Layout >
          </Router>
        </TopicContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
