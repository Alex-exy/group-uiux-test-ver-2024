import React from 'react';
import { shallow } from 'enzyme';
import PastRides from './PastRides';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('PastRides component', () => {
  let wrapper;
  const sampleRide = {
    person: 'John Doe',
    time: '10:00 AM',
    date: '2024-03-12',
    model: 'Toyota Camry',
    distance: '10 miles',
    origin: '123 Main St',
    destination: '456 Elm St',
    imagePath: 'car.jpg',
  };

  beforeEach(() => {
    useSelector.mockReturnValue({ auth: { user: { given_name: 'John Doe' } } });
    wrapper = shallow(<PastRides />);
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should close modal when "Go Back" button is clicked', () => {
    // Simulate click on "Go Back" button
    wrapper.find('.go-back-button').simulate('click');

    // Check if modal is closed
    expect(wrapper.find('CModal').prop('visible')).toEqual(false);
  });

  it('should call window.print() when "Print" button is clicked', () => {
    // Mock window.print
    const originalPrint = window.print;
    window.print = jest.fn();

    // Simulate click on "Print" button
    wrapper.find('.print-button').simulate('click');

    // Check if window.print is called
    expect(window.print).toHaveBeenCalled();

    // Restore original window.print
    window.print = originalPrint;
  });

  //   it('should display ride details modal on row click', () => {
  //   // Simulate click on a row
  //   wrapper.find('CTableRow').simulate('click', sampleRide);

  //   // Check if modal is visible
  //   expect(wrapper.find('CModal').prop('visible')).toEqual(false);
  //   expect(wrapper.find('CModal')).toHaveLength(1);

  //   // Check if ride details are displayed correctly in the modal
  //   expect(wrapper.find('.modal-image').prop('src')).toEqual(sampleRide.imagePath);
  //   expect(wrapper.find('h4').at(0).text()).toEqual(sampleRide.person);
  //   expect(wrapper.find('h4').at(1).text()).toEqual(sampleRide.time);
  //   expect(wrapper.find('h4').at(2).text()).toEqual(sampleRide.date);
  //   expect(wrapper.find('h4').at(3).text()).toEqual(sampleRide.model);
  //   expect(wrapper.find('h4').at(4).text()).toEqual(sampleRide.distance);
  //   expect(wrapper.find('h4').at(5).text()).toEqual(sampleRide.origin);
  //   expect(wrapper.find('h4').at(6).text()).toEqual(sampleRide.destination);
  // });

});
