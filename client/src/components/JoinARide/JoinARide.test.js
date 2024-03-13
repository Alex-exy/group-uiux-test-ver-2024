import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rideReducer from "../../store/rideSlice";
import JoinARide from './JoinARide';

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
                <JoinARide />
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

    //Row Components
    it("Should Booker cell rendered correctly", () => {
        let cell = wrapper.find("#booker").text();
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

    it("One Table row should have 6 elements", () => {
        let elements = wrapper.find("#rideRow");
        const children = elements.children;
        expect(children.length).toBe(6);
    });

    it("Check if redirected after click on Row", () => {
        const handleSelection = jest.fn();
        const row = wrapper.find('[data-testid="rideList"]').first();
        row.simulate('click');
        expect(handleSelection).toHaveBeenCalled();
    });
});

//FIX
//Fetching
describe('Check if fetching rides works correctly', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Fetches rides successfully', async () => {
        axios.post.mockImplementation(() => ({
            data: [{ id: 1, status: 'Share' }, { id: 2, status: 'Share' }]
        }));
        fetchAvailableRides();
        expect(setAvailableRides).toHaveBeenCalledWith([{ id: 1, status: 'Share' }, { id: 2, status: 'Share' }]);
    });

    it('Handles fetch error', async () => {
        axios.post.mockImplementation(() => {
            throw new Error('Failed to fetch rides');
        });
        fetchAvailableRides();
        expect(console.log).toHaveBeenCalledWith('Failed to fetch rides', expect.any(Error));
    });
});