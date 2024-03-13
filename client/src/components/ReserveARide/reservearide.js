import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,   CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput} from '@coreui/react';


// Start backend in 2nd Terminal: node main.js
// Start development server: npm start

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
            {modalStep === 2 && (
            <>
                <div style={{ marginBottom: "10px" }}>Do you want to allow others to join your ride?</div>
                <CButton color="primary" style={{ marginRight: '10px', padding: '10px' }} onClick={() => handleAllowJoin(false)}>No, I want a private ride</CButton>
                <CButton color="dark" style={{ padding: '10px' }} onClick={() => handleAllowJoin(true)}>Yes, allow others to join</CButton>
            </>)}
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

  export default ReserveARide;
