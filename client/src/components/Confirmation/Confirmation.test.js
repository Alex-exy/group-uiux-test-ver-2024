import React from 'react';
import Confirmation from "./Confirmation";
import { shallow, mount } from "enzyme";

describe('Renders DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<Confirmation />)
    })

    //DOM Text Components
    it("Should Title be rendered as Please confirm you joining of the ride:", () => {
        let h2 = wrapper.find(".header").text();
        expect(h2).toBe("Please confirm your joining of the ride:");
    });
});