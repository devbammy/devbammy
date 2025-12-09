import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.scss';
import App from './App.jsx';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
    <Toaster position="top-center" />
  </ThemeProvider>
);
