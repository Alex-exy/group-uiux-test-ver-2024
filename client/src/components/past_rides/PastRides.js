import React, { useState } from 'react';
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, 
          CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import { rides } from './ridesData'; 
import './PastRides.css';
import {useSelector} from 'react-redux';


const PastRides = () => {
  const currentUser=useSelector((state)=>state.auth.user);
  console.log(currentUser);
  const [showModal, setShowModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  
  const usersRides = rides.filter(ride => ride.person === currentUser.given_name);

  const handleRowClick = (ride) => {
    setSelectedRide(ride); 
    setShowModal(true); 
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h2>Past Rides</h2>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Booking Person</CTableHeaderCell>
            <CTableHeaderCell>Booking Time</CTableHeaderCell>
            <CTableHeaderCell>Booking Date</CTableHeaderCell>
            <CTableHeaderCell>Vehicle Model</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {usersRides.map((ride, index) => (
            <CTableRow key={index} onClick={() => handleRowClick(ride)}>
              <CTableDataCell>{ride.person}</CTableDataCell>
              <CTableDataCell>{ride.time}</CTableDataCell>
              <CTableDataCell>{ride.date}</CTableDataCell>
              <CTableDataCell>{ride.model}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal visible={showModal} onClose={() => setShowModal(false)} className='cModal'>
        <CModalHeader className='modalTitle'>
          <div className="centered">
            <CModalTitle>Ride Details</CModalTitle>
          </div>
        </CModalHeader>
        <CModalBody>
          {selectedRide && (
            <div>
              <div>Booking Person:</div>
              <h4>{selectedRide.person}</h4>

              <div>Booking Time:</div>
              <h4>{selectedRide.time}</h4>

              <div>Booking Date:</div>
              <h4>{selectedRide.date}</h4>

              <div>Car Model:</div>
              <h4>{selectedRide.model}</h4>

              <div>Travel Distance:</div>
              <h4>{selectedRide.distance}</h4>

              <div>Origin:</div>
              <h4>{selectedRide.origin}</h4>

              <div>Destination:</div>
              <h4>{selectedRide.destination}</h4>
              
            
              <img src={selectedRide.imagePath} alt="Car" />
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handlePrint} className="print-button">Print</CButton>
          <CButton color="secondary" onClick={() => setShowModal(false)} className="go-back-button">Go Back</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default PastRides;
