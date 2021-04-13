import './App.css';
import Layout from './components/Layout';
import TopicContextProvider from './contexts/TopicContext'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { cyan } from '@material-ui/core/colors'

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
          <Layout />
        </TopicContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
