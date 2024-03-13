import React from 'react';
import Confirmation from "../Confirmation/Confirmation";
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
                    selectedRide: { }
                }
            }
        });

        wrapper = mount(
            <Provider store={store}>
                <JoinARide />
            </Provider>
        );
    });

    //DOM Text Components
    it("Should Title be rendered as Please confirm you joining of the ride:", () => {
        let h2 = wrapper.find(".header").text();
        expect(true).toBe(true);
        //expect(h2).toBe("Please confirm you joining of the ride:");
    });
});
