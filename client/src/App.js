import React, { useEffect } from 'react';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CContainer } from '@coreui/react';
import NavBar from './components/NavBar';
//import LoginButton from './components/LoginButton/LoginButton';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './store/authSlice';

function App({ keycloak }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch=useDispatch();
    const user = useSelector((state) => state.auth.user); 

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

    //var {family_name,given_name,preffered_username,email,sub}=(keycloak.tokenParsed);
    //var t={family_name,given_name,preffered_username,email,sub};

    var t = (({ family_name, given_name, preferred_username, email, sub }) => ({ family_name, given_name, preferred_username, email, sub }))(keycloak.tokenParsed);


    dispatch(setUser(t));
    console.log(t)
    //console.log(useSelector((state) => state.auth.user));
    // Cleanup on component unmount
    return () => clearInterval(refreshInterval);
  }, [keycloak, isAuthenticated, dispatch]); // Only re-run if keycloak instance or isAuthenticated changes

      useEffect(() => {
        // This useEffect listens for changes in the user state
        // and logs the user state when it updates.
        if (user) { // Check if the user object is not null
            console.log('Updated user state:', user);
        }
    }, [user]); // Dependency array includes user, so this runs when user changes

  return (
    <CContainer fluid className="mainContainer">
      <NavBar>
      </ NavBar>
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

