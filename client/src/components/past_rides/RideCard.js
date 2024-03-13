import React from 'react';
import { CButton } from '@coreui/react';

const RideCard = ({ ride }) => {
  return (
    <div className="ride-card">
      <h3>Ride Details</h3>
      <div>Booking Person: {ride.person}</div>
      <div>Booking Time: {ride.time}</div>
      <div>Booking Date: {ride.date}</div>
      <div>Car Model: {ride.model}</div>
      <div>Travel Distance: {ride.distance}</div>
      <div>Origin: {ride.origin}</div>
      <div>Destination: {ride.destination}</div>
      <img className='ride-card-image' src={ride.imagePath} alt="Car" />
      <div className="ride-card-buttons">
        <CButton color="primary" className="print-button">Print</CButton>
        <CButton color="secondary" className="go-back-button">Go Back</CButton>
      </div>
    </div>
  );
};

export default RideCard;
