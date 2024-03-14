import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Profile from '../components/Profile';

// Setup redux-mock-store
const mockStore = configureStore([]);

describe('Profile Component', () => {
  let store;
  let component;

  beforeEach(() => {
    // Create a mock store with initial state
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          given_name: 'John',
          family_name: 'Doe',
          email: 'john@doe.com',
        },
      },
    });

    // Mount the Profile component with Provider wrapper
    component = mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render user name correctly', () => {
    // Check if user name is rendered correctly
    expect(component.find('.profile-header h3').text()).toEqual('John Doe');
  });

  it('should display the correct email', () => {
    // Check if email is displayed correctly
    expect(component.find('.profile-info').text()).toContain('john@doe.com');
  });

  it('should have a logout button', () => {
    // Check if logout button is present
    expect(component.find('CButton').text()).toEqual('Logout');
  });

  it('should dispatch setUser action on component mount', () => {
    // Check if setUser action was dispatched on mount
    const actions = store.getActions();
    const expectedPayload = { type: 'auth/setUser', payload: expect.any(Object) };
    expect(actions).toEqual(expect.arrayContaining([expect.objectContaining(expectedPayload)]));
  });

  it('should trigger redirect on logout button click', () => {
    // Mock global window location
    delete window.location;
    window.location = { href: '' };

    // Simulate logout button click
    component.find('CButton').simulate('click');

    // Check if window location was changed (redirected)
    expect(window.location.href).toContain('openid-connect/logout');
  });
});

