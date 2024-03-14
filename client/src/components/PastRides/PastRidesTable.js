import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useSelector } from 'react-redux';
import { rides } from './ridesData'; 
import { useNavigate} from 'react-router-dom';

const PastRidesTable = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const usersRides = rides.filter((ride) => ride.person === currentUser.given_name);
  const navigate = useNavigate();
 
  const handleRowClick = (ride) => {
    navigate(`/past-rides-details`,{state:{data:ride}});
  };
  
  return (
    <div>
      <h2>Past Rides</h2>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Booking Person</CTableHeaderCell>
            <CTableHeaderCell>Booking Time</CTableHeaderCell>
            <CTableHeaderCell>Booking Date</CTableHeaderCell>
            <CTableHeaderCell>Vehicle Model</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {usersRides.map((ride, index) => (
            <CTableRow  key={index} onClick={() => handleRowClick(ride)}>
              <CTableDataCell>{ride.person}</CTableDataCell>
              <CTableDataCell>{ride.time}</CTableDataCell>
              <CTableDataCell>{ride.date}</CTableDataCell>
              <CTableDataCell>{ride.model}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default PastRidesTable;
