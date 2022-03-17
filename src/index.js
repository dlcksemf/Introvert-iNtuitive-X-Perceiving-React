import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'base/ErrorBoundary';
import { AuthProvider } from 'base/hooks/Authcontext';
import { RenderProvider } from 'base/hooks/RenderContext';
import { ReloadProvider } from 'base/hooks/ReloadContext';
import './static/fonts/font.css';
import 'animate.css';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RenderProvider>
            <ReloadProvider>
              <App />
            </ReloadProvider>
          </RenderProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
