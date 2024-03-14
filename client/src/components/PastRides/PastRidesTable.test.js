import React from 'react';
import { mount } from 'enzyme';
import PastRidesTable from './PastRidesTable';

// Mocking useSelector hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mocking useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('PastRidesTable component', () => {
  // Mock data for testing
  const mockUser = {
    given_name: 'John Doe',
  };
  
  // Local test data with added id property
  const mockRides = [
    {
      id: 1,
      person: 'John Doe',
      time: '10:00 AM',
      date: '2024-03-13',
      model: 'Toyota Camry',
    },
    {
      id: 2,
      person: 'Alice Smith',
      time: '11:00 AM',
      date: '2024-03-14',
      model: 'Honda Civic',
    },
  ];

  beforeEach(() => {
    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(() => mockUser);
  });

  it('renders without crashing', () => {
    const wrapper = mount(<PastRidesTable />);
    expect(wrapper).toBeDefined();
  });

  it('displays correct number of rows for user\'s rides', () => {
    jest.spyOn(require('react-redux'), 'useSelector').mockImplementation(() => mockRides);
    const wrapper = mount(<PastRidesTable />);
    expect(wrapper.find('CTableRow').length).toEqual(1); 
  });

//   it('calls navigate when a row is clicked', () => {
//     const mockNavigate = jest.fn();
//     jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
//     const wrapper = mount(<PastRidesTable />);
    
//     // Simulate click on the first CTableRow
//     const rideId = mockRides[0].id;
//     wrapper.find('CTableRow').at(0).simulate('click');
    
//     // Check if navigate is called with the correct arguments
//     expect(mockNavigate).toHaveBeenCalledWith('/past-rides-details', { state: { data: rideId } });
//   });
});
