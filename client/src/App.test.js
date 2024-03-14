// Import necessary modules and components for testing
import React from 'react';
import { mount } from 'enzyme'; // Mount is used for full DOM rendering
import configureStore from 'redux-mock-store'; // Helps in creating a mock Redux store
import { Provider } from 'react-redux'; // Provider makes Redux store available to nested components
import App from './App'; // Import the component to test
import NavBar from './components/NavBar'; // Import child component to verify its rendering
import { act } from 'react-dom/test-utils'; // Import act for handling async operations

// Setup redux-mock-store
const mockStore = configureStore([]);

describe('App Component', () => {
  let store;
  let component;
  // Mock keycloak object to mimic the Keycloak service without making real HTTP requests
  const mockKeycloak = {
    tokenParsed: {
      family_name: 'Doe',
      given_name: 'John',
      preferred_username: 'johndoe',
      email: 'john@doe.com',
      sub: '1234'
    },
    updateToken: jest.fn().mockResolvedValue(true), // Mocks the updateToken function to resolve true
    timeSkew: 0
  };

  beforeEach(async () => {
    jest.useFakeTimers(); // Start by using Jest's fake timers
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: {}
      },
    });

    await act(async () => {
      // Mount the App component with Provider to make the mock store available
      component = mount(
        <Provider store={store}>
          <App keycloak={mockKeycloak} />
        </Provider>
      );
    });
  });

  afterEach(() => {
    // After each test, unmount the component to clean up and ensure timers are cleared correctly
    act(() => {
      component.unmount();
    });
    jest.runOnlyPendingTimers(); // Run only pending timers to ensure they are cleared
    jest.useRealTimers(); // Switch back to real timers
  });

  it('should render NavBar component', () => {
    expect(component.find(NavBar).length).toEqual(1);
  });
});

