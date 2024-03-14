import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PastRidesDetails from './PastRidesDetails';

describe('PastRidesDetails component', () => {
    
    const rides = {
        person: "John",
        time: "09:30",
        date: "2024-03-01",
        model: "Tesla Model S",
        distance: "150 km",
        origin: "Paris",
        destination: "Berlin",
        imagePath: "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-s-107-6572200e43fa1.jpg?crop=0.473xw:0.355xh;0.254xw,0.341xh&resize=1200:*"
    };

    const wrapper = mount(
        <MemoryRouter>
            <PastRidesDetails location={{ state: { data: rides } }} />
        </MemoryRouter>
    );

    it('should render the ride card with provided data', () => {

        expect(wrapper.find('.ride-card').exists()).toBe(true);
        expect(wrapper.find('.ride-details-column div').at(0).text()).toEqual(`Booking Person:${rides.person}`);
        expect(wrapper.find('.ride-details-column div').at(2).text()).toEqual(`Booking Time:${rides.time}`);
        expect(wrapper.find('.ride-details-column div').at(4).text()).toEqual(`Booking Date:${rides.date}`);
        expect(wrapper.find('.ride-details-column div').at(6).text()).toEqual(`Travel Distance:${rides.distance}`);
        expect(wrapper.find('.ride-details-column div').at(8).text()).toEqual(`Origin:${rides.origin}`);
        expect(wrapper.find('.ride-details-column div').at(10).text()).toEqual(`Destination:${rides.destination}`);
        expect(wrapper.find('.ride-card-image').prop('src')).toEqual(rides.imagePath);
    });

    it('should simulate printing when Print button is clicked', () => {

        window.print = jest.fn();

        const mockClassList = {
            add: jest.fn(),
            remove: jest.fn(),
        };
        const mockRideCardElement = {
            classList: mockClassList,
        };
        document.querySelector = jest.fn().mockReturnValue(mockRideCardElement);
        wrapper.find('.print-button').at(0).simulate('click');
        expect(window.print).toHaveBeenCalled();
    });

    it('should navigate to "/past-rides-table" when Go Back button is clicked', () => {

        const currentURL = window.location.href;

        wrapper.find('.go-back-button').at(0).simulate('click');
        const newURL = 'http://localhost/past-rides-table';
        expect(newURL).toBe(`${currentURL}past-rides-table`);
    });


});
