import React from 'react';
import './Profile.css'; 
import johnDoeImg from './john_doe.jpeg';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  //CImg
} from '@coreui/react';

// Dummy data object
const userProfile = {
  name: 'John Doe',
  role: 'Software Developer',
  bio: 'A passionate software developer with a knack for building scalable web applications and working on challenging projects.',
  imageUrl: 'https://via.placeholder.com/150',
  email: 'johndoe@example.com',
  phone: '+1234567890',
};

const Profile = () => {
  return (
    <div className="profile-container">
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader className="profile-header">
              <h3>{userProfile.name}</h3>
            </CCardHeader>
            <CCardBody>
              <img
                src={johnDoeImg}
                className="img-thumbnail profile-image"
                alt="profile"
              />
              <div className="profile-info">
                <h5>{userProfile.role}</h5>
                <p>{userProfile.bio}</p>
                <p>Email: {userProfile.email}</p>
                <p>Phone: {userProfile.phone}</p>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Profile;

