
import React from 'react';
import { useParams } from 'react-router-dom';
import RideCard from './RideCard';  
import { rides } from './ridesData';

const RideDetailsPage = () => {
  const { rideId } = useParams();
  const ride = rides.find((ride) => ride.id === parseInt(rideId));

  return (
    <div>
      <h2>Ride Details</h2>
      {ride && <RideCard ride={ride} />} 
    </div>
  );
};

export default RideDetailsPage;
