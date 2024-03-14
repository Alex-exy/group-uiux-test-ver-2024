import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import NavBar from './components/NavBar';

const mockStore = configureStore([]);

describe('App Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: {}
      },
    });

    component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('should render NavBar component', () => {
    expect(component.find(NavBar).length).toEqual(1);
  });
});

