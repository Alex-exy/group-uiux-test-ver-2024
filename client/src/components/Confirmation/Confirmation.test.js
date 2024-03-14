import React from 'react';
import Confirmation from "./Confirmation";
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rideReducer from "../../store/rideSlice";
import { BrowserRouter as Router } from 'react-router-dom';

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
                    <Confirmation />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    //DOM Text Components
    it("Should Title be rendered as Please confirm you joining of the ride:", () => {
        let h2 = wrapper.find(".header").text();
        expect(h2).toBe("Please confirm your joining of the ride:");
    });
    it("Should Description be rendered as Summarized details of the selected ride:", () => {
        let div = wrapper.find(".description").text();
        expect(div).toBe("Summarized details of the selected ride:");
    });

    //DOM Buttons
    it("Should render Confirm for the Confirm button ", () => {
        let button = wrapper.find("#confirmButton").text();
        expect(button).toBe("Confirm Joining");
    });

    it("Should render Cancel for the Cancel button", () => {
        let button = wrapper.find("#cancelButton").text();
        expect(button).toBe("Cancel Joining");
    });

    //Detail list components
    it("Detail list name rendered correctly", () => {
        let details = wrapper.find(".detName").text();
        expect(details).toBe("Booker:  ");
    });

    it("Detail list destination rendered correctly", () => {
        let destination = wrapper.find(".detDest").text();
        expect(destination).toBe("To:  ")
    });

    it("Detail list rendered correctly", () => {
        let time = wrapper.find(".detTime").text();
        expect(time).toBe("Leaves at:  ");
    });
});

//Buttons
describe('Check buttons working as expected', () => {
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
                    <Confirmation />
                </Router>
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    //FIX 
    it("Confirm Button should set showApprovedModal true, approvealModal exists", () => {
        const confirmButton = wrapper.find("#confirmButton");
        confirmButton.simulate('click');
        //Framework issue
        expect(wrapper.find('#approvalModal').exists()).toBe(true);
        //expect(wrapper.getByText('Joining Approved!')).toBeVisible(); 
        //Alternative method check if it exists
        const header = wrapper.find('#approvalHeader').text();
        expect(header).toBe('Joining Approved!');
    });

    it("Cancel Button should set showCancleModal true, cancelModal exists", () => {
        // Method 1
        const cancelButton = wrapper.find("#cancelButton");
        cancelButton.simulate('click');
        //Framework issue
        expect(wrapper.find('#cancelModal').exists()).toBe(true);
        //expect(wrapper.getByText('Joining Canceled!')).toBeVisible();
        //Alternative method check if it exists
        const header = wrapper.find('#cancelHeader').text();
        expect(header).toBe('Joining Canceled!');
    });
});

//Check HTTP request
describe('Check if http response at confirm or cancle works correcty', () => {

})


//CModal Tests not working because of Testing Framework does not support rendering the CModal
//Theoretical tests - Should work accordingly, but will not because of framework issues

describe('Check Approval CModal', () => {
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
                <Confirmation />
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('Render approval Modal', () => {
        const button = wrapper.find('.confirmButton');
        button.simulate('click');
        //Expected output would be true, due to mentioned framework issues is false
        expect(wrapper.find('#approvalModal').prop('visible')).toBe(true);
    });

    it("Check if Header is rendered correct", () => {
        let modalHeader = wrapper.find("#approvalHeader");
        expect(modalHeader.text()).toBe("Joining Approved!");
    });

    it("Check if Body is rendered correct", () => {
        let modalBody = wrapper.find("#approvalBody");
        expect(modalBody.text()).toBe("You will be redirected back to the Join-a-Ride page . . .");
    });

    it("Check if Button is rendered correct", () => {
        let modalButton = wrapper.find("#approvalOkBody");
        expect(modalButton.text()).toBe("Ok");
    });

    it("Pressing Ok should close the Modal", () => {
        let ok = wrapper.find("#approvalOkButton");
        ok.simulate("click");
        expect(wrapper.find('#approvalModal').prop('visible')).toBe(false);;
    });
})

describe('Check Cancel CModal', () => {
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
                <Confirmation />
            </Provider>
        );
    });

    it('Render cancel Modal', () => {
        const row = wrapper.find('.cancelButton');
        row.simulate('click');
        //Expected output would be true, due to mentioned framework issues is false
        expect(wrapper.find('#cancelModal').prop('visible')).toBe(true);
    });

    it("Check if Header is rendered correct", () => {
        let modalHeader = wrapper.find("#cancelHeader");
        expect(modalHeader.text()).toBe("Joining Canceled!");
    });

    it("Check if Body is rendered correct", () => {
        let modalBody = wrapper.find("#cancelBody");
        expect(modalBody.text()).toBe("You will be redirected back to the Join-a-Ride page . . .");
    });

    it("Check if Button is rendered correct", () => {
        let modalButton = wrapper.find("#cancelOkBody");
        expect(modalButton.text()).toBe("Ok");
    });

    it("Pressing Ok should close the Modal", () => {
        let ok = wrapper.find("#cancelOkButton");
        ok.simulate("click");
        expect(wrapper.find('#cancelModal').prop('visible')).toBe(false);;
    });
});
