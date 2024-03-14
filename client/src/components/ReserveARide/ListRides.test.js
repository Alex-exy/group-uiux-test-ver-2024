import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ListRides from './ListRides';

describe('ReserveARide Component', () => {
  let wrapper = null;
  
  beforeEach(() => {
    wrapper = shallow(
      <Router>
        <ListRides />
      </Router>
    );
  });

  

});
