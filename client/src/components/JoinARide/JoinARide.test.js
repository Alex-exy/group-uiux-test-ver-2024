import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rideReducer from "../../store/rideSlice";
import JoinARide from './JoinARide';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

describe('Renders DOM elements correct', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                ride: rideReducer,
            },
            preloadedState: {
                ride: {
                    selectedRide: {}
                }
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <JoinARide />
                </Router>
            </Provider>
        );
    });

    //DOM Text components
    it("Should render Title as Join a Ride", () => {
        let title = wrapper.find(".header").text();
        expect(title).toBe("Join a Ride");
    });

    it("Should render Description as Please click on the ride you want to join:", () => {
        let description = wrapper.find(".description").text();
        expect(description).toBe("Please click on the ride you want to join:");
    });
});

//Table
describe('Check if table is displayed and working correct', () => {

    let wrapper;
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                ride: rideReducer,
            },
            preloadedState: {
                ride: {
                    selectedRide: {}
                }
            }
        });

        const availableRides = [
            {
                id: 1,
                booker: 'Booker1',
                destination: 'Destination1',
                vehicleType: 'Type1',
                battery: 'Battery1',
                distanceToVehicle: 'Distance1',
                departureTime: 'Time1'
            },
        ];

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <JoinARide availableRides={availableRides} />
                </Router>
            </Provider>
        );
    });

    //Table header and its components
    it('Table header should contain six elements and a description of every element', () => {
        let table = wrapper.find('CTableHeaderCell')
        expect(table).toHaveLength(6);
        expect(table.at(0).text()).toBe('Booker');
        expect(table.at(1).text()).toBe('Destination');
        expect(table.at(2).text()).toBe('Vehicle Type');
        expect(table.at(3).text()).toBe('Battery Remaining');
        expect(table.at(4).text()).toBe('Distance to Vehicle');
        expect(table.at(5).text()).toBe('Departure Time');
    })


    // FIX 
    it("Check if redirected after click on Row", () => {
        /*
        const handleSelection = jest.fn();
        wrapper.find('#rideRow').first().simulate('click');

        
        //const row = wrapper.find('#rideRow').first();
        //row.simulate('click');
        

        expect(handleSelection).toHaveBeenCalled();
        */
    });
});


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

//Table Row
describe('Check if table rows are created as desired', () => {

    let wrapper;
    let store;

    store = configureStore({
        reducer: {
            ride: rideReducer,
        },
        preloadedState: {
            ride: {
                selectedRide: {}
            }
        }
    });

    jest.mock('react-router-dom', () => ({
        useNavigate: () => ({
            navigate: jest.fn(),
        }),
    }));

    const mockData = [
        {
            booker: "Max",
            desination: "Munich",
            vehicleType: "BMW",
            battery: "70%",
            distanceToVehicle: "7 km",
            departureTime: "12:00",
        },
    ];

    beforeEach(() => {
        useSelector.mockReturnValue({
            auth: {
                user: { given_name: 'John' },
            },
        });
    });

    afterEach(() => {
        useSelector.mockClear();
    });

    it('Creates a CTable row for a dummy user', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <JoinARide availableRides={mockData} />
                </Router>
            </Provider>
        );
        const tableRows = wrapper.find('CTableRow');
        expect(tableRows).toHaveLength(mockData.filter((ride) => ride.booker === 'Max').length);
    });

});

//Check HTTP request 
describe('Check if http requests are handled correct', () => {

    it('Fetches rides successfully', () => {

    });

    it('Handles error response', () => {

    });
});
