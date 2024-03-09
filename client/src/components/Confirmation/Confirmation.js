import "./Confirmation.css";
import { Link } from "react-router-dom";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react';
import React, { useState } from 'react';


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
        <div>
            <h2> Please Confirm Your Joining Of The Ride </h2>
            <button className="confirmButton" onClick={handleApproveModal}>
                Confirm Joining
            </button>

            <button className="cancleButton" onClick={handleCancleModal}>
                Cancel Joining
            </button>


            <CModal visible={showApproveModal} onClose={() => setShowApproveModal(false)}>
                <CModalHeader>
                    <CModalTitle>Joining Approved</CModalTitle>
                </CModalHeader>
                <CModalBody> You will be redirected to the Joining page </CModalBody>
                <CModalFooter>
                    <Link to={`/join-a-ride`}>
                        <CButton color="primary" onClick={() => setShowApproveModal(false)}>Ok</CButton>
                    </Link>
                </CModalFooter>
            </CModal >

            <CModal visible={showCancleModal} onClose={() => setShowCancleModal(false)}>
                <CModalHeader>
                    <CModalTitle>Joining Canceled</CModalTitle>
                </CModalHeader>
                <CModalBody> You will be redirected to the Joining page </CModalBody>
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