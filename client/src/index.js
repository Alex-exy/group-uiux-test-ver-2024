import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setAuthenticated } from './store/authSlice';
import Keycloak from 'keycloak-js';

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
      user: keycloak.tokenParsed, // or any user detail you want to store
    }));

    ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <App keycloak={keycloak}/>
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

