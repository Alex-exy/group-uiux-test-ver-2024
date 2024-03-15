import React from 'react';
import { mount } from 'enzyme';
import NavBar from './NavBar';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { CNavbarToggler, CCollapse } from '@coreui/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('NavBar Component Tests', () => {
  let wrapper;

  // Create a mock store
const mockStore = configureMockStore();
const store = mockStore({}); // Add your initial state here

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('includes one Router', () => {
    expect(wrapper.find(Router).length).toEqual(1);
  });

  it('toggle visibility of nav links on click', () => {
    expect(wrapper.find(CCollapse).first().prop('visible')).toBe(false);
    wrapper.find(CNavbarToggler).simulate('click');
    expect(wrapper.find(CCollapse).first().prop('visible')).toBe(true);
  });

  it('renders all NavLinks correctly', () => {
    const expectedLinks = [
      '/list-rides', 
      '/join-a-ride', 
      '/pricing', 
      "/past-rides-table",
      "/profile",
    ];
    const navLinks = wrapper.find(NavLink);

    expectedLinks.forEach((link, index) => {
      expect(navLinks.at(index).prop('to')).toEqual(link);
    });
  });

  it('renders profile image with correct properties', () => {
    const profileImage = wrapper.find('img[alt="Profile"]');
    expect(profileImage).toHaveLength(1);
    expect(profileImage.prop('style')).toEqual({
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    });
  });
});

