import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './components/Theme/ThemeContext';
import Background from './components/Theme/Background';
import { LoggedInStateProvider } from './services/state.service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LoggedInStateProvider>
    <ThemeProvider>
      <Background>
        <App />
      </Background>
    </ThemeProvider>
  </LoggedInStateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
