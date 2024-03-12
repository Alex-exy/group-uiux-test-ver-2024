import React, { useEffect } from 'react';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CContainer } from '@coreui/react';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

function App({ keycloak }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Function to refresh the token
    const refreshToken = async () => {
      if (keycloak && isAuthenticated) {
        try {
          const refreshed = await keycloak.updateToken(70);
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
    const refreshInterval = setInterval(refreshToken, 60000); // Refresh every 1 minute as an example

    // Cleanup on component unmount
    return () => clearInterval(refreshInterval);
  }, [keycloak, isAuthenticated]); // Only re-run if keycloak instance or isAuthenticated changes



  return (
    <CContainer fluid className="mainContainer">
      <NavBar />
      {isAuthenticated ? (
        <div>Welcome to the authenticated part of the app!</div>
      ) : (
        <div>Please log in to see this content.</div>
      )}
    </CContainer>
  );
}

export default App;

