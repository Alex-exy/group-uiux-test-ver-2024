import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useSelector} from 'react-redux';
import axios from "axios"; 
import { useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';

const PastRidesTable = () => {

  const currentUser = useSelector((state) => state.auth.user);

  const [rides, setRides] = useState([]);
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const rides = await axios.post('http://localhost:4000/getPreviousRides', {});;
        const usersRides = rides.data.rideData.filter((ride) => ride.person === currentUser.given_name);
        setRides(usersRides);
      } catch (error) {
        console.error('Failed to fetch rides:', error);
      }
    };

    fetchRides();
  }, [currentUser.given_name]);
  
  

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
          {rides.map((ride, index) => (
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
