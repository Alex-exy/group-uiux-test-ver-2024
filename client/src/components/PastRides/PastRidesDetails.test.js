import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PastRidesDetails from './PastRidesDetails';

// Mock implementation for the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('PastRidesDetails component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <PastRidesDetails />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBeTruthy();
  });

//   it('renders ride details when selectedRide state is provided', () => {
//     const wrapper = shallow(
//       <MemoryRouter>
//         <PastRidesDetails />
//       </MemoryRouter>
//     );
//     // Assuming you want to test rendering when selectedRide is present
//     wrapper.find('PastRidesDetails').setState({ selectedRide: {/* your test data */} });
//     expect(wrapper.find('.ride-card')).toHaveLength(1);
//   });

//   it('displays print and go back buttons when selectedRide state is provided', () => {
//     const wrapper = shallow(
//       <MemoryRouter>
//         <PastRidesDetails />
//       </MemoryRouter>
//     );
//     // Assuming you want to test rendering when selectedRide is present
//     wrapper.find('PastRidesDetails').setState({ selectedRide: {/* your test data */} });
//     expect(wrapper.find('.ride-card-buttons')).toHaveLength(1);
//   });

//   it('calls window.print when print button is clicked', () => {
//     window.print = jest.fn();
//     const wrapper = shallow(
//       <MemoryRouter>
//         <PastRidesDetails />
//       </MemoryRouter>
//     );
//     // Assuming you have a button with a class of 'print-button'
//     wrapper.find('.print-button').simulate('click');
//     expect(window.print).toHaveBeenCalled();
//   });

//   it('calls navigate function when go back button is clicked', () => {
//     const navigateMock = jest.fn();
//     const wrapper = shallow(
//       <MemoryRouter>
//         <PastRidesDetails />
//       </MemoryRouter>
//     );
//     // Mocking the useNavigate hook
//     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);
//     // Assuming you have a button with a class of 'go-back-button'
//     wrapper.find('.go-back-button').simulate('click');
//     expect(navigateMock).toHaveBeenCalled();
//   });

//   it('toggles buttonsVisible state and adds/removes full-screen class when print button is clicked', () => {
//     const wrapper = shallow(
//       <MemoryRouter>
//         <PastRidesDetails />
//       </MemoryRouter>
//     );
//     // Assuming you have a button with a class of 'print-button'
//     wrapper.find('.print-button').simulate('click');
//     expect(wrapper.find('PastRidesDetails').state('buttonsVisible')).toBeFalsy();
//     expect(wrapper.find('.ride-card').hasClass('full-screen')).toBeTruthy();

//     // Clicking again to revert changes
//     wrapper.find('.print-button').simulate('click');
//     expect(wrapper.find('PastRidesDetails').state('buttonsVisible')).toBeTruthy();
//     expect(wrapper.find('.ride-card').hasClass('full-screen')).toBeFalsy();
//   });
});
