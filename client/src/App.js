import React from 'react';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CContainer } from '@coreui/react';
import NavBar from './components/NavBar';
// Import useSelector hook to access Redux store state
import { useSelector } from 'react-redux';

function App() {
  // Access isAuthenticated from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Based on isAuthenticated, you can conditionally render components or redirect
  return (
    <CContainer fluid className="mainContainer">
      <NavBar />
      {/* You can add more components here that should be rendered based on authentication */}
      {isAuthenticated ? (
        <div>Welcome to the authenticated part of the app!</div>
      ) : (
        <div>Please log in to see this content.</div>
      )}
    </CContainer>
  );
}

export default App;

