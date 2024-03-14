import React, { useState } from 'react';
import PastRidesTable from "./PastRides/PastRidesTable"
import PastRidesDetails from "./PastRides/PastRidesDetails"
//import axios from "axios";

// Import necessary components and hooks from react-router-dom
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavItem, CNavbarNav} from '@coreui/react';
import Profile from './Profile';
import userProfile from './john_doe.jpeg';

import ReserveARide from './reservearide';


// login button 
import JoinARide from './JoinARide/JoinARide';
import Confirmation from './Confirmation/Confirmation';


const Pricing = () => <div>Pricing</div>;

// -------------------------------------------------------

function NavBar() {
  const [visible, setVisible] = useState(false);

  return (
    <Router>
      <>
        <CNavbar expand="lg" colorScheme="light" className="bg-light">
          <CContainer fluid>
            <CNavbarBrand href="#">CAR SHARING APP</CNavbarBrand>
            <CNavbarToggler
              aria-label="Toggle navigation"
              aria-expanded={visible}
              onClick={() => setVisible(!visible)}
            />
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav>
                <CNavItem>
                  <NavLink to="/reserve-a-ride" className="nav-link" activeClassName="active">
                    Reserve a Ride
                  </NavLink>
                </CNavItem>
                <CNavItem>
                  <NavLink to="/join-a-ride" className="nav-link">
                    Join a Ride
                  </NavLink>
                </CNavItem>
                <CNavItem>
                  <NavLink to="/pricing" className="nav-link">
                    Pricing
                  </NavLink>
                </CNavItem>
                <CNavItem>
                  <NavLink to="/past-rides-table" className="nav-link" disabled>
                    Past Rides
                  </NavLink>
                </CNavItem>
              </CNavbarNav>
          <CNavbarNav className="ms-auto">
            <CNavItem>
              <NavLink to="/profile" className="nav-link">
                <img
                  src={userProfile}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
              </NavLink>
            </CNavItem>
          </CNavbarNav>
            </CCollapse>                                                                                                                                                                      
          </CContainer>
        </CNavbar>


        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<JoinARide />} />
          <Route path="/reserve-a-ride" element={<ReserveARide />} />
          {/* is loading missing */}
          <Route path="/join-a-ride" element={<JoinARide/>} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/past-rides-table" element={<PastRidesTable />} />
          <Route path="/past-rides-details" element={<PastRidesDetails />} />
          <Route path="/confirm-joining/:id/:type" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h4 className='error'> Page not existent </h4>} />
        </Routes>
      </>
    </Router>
  );
}

export default NavBar;
