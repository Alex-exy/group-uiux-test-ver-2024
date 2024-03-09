import React from 'react';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import { CContainer } from '@coreui/react';
import NavBar from './components/NavBar';
import LoginButton from './components/LoginButton/LoginButton';

function App() {
  return (
    <CContainer fluid className="mainContainer">
      <NavBar>
      </ NavBar>
    </CContainer>
  );
}

export default App;
