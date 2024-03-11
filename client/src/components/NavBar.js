import React, {useEffect, useState } from 'react';
import PastRides from "./past_rides/PastRides"
import axios from "axios";
// Import necessary components and hooks from react-router-dom
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavItem, CNavbarNav,CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,   CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput} from '@coreui/react';

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



const ReserveARide = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedRide, setSelectedRide] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [allowJoin, setAllowJoin] = useState(false);
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.post('http://localhost:4000/ridesDummy', {});
        const freeRides = response.data.filter(ride => ride.status === 'Free');
        setVehicles(freeRides);
      } catch (error) {
        console.error('Failed to fetch rides:', error);
      }
    };

    fetchRides();
  }, []);

  const handleRowClick = (vehicle) => {
    setSelectedRide(vehicle);
    setShowModal(true);
    setModalStep(1); // Reset to the first question
  };

  const handleContinue = () => {
    setModalStep(modalStep + 1);
  };

  const handleAllowJoin = (allow) => {
    setAllowJoin(allow);
    handleContinue();
  };

  const handleSetDestinationAndTime = () => {
    handleContinue();
  };

  const handleConfirm = () => {
    const rideInfo = {
      ...selectedRide,
      destination,
      time,
      allowJoin,
    };

    // Send rideInfo to backend
    const joinFlag = allowJoin ? 1 : 0;
    axios.post('http://localhost:4000/confirmRide', { ...rideInfo, join: joinFlag })
      .then(response => {
        console.log('Ride confirmed:', response.data);
        // Handle success (e.g., show confirmation message, reset form)
      })
      .catch(error => {
        console.error('Failed to confirm ride:', error);
        // Handle error
      });

    setShowModal(false);
    // Reset state if necessary
  };

  return (
    <div>
      <h2>Reserve a Ride</h2>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Distance Available</CTableHeaderCell>
            <CTableHeaderCell>Battery Remaining</CTableHeaderCell>
            <CTableHeaderCell>Additional Info</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {vehicles.map((vehicle) => (
            <CTableRow key={vehicle.id} onClick={() => handleRowClick(vehicle)}>
              <CTableDataCell>{vehicle.type}</CTableDataCell>
              <CTableDataCell>{vehicle.distance}</CTableDataCell>
              <CTableDataCell>{vehicle.battery}</CTableDataCell>
              <CTableDataCell>{vehicle.info}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Reservation Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalStep === 1 && "Are you sure you want to reserve this ride?"}
          {modalStep === 2 && "Do you want to allow others to join your ride?"}
          {modalStep === 3 && (
            <>
              <div>Please enter your destination:</div>
              <CFormInput
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
              />
              <div>Please enter your time:</div>
              <CFormInput
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
              />
            </>
          )}
          {modalStep === 4 && `Confirm your ride to ${destination} at ${time}?`}
        </CModalBody>
        <CModalFooter>
          {modalStep < 4 && <CButton color="primary" onClick={handleContinue}>Continue</CButton>}
          {modalStep === 3 && <CButton color="primary" onClick={handleSetDestinationAndTime}>Set Destination and Time</CButton>}
          {modalStep === 4 && <CButton color="primary" onClick={handleConfirm}>Confirm</CButton>}
          <CButton color="secondary" onClick={() => setShowModal(false)}>Cancel</CButton>
        </CModalFooter>
      </CModal>
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

