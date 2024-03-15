import React, { useState } from 'react';
import { CButton } from '@coreui/react';
import './DetailsStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const PastRidesDetails = () => {
  
  const location = useLocation();

  // fallback data is only used for testing
  const ride = useState(location.state?.data || { person: "John",
  time: "09:30",
  date: "2024-03-01",
  model: "Tesla Model S",
  distance: "150 km",
  origin: "Paris",
  destination: "Berlin",
  imagePath: "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-s-107-6572200e43fa1.jpg?crop=0.473xw:0.355xh;0.254xw,0.341xh&resize=1200:*"});

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
    <div id='parentCard'>
      {ride && (
        <div className="ride-card" id='rideCard'>
          <h1>Ride Details</h1>
          <div className="ride-details">
            <div className="ride-details-column">
              <div>
                <h5>Booking Person:</h5>
                <div>{ride[0].person}</div>
              </div>
              <div>
                <h5>Booking Time:</h5>
                <div>{ride[0].time}</div>
              </div>
              <div>
                <h5>Booking Date:</h5>
                <div>{ride[0].date}</div>
              </div>
            </div>
            <div className="ride-details-column">
              <div>
                <h5>Travel Distance:</h5>
                <div>{ride[0].distance}</div>
              </div>
              <div>
                <h5>Origin:</h5>
                <div>{ride[0].origin}</div>
              </div>
              <div>
                <h5>Destination:</h5>
                <div>{ride[0].destination}</div>
              </div>
            </div>
          </div>
          <h5>Car Model:</h5>
          <div>{ride[0].model}</div>
          <img className='ride-card-image' src={ride[0].imagePath} alt="Car" />
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
