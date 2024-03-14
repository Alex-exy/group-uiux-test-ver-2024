import React from 'react';
import { mount } from 'enzyme';
import { useSelector } from 'react-redux';
import PastRidesTable from './PastRidesTable';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PastRidesTable', () => {
  
  const rides = [
    {
      person: "John",
      time: "09:30",
      date: "2024-03-01",
      model: "Tesla Model S",
      distance: "150 km",
      origin: "Paris",
      destination: "Berlin",
      imagePath: "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-s-107-6572200e43fa1.jpg?crop=0.473xw:0.355xh;0.254xw,0.341xh&resize=1200:*"
    },
  ];

  beforeEach(() => {
    useSelector.mockReturnValue({
      auth: {
        user: { given_name: 'John' },
      },
    });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('renders the heading', () => {
    const wrapper = mount(<PastRidesTable />);
    expect(wrapper.find('h2').text()).toBe('Past Rides');
  });

  it('renders the table with header cells', () => {
    const wrapper = mount(<PastRidesTable />);
    const headerCells = wrapper.find('CTableHeaderCell');
    expect(headerCells).toHaveLength(4);
    expect(headerCells.at(0).text()).toBe('Booking Person');
    expect(headerCells.at(1).text()).toBe('Booking Time');
    expect(headerCells.at(2).text()).toBe('Booking Date');
    expect(headerCells.at(3).text()).toBe('Vehicle Model');
  });

  it('renders a table row for the ride of the selected user', () => {
    const wrapper = mount(<PastRidesTable />);
    const tableRows = wrapper.find('CTableRow');
    expect(tableRows).toHaveLength(rides.filter((ride) => ride.person === 'John').length); 
  });

});
