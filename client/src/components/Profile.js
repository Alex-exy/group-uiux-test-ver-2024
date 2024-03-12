import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';
import profileImg from './john_doe.jpeg';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CImage,
  CButton // Importing CButton for the logout button
} from '@coreui/react';

const Profile = () => {
  // Fetching user profile data from Redux Store
  const currentUser = useSelector((state) => state.auth.user);

  // Logout function
  const handleLogout = () => {
    window.location.href = 'https://sso.sexycoders.org/auth/realms/UTV-SRH-2024/protocol/openid-connect/logout?redirect_uri=http://localhost:3000'
    // Here you would typically clear user session and perform any necessary cleanup before redirecting
  };

  // Constructing user profile object from the fetched data
  const userProfile = {
    name: `${currentUser.given_name} ${currentUser.family_name}`,
    email: currentUser.email,
    role: 'Software Developer',
    bio: 'A passionate software developer with a knack for building scalable web applications and working on challenging projects.',
  };

  return (
    <div className="profile-container">
      <CRow className="justify-content-center">
        <CCol lg={8}>
          <CCard>
            <CCardHeader className="profile-header bg-primary text-white">
              <h3>{userProfile.name}</h3>
            </CCardHeader>
            <CCardBody className="text-center">
              <CImage
                src={profileImg}
                className="img-thumbnail profile-image mb-4"
                alt="profile"
                height={150}
                width={150}
                rounded
                fluid
              />
              <div className="profile-info">
                <h5>{userProfile.role}</h5>
                <p>{userProfile.bio}</p>
                <p>Email: {userProfile.email}</p>
              </div>
              {/* Logout Button */}
              <CButton color="danger" className="mt-4" onClick={handleLogout}>
                Logout
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Profile;

