import React, {useEffect, useState } from 'react';
import PastRides from "./past_rides/PastRides"
import axios from "axios";
// Import necessary components and hooks from react-router-dom
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavItem, CNavbarNav,CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,   CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput} from '@coreui/react';

import ReserveARide from './reservearide';

const JoinARide = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.post('http://localhost:4000/ridesDummy', {});
        const sharedRides = response.data.filter(ride => ride.status === 'Share');
        setRides(sharedRides);
      } catch (error) {
        console.error('Failed to fetch rides for sharing:', error);
      }
    };

    fetchRides();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Join a Ride</h2>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Booker</CTableHeaderCell>
            <CTableHeaderCell>Destination</CTableHeaderCell>
            <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
            <CTableHeaderCell>Battery Remaining</CTableHeaderCell>
            <CTableHeaderCell>Distance to Vehicle</CTableHeaderCell>
            <CTableHeaderCell>Departure Time</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {rides.map((ride) => (
            <CTableRow key={ride.id}>
              <CTableDataCell>{ride.booker}</CTableDataCell>
              <CTableDataCell>{ride.destination}</CTableDataCell>
              <CTableDataCell>{ride.vehicleType}</CTableDataCell>
              <CTableDataCell>{ride.battery}</CTableDataCell>
              <CTableDataCell>{ride.distanceToVehicle}</CTableDataCell>
              <CTableDataCell>{ride.departureTime}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};



const Pricing = () => <div>Pricing</div>;

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
                  <NavLink to="/past-rides" className="nav-link" disabled>
                    Past Rides
                  </NavLink>
                </CNavItem>
              </CNavbarNav>
            </CCollapse>                                                                                                                                                                      
          </CContainer>
        </CNavbar>

        {/* Define Routes */}
        <Routes>
          <Route path="/reserve-a-ride" element={<ReserveARide />} />
          <Route path="/join-a-ride" element={<JoinARide />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/past-rides" element={<PastRides />} />
        </Routes>
      </>
    </Router>
  );
}

export default NavBar;

