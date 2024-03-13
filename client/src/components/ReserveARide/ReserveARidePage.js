// ReserveARidePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';

const ReserveARidePage = () => {
  //const history = useHistory();
  const navigate=useNavigate();
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState(location.state?.selectedRide || {});
  const [modalStep, setModalStep] = useState(1);
  const [allowJoin, setAllowJoin] = useState(false);
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Redirect back if no ride is selected (e.g., page is accessed directly)
    if (!selectedRide.id) {
      navigate('/'); // Change this to your listing page or wherever appropriate
    }
  }, [selectedRide, navigate]);

  const handleAllowJoin = (allow) => {
    setAllowJoin(allow);
    setModalStep(modalStep + 1);
  };

  const handleSetDestinationAndTime = () => {
    setModalStep(modalStep + 1);
  };

  const handleConfirm = () => {
    const rideInfo = {
      ...selectedRide,
      destination,
      time,
      allowJoin,
    };

    axios.post('http://localhost:4000/confirmRide', rideInfo)
      .then((response) => {
        console.log('Ride confirmed:', response.data);
        navigate('/confirmation'); // Redirect to a confirmation page or back to listing
      })
      .catch((error) => {
        console.error('Failed to confirm ride:', error);
      });
  };

  return (
    <CContainer>
      <CCard className="mb-3">
        <CCardHeader>
          <h5>Reservation Details</h5>
        </CCardHeader>
        <CCardBody>
          {modalStep === 1 && (
            <>
              <h5>Are you sure you want to reserve this ride?</h5>
              <CButton color="primary" onClick={() => setModalStep(2)}>Yes, continue</CButton>
            </>
          )}
          {modalStep === 2 && (
            <>
              <h5>Do you want to allow others to join your ride?</h5>
              <CButton color="primary" className="me-2" onClick={() => handleAllowJoin(true)}>Yes, allow others</CButton>
              <CButton color="dark" onClick={() => handleAllowJoin(false)}>No, private ride</CButton>
            </>
          )}
          {modalStep === 3 && (
            <>
              <div className="mb-3">Please enter your destination:</div>
              <CFormInput
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className="mb-3"
              />
              <div className="mb-3">Please enter your time:</div>
              <CFormInput
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
                className="mb-3"
              />
              <CButton color="primary" onClick={handleSetDestinationAndTime}>Set Destination and Time</CButton>
            </>
          )}
          {modalStep === 4 && (
            <>
              <h5>Confirm your ride to {destination} at {time}?</h5>
              <CButton color="primary" onClick={handleConfirm}>Confirm</CButton>
            </>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default ReserveARidePage;

