import React from 'react';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CContainer } from '@coreui/react';
import NavBar from './components/NavBar';

function App() {
  return (
    <CContainer fluid className="mainContainer">
      <NavBar />
    </CContainer>
  );
}

export default App;

