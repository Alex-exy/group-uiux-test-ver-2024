import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ListRides from './ListRides';
import ReserveARidePage from './ReserveARidePage';

const mockData = [
  { id: 1, type: 'Car', distance: '10km', battery: '70%', info: 'Additional info' },
  { id: 2, type: 'Bike', distance: '5km', battery: '90%', info: 'Additional info' }
];

describe('ReserveARide Component', () => {
  let wrapper = null;
  let history = null;
  
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <ListRides />
      </Router>
    );
  });

  // Test 01: Rendering
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Test 02: Clicking a row
  it('navigates to reserve-a-ride when the first row is clicked', () => {
    const handleRowClick = jest.fn();
    const firstRow = wrapper.find('CTableRow').first();
    firstRow.simulate('click');

    expect(handleRowClick).toHaveBeenCalled();
    

    /*
    const reserveARideWrapper = mount(
      <Router>
        <ReserveARidePage />
      </Router>
    );
    */
    //expect(reserveARideWrapper.exists()).toBe(true);
  });
  
});
