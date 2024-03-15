import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PastRides from './PastRides';
const rides = require('./ridesData');

// Initialize mock store
const mockStore = configureStore([]);
const initialState = {
  auth: {
    user: {
      given_name: 'John',
    },
  },
};
let store, wrapper;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = mount(
    <Provider store={store}>
      <PastRides />
    </Provider>
  );
});

afterEach(() => {
  wrapper.unmount();
});

describe('PastRides Component', () => {
  it('renders without crashing', () => {
    expect(wrapper.find(PastRides).length).toEqual(1);
  });

  it('displays rides for the current user', () => {
    // Expect to find table rows for each ride associated with 'Test User Name'
    // This may need adjustments based on your initial rides data.
  });

  it('opens modal on row click with correct details', () => {
    // Ensure there's at least one ride to test with
    expect(wrapper.find('CTableRow').length).toBeGreaterThan(0);

    // Simulate clicking the first row
    wrapper.find('CTableRow').first().simulate('click');

    // After clicking, the showModal state should be true, and the modal should be visible.
    // However, Enzyme's `mount` does not always fully cooperate with functional component state updates or hooks.
    // Therefore, you might need to directly check if the modal content matches the expected values.

    // Assuming the modal is now visible, check for modal content based on the first item in your `rides` data.
    const expectedRide = rides[0]; // Adjust based on your actual data setup

    // Check if the modal title is displayed
    expect(wrapper.find('CModalTitle').text()).toContain('Ride Details');

    // Verify the details in the modal match the expectedRide's details
    expect(wrapper.find('.modal-image').prop('src')).toEqual(expectedRide.imagePath);
    expect(wrapper.find('CModalBody h4').at(0).text()).toEqual(expectedRide.person);
    // Continue for other details like time, date, model, etc.
  });
});


  // Add more tests as needed
//});

