import "./JoinARide.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, CModalHeader, CModalTitle, CModalFooter, CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedRide } from '../../store/rideSlice';

const JoinARide = () => {
    const [availableRides, setAvailableRides] = useState([]);
    const [loginInfo, setLoginInfo] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAvailableRides = async () => {
            try {
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

    const handleSelection = (ride) => {
        //Cannot log after tests are done. Did you forget to wait for something async in your test?    
        dispatch(setSelectedRide(ride));
        navigate(`/confirm-joining/${ride.id}/Confirm`);
    };

    const handleLoginInfo = () => {
        setLoginInfo(true)
    };

    return (
        <div className="background">
            <h2 className="header" >
                Join a Ride
            </h2>
            <h4 className="description" >
                Please click on the ride you want to join:
            </h4>
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow id="table">
                        <CTableHeaderCell className="thisbooker">Booker</CTableHeaderCell>
                        <CTableHeaderCell id="destination">Destination</CTableHeaderCell>
                        <CTableHeaderCell id="type">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell id="battery">Battery Remaining</CTableHeaderCell>
                        <CTableHeaderCell id="distance">Distance to Vehicle</CTableHeaderCell>
                        <CTableHeaderCell id="time">Departure Time</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {availableRides.map((ride) => (
                        <CTableRow id="rideRow" key={ride.id} onClick={() => handleSelection(ride)}>
                            <CTableDataCell id="cellBooker">
                                {ride.booker}
                            </CTableDataCell>
                            <CTableDataCell id="cellDestination">
                                {ride.destination}
                            </CTableDataCell>
                            <CTableDataCell id="cellType">
                                {ride.vehicleType}
                            </CTableDataCell>
                            <CTableDataCell id="cellBattery">
                                {ride.battery}
                            </CTableDataCell>
                            <CTableDataCell id="cellDistance">
                                {ride.distanceToVehicle}
                            </CTableDataCell>
                            <CTableDataCell id="cellTime">
                                {ride.departureTime}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {
            /* No Longer required
            <CModal visible={loginInfo} onClose={() => setLoginInfo(false)}>
                <CModalHeader>
                    <CModalTitle>Please login to join a ride!</CModalTitle>
                </CModalHeader>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setLoginInfo(false)}>Ok</CButton>
                </CModalFooter>
            </CModal >
             */ 
            }
        </div >
    );
};

export default JoinARide;