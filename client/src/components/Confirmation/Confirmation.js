import "./Confirmation.css";
import { Link } from "react-router-dom";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react';
import React, { useState } from 'react';
import JoinARide from "../JoinARide/JoinARide";

const Confirmation = () => {

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showCancleModal, setShowCancleModal] = useState(false);

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
                <p className="detName"> Booker: </p>
                <p className="detDest"> To: </p>
                <p className="detTime"> Leaves at: </p>
            </div >
            <button className="confirmButton" onClick={handleApproveModal}>
                Confirm Joining
            </button>
            <button className="cancelButton" onClick={handleCancleModal}>
                Cancel Joining
            </button>

            <CModal visible={showApproveModal} onClose={() => setShowApproveModal(false)}>
                <CModalHeader>
                    <CModalTitle>Joining Approved! </CModalTitle>
                </CModalHeader>
                <CModalBody> You will be redirected back to the Join-a-Ride page . . . </CModalBody>
                <CModalFooter>
                    <Link to={`/join-a-ride`}>
                        <CButton color="primary" onClick={() => setShowApproveModal(false)}>Ok</CButton>
                    </Link>
                </CModalFooter>
            </CModal >

            <CModal visible={showCancleModal} onClose={() => setShowCancleModal(false)}>
                <CModalHeader>
                    <CModalTitle>Joining Canceled! </CModalTitle>
                </CModalHeader>
                <CModalBody> You will be redirected back to the Join-a-Ride page . . . </CModalBody>
                <CModalFooter>
                    <Link to={`/join-a-ride`}>
                        <CButton color="primary" onClick={() => setShowCancleModal(false)}>Ok</CButton>
                    </Link>
                </CModalFooter>
            </CModal >
        </div >
    );
};

export default Confirmation;