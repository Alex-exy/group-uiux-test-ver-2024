import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rideReducer from "../../store/rideSlice";
import JoinARide from './JoinARide';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Renders DOM elements correctly', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        // Create a store with the necessary reducer and preloaded state
        store = configureStore({
            reducer: {
                ride: rideReducer, // Assuming rideReducer is a slice reducer for 'ride'
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

    afterEach(() => {
        wrapper.unmount();
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

    //Row Components
    it("Should Booker cell rendered correctly", () => {
        let cell = wrapper.find(".thisbooker").text();
        expect(cell).toBe("Booker");
    });

    it("Should Destination cell rendered correctly", () => {
        let cell = wrapper.find("#destination").text();
        expect(cell).toBe("Destination");
    });

    it("Should Vehicle Type cell rendered correctly", () => {
        let cell = wrapper.find("#type").text();
        expect(cell).toBe("Vehicle Type");
    });

    it("Should Battery Remaining cell rendered correctly", () => {
        let cell = wrapper.find("#battery").text();
        expect(cell).toBe("Battery Remaining");
    });

    it("Should Distance to Vehicle cell rendered correctly", () => {
        let cell = wrapper.find("#distance").text();
        expect(cell).toBe("Distance to Vehicle");
    });

    it("Should Departure Time cell rendered correctly", () => {
        let cell = wrapper.find("#time").text();
        expect(cell).toBe("Departure Time");
    });
})

//Table
describe('Check the rows of the table', () => {

    let wrapper;
    let store;

    beforeEach(() => {
        // Create a store with the necessary reducer and preloaded state
        store = configureStore({
            reducer: {
                ride: rideReducer, // Assuming rideReducer is a slice reducer for 'ride'
            },
            preloadedState: {
                ride: {
                    selectedRide: {}
                }
            }
        });

        const availableRides = [
            { id: 1, booker: 'Booker1', destination: 'Destination1', vehicleType: 'Type1', battery: 'Battery1', distanceToVehicle: 'Distance1', departureTime: 'Time1' },
        ];

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <JoinARide availableRides={availableRides} />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    //FIX 
    it("Check if table row has six elements", () => {
        let row = wrapper.find("#rideRow").first();
        expect(row.find('#rideRow').length).toBeGreaterThan(0);
        expect(row.children().length).toEqual(6);
    });


    // FIX - mock function ?
    it("Check if redirected after click on Row", () => {
        const handleSelection = jest.fn();
        wrapper.find('#rideRow').first().simulate('click');

        /*
        const row = wrapper.find('#rideRow').first();
        row.simulate('click');
        */

        expect(handleSelection).toHaveBeenCalled();
    });
});

//FIX - TypeError: _axios.default.post.mockImplementation is not a function

//Fetching
describe('Check if fetching rides works correctly', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Fetches rides successfully', () => {
        axios.post.mockImplementation(() => ({
            data: [{ id: 1, status: 'Share' }, { id: 2, status: 'Share' }]
        }));
        fetchAvailableRides();
        expect(setAvailableRides).toHaveBeenCalledWith([{ id: 1, status: 'Share' }, { id: 2, status: 'Share' }]);
    });

    it('Handles fetch error', () => {
        axios.post.mockImplementation(() => {
            throw new Error('Failed to fetch rides');
        });
        fetchAvailableRides();
        expect(console.log).toHaveBeenCalledWith('Failed to fetch rides', expect.any(Error));
    });
});