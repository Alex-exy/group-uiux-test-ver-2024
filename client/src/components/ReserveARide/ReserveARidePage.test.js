import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ReserveARidePage from './ReserveARidePage';

describe('ReserveARidePage Component', () => {
  let wrapper = null;
  window.alert = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <ReserveARidePage />
      </Router>
    );
  });

  // Test 01
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Test 02
  it('renders the initial step correctly', () => {
    const stepOneText = 'Are you sure you want to reserve this ride?';
    expect(wrapper.contains(stepOneText)).toBe(true);
  });
  
  // Test 03
  it('renders the confirmation step correctly', () => {
    // Trigger the "Yes, continue" button click to move to the next step
    wrapper.find('CButton').first().simulate('click');
    wrapper.update();
    const stepTwoText = 'Do you want to allow others to join your ride?';
    expect(wrapper.contains(stepTwoText)).toBe(true);
  });

  // Test 04
  it('renders the destination and time step correctly', () => {
    wrapper.find('CButton').first().simulate('click');
    wrapper.update();
    wrapper.find('CButton').first().simulate('click');
    wrapper.update();
    const destinationInput = wrapper.find('CFormInput[placeholder="Destination"]');
    const timeInput = wrapper.find('CFormInput[placeholder="Time"]');
    expect(destinationInput.exists()).toBe(true);
    expect(timeInput.exists()).toBe(true);
  });

});
