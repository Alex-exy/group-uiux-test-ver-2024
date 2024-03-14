import React from 'react';
import { mount } from 'enzyme'; 
import { useSelector } from 'react-redux';
import PastRidesTable from './PastRidesTable';
import { useNavigate } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

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
  {
    
    person: "John",
    time: "12:45",
    date: "2024-03-02",
    model: "Nissan Leaf",
    distance: "120 km",
    origin: "Rome",
    destination: "Madrid",
    imagePath: "https://images.prismic.io/carwow/a9b25a99-74ae-4ce8-bf98-d20fd9b2b927_Front+%C2%BE+moving.jpg"
  },
  {
    
    person: "John",
    time: "12:45",
    date: "2024-03-02",
    model: "Nissan Leaf",
    distance: "120 km",
    origin: "Rome",
    destination: "Madrid",
    imagePath: "https://images.prismic.io/carwow/a9b25a99-74ae-4ce8-bf98-d20fd9b2b927_Front+%C2%BE+moving.jpg"
  },
];



jest.mock('react-router-dom', () => ({
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PastRidesTable', () => {
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

  it('renders a table row for each ride of the selected user', () => {
    const wrapper = mount(<PastRidesTable />);
    const tableRows = wrapper.find('CTableDataCell');
    expect(tableRows.at(0).text()).toBe('John');
    // expect(tableRows).toHaveLength(rides.filter((ride) => ride.person === 'John').length);
    console.log(rides);
  });

  // it('renders table data cells with ride information', () => {
  //   const wrapper = mount(<PastRidesTable />);
  //   const firstRowDataCells = wrapper.find('#row').at(0).at(0);
  //   console.log();
  //   // expect(firstRowDataCells.text()).toBe('John'); 
  //   // expect(firstRowDataCells.at(0).text()).toBe(rides[0].person);
  //   // expect(firstRowDataCells.at(1).text()).toBe(rides[0].time);
  //   // expect(firstRowDataCells.at(2).text()).toBe(rides[0].date);
  //   // expect(firstRowDataCells.at(3).text()).toBe(rides[0].model);
  // });
  
});
