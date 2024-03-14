import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setAuthenticated } from './store/authSlice';
import Keycloak from 'keycloak-js';
import { setUser } from './store/authSlice';

const keycloak = new Keycloak({
  url: 'https://sso.sexycoders.org/auth',
  realm: 'UTV-SRH-2024',
  clientId: 'React-auth',
});

keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
  if (authenticated) {
    console.log("Authenticated");

    store.dispatch(setAuthenticated({
      isAuthenticated: true,
      user: keycloak.tokenParsed, 
    }));

    const refreshToken = async () => {
      if (keycloak && authenticated) {
        try {
          const refreshed = await keycloak.updateToken(70);
          console.log(refreshed);
          if (refreshed) {
            console.log('Token refreshed');
          } else {
            console.log('Token not refreshed, valid for ' + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
        } catch (error) {
          console.log('Failed to refresh token', error);
        }
      }
    };

    // Set up the token refresh to run periodically
    setInterval(refreshToken, 60000); // Refresh every 1 minute 

    var t = (({ family_name, given_name, preferred_username, email, sub }) => ({ family_name, given_name, preferred_username, email, sub }))(keycloak.tokenParsed);


    store.dispatch(setUser(t));
    console.log(t)

    ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>,
      document.getElementById('root')
    );
  } else {
    console.warn("Not authenticated");
    keycloak.login();
  }
}).catch((error) => {
  console.error("Keycloak init failed", error);
});

reportWebVitals();

