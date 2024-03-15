import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ReserveARidePage from './ReserveARidePage';

describe('ReserveARidePage Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <ReserveARidePage />
      </Router>
    );
  });

  // Test 01: Rendering
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Test 02: Initial Step Rendering
  it('renders the initial step correctly', () => {
    const stepOneText = 'Are you sure you want to reserve this ride?';
    expect(wrapper.contains(stepOneText)).toBe(true);
  });
  
});