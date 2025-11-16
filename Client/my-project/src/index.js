import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";      // ✅ Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Bootstrap JS for dropdowns
import "bootstrap-icons/font/bootstrap-icons.css";  // ✅ Bootstrap Icons
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Components/store'; // ✅ Auth Context

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
