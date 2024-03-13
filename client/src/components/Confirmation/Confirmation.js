import "./Confirmation.css";
import { Link } from "react-router-dom";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import React, { useState } from 'react';
//import {selectedRide} from "../JoinARide/JoinARide";
import { useSelector } from 'react-redux';
import rideSlice from "../../store/rideSlice";

const Confirmation = () => {

    const selectedRide = useSelector((state) => state.ride.selectedRide);
    //console.log(selectedRide.booker);

    const [showApproveModal, setShowApproveModal] = useState(false);
    const approvalVisible = false;
    const [showCancleModal, setShowCancleModal] = useState(false);
    const cancelVisible = false;

    const handleApproveModal = () => {
        setShowApproveModal(true);
    }

    const handleCancleModal = () => {
        setShowCancleModal(true);
    }

    return (
        <div className="background" >
            <h2 className="header">
                Please confirm your joining of the ride:
            </h2>
            <div className="description" >
                Summarized details of the selected ride:
            </div>
            <div className="detailList">
                <p className="detName">Booker: {selectedRide.booker} </p>
                <p className="detDest">To: {selectedRide.destination} </p>
                <p className="detTime">Leaves at: {selectedRide.time} </p>
            </div >
            <button id="confirmButton" onClick={handleApproveModal}>
                Confirm Joining
            </button>
            <button id="cancelButton" onClick={handleCancleModal}>
                Cancel Joining
            </button>

            <CModal id="approvalModal" visible={showApproveModal} onClose={() => setShowApproveModal(false)}>
                <CModalHeader>
                    <CModalTitle id="approvalHeader">Joining Approved!</CModalTitle>
                </CModalHeader>
                <CModalBody id="approvalBody"> You will be redirected back to the Join-a-Ride page . . . </CModalBody>
                <CModalFooter>
                    <Link to={`/join-a-ride`}>
                        <CButton id="approvalOkButton" color="primary" onClick={() => setShowApproveModal(false)}>Ok</CButton>
                    </Link>
                </CModalFooter>
            </CModal >

            <CModal id="cancelModal" visible={showCancleModal} onClose={() => setShowCancleModal(false)}>
                <CModalHeader>
                    <CModalTitle id="cancelHeader">Joining Canceled!</CModalTitle>
                </CModalHeader>
                <CModalBody id="cancelBody"> You will be redirected back to the Join-a-Ride page . . . </CModalBody>
                <CModalFooter>
                    <Link to={`/join-a-ride`}>
                        <CButton id="cancelOkButton" color="primary" onClick={() => setShowCancleModal(false)}>Ok</CButton>
                    </Link>
                </CModalFooter>
            </CModal >
        </div >
    );
};

export default Confirmation;
