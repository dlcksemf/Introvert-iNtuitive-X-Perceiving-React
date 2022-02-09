import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'base/ErrorBoundary';
import { AuthProvider } from 'base/hooks/Authcontext';
import { RenderProvider } from 'base/hooks/RenderContext';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RenderProvider>
            <App />
          </RenderProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
