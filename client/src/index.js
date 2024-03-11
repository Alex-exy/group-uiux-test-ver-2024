import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://sso.sexycoders.org/auth',
  realm: 'sexycoders.org',
  clientId: 'React-auth',
});

keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
  if (authenticated) {
    console.log("Authenticated");

    // Set up token refresh here, if desired

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    );

    // Refresh token periodically
    setInterval(() => {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed');
        } else {
          console.log('Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token');
      });
    }, 180000); // Refresh every 3 minutes
  } else {
    console.warn("Not authenticated");
    keycloak.login(); // Redirect to login if not authenticated
  }
}).catch((error) => {
  console.error("Keycloak init failed", error);
  // Handle initialization error
});

// Optional: Performance reporting
reportWebVitals();

