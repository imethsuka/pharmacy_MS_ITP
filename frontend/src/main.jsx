import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import App1 from './App1.jsx'; // Commented out unused import
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </BrowserRouter>
);

// Previous code was using App1 which doesn't have all the routes defined
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <SnackbarProvider>
//         <App />
//       </SnackbarProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );