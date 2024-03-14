import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ReserveARidePage from './ReserveARidePage';

describe('ReserveARidePage Component', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <Router>
        <ReserveARidePage />
      </Router>
    );
  });

  // Test 01: Rendering
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  
});