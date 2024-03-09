import "./JoinRide.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const JoinRide = ({ isLoggedIn }) => {
  const [availableRides, setAvailableRides] = useState([]);
  useEffect(() => {
    console.log("Available Rides Loaded")
    const fetchAvailableRides = async () => {
      try {
        //const response = await axios.post('http:://localhost:27027/ridesDummy', {});
        const response = await axios.post('http://localhost:4000/ridesDummy', {});
        const joinableRides = response.data.filter(ride => ride.status === 'Share');
        setAvailableRides(joinableRides);
      }
      catch (error) {
        console.log('Failed to fetch rides', error);
      }
    };
    fetchAvailableRides();
  }, []);

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

export default JoinRide;
