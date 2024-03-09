import "./JoinARide.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavItem, CNavbarNav, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react';
import { Link } from "react-router-dom";


const JoinARide = ({ isLoggedIn }) => {
    const [availableRides, setAvailableRides] = useState([]);
    const [loginInfo, setLoginInfo] = useState(false);

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

        // DO SOMETHING 
        
        if (isLoggedIn) {
            <Link to={`/confirm-joining/${rideid}/Confirm`}>

            </Link>
        } else {
            handleLoginInfo();
        }

    })

    const handleLoginInfo = () => {
        setLoginInfo(true)
    }

    return (
        <div>
            <h2>Join a Ride</h2>
            <h2>Please click on the ride you want to join </h2>
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

            <CModal visible={setLoginInfo} onClose={() => setLoginInfo(false)}>
                <CModalHeader>
                    <CModalTitle>Please login to join a ride</CModalTitle>
                </CModalHeader>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setLoginInfo(false)}>Ok</CButton>
                </CModalFooter>
            </CModal >

        </div >

    );
};

export default JoinARide;
