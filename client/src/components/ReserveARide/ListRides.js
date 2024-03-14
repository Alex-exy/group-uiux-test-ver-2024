// ListRides.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const ListRides = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchRides = async () => {
        try {
          const response = await axios.post('http://localhost:4000/ridesDummy', {}); //http request data here
          const freeRides = response.data.filter(ride => ride.status === 'Free');
          setVehicles(freeRides);
        } catch (error) {
          console.error('Failed to fetch rides:', error);
        }
      };
  
      fetchRides();
    }, []);
  
    const handleRowClick = (vehicle) => {
      navigate('/reserve-a-ride', { state:{selectedRide: vehicle }});
    };
  
    return (
      <div>
        <h2>List of Rides</h2>
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
      </div>
    );
};

export default ListRides;

