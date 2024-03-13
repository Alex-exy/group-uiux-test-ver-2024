import React from 'react';
import { shallow, mount } from 'enzyme';
import ReserveARide from './reservearide';
import { useSelector } from 'react-redux';
/*
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
*/
describe('ReserveARide Component', () => {
  let wrapper = null;

  beforeEach(() => {
    //useSelector.mockReturnValue({ auth: { user: { given_name: 'John Doe' } } }); //Not needed for this component, at the moment
    wrapper = shallow(<ReserveARide />);
  });

  // Test 01
  it('is Rendered', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Test 02
  it('renders a table with vehicle information', () => {
    expect(wrapper.find('CTable').exists()).toBe(true);
    expect(wrapper.find('CTableRow').length).toBeGreaterThan(0);
  });

  // Test 03
  it('displays the reservation modal on row click', () => {
    // Simulate a row click
    const firstRow = wrapper.find('CTableRow').at(0);
    firstRow.simulate('click');

    

    expect(wrapper.find('CModal').prop('visible')).toBe(true);
  });
  /*
  // Test 04
  it('handles continue button click in the reservation modal', () => {
    // Simulate a row click
    const firstRow = wrapper.find('CTableRow').at(0);
    firstRow.simulate('click');

    // Simulate a continue button click
    const continueButton = wrapper.find('CButton[children="Continue"]');
    continueButton.simulate('click');

    expect(wrapper.find('CModal').prop('visible')).toBe(true);
  });
  */
});