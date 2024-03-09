import "./JoinARide.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Link } from "react-router-dom";


const JoinARide = ({ }) => {
    const [availableRides, setAvailableRides] = useState([]);
    //const [selection, setSelection] = useState('');

    useEffect(() => {
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

    const handleSelection = (rideid => {
        <Link to={`/confirm-joining/${rideid}/Confirm`}>
        </Link>
    })

    return (
        <div>
            <h2>Join a Ride</h2>
            <h2>Please click on the ride you want</h2>
            <CTable hover responsive>
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
                    {availableRides.map((ride) => (
                        <CTableRow key={ride.id} onClick={() => handleSelection(ride.id)}>
                            <CTableDataCell>
                                {ride.booker}
                            </CTableDataCell>
                            <CTableDataCell>
                                {ride.destination}
                            </CTableDataCell>
                            <CTableDataCell>
                                {ride.vehicleType}
                            </CTableDataCell>
                            <CTableDataCell>
                                {ride.battery}
                            </CTableDataCell>
                            <CTableDataCell>
                                {ride.distanceToVehicle}
                            </CTableDataCell>
                            <CTableDataCell>
                                {ride.departureTime}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div >
    );
};

export default JoinARide;
