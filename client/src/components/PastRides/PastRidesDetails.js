import React, { useState } from 'react';
import { CButton } from '@coreui/react';
import './DetailsStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PastRidesDetails = () => {
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState(location.state?.data);
  const ride = selectedRide;
  const navigate = useNavigate();
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const handlePrint = () => {
    setButtonsVisible(false);
    const rideCardElement = document.querySelector('.ride-card');
    rideCardElement.classList.add('full-screen');
    window.print();
    rideCardElement.classList.remove('full-screen'); 
    setButtonsVisible(true); 
  };
  

  const handleBackClick = () => {
    navigate(`/past-rides-table`);
  };

  return (
    <div>
      {ride && (
        <div className="ride-card">
          <h1>Ride Details</h1>
          <div className="ride-details">
            <div className="ride-details-column">
              <div>
                <h5>Booking Person:</h5>
                <div>{ride.person}</div>
              </div>
              <div>
                <h5>Booking Time:</h5>
                <div>{ride.time}</div>
              </div>
              <div>
                <h5>Booking Date:</h5>
                <div>{ride.date}</div>
              </div>
            </div>
            <div className="ride-details-column">
              <div>
                <h5>Travel Distance:</h5>
                <div>{ride.distance}</div>
              </div>
              <div>
                <h5>Origin:</h5>
                <div>{ride.origin}</div>
              </div>
              <div>
                <h5>Destination:</h5>
                <div>{ride.destination}</div>
              </div>
            </div>
          </div>
          <h5>Car Model:</h5>
          <div>{ride.model}</div>
          <img className='ride-card-image' src={ride.imagePath} alt="Car" />
          {buttonsVisible && (
            <div className="ride-card-buttons">
              <CButton color="primary" className="print-button" onClick={handlePrint}>Print</CButton>
              <CButton color="secondary" className="go-back-button" onClick={handleBackClick}>Go Back</CButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PastRidesDetails;
