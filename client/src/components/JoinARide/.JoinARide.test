import React from 'react';
import JoinARide from "./JoinARide";
import { CTable } from "@coreui/react";
import { shallow, mount } from "enzyme";

// experimental
import Adapter from 'enzyme-adapter-react-15';
EnzymeAdapter.configure({adapter: new Adapter() })

//FIX
const clickOnRow = (wrapper) => {
    let row = wrapper.find(".CTableRow")
    row.simulate("click");
}

describe('Render DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(<JoinARide />)
    })

    //DOM Text Components
    it("Should render Title as Join a Ride", () => {
        let h2 = wrapper.find(".header").text();
        expect(h2).toBe("Join a Ride");
    });

    it("Should render Description as Please click on the ride you want to join:", () => {
        let h4 = wrapper.find("description").text();
        expect(h4).toBe("Please click on the ride you want to join:");
    });


    //FIX 
    it("Should CTable rendered correctly", () => {
        let ctable = wrapper.find(CTable).find("");
        expect(ctable).toBe("");
    });

    it("Should CTable Header rendered correctly", () => {

    });
})


describe("Check CModal displays correct", () => {
    let wrapper = shallow(<JoinARide loginInfo={true} />)

    it("Check if modal is rendered correct", () => {
        let modalHeader = wrapper.find("CModalTitle");
        expect(modalHeader.text()).toBe("Please login to join a ride!");
    });

    it("Pressing Ok should close the modal", () => {

    });
})


describe("Check for displayed Ride elements inside CTable", () => {
    let wrapper = null;

    beforeEach(() => {
        whapper = shallow(<JoinARide />)
    })

    it("Table should have x rendered elements"), () => {
        /* Pseudocode
        let elements = wrapper.find("CTableRow");
        expect(elements).columns(x)
        */
    };

    it("Table should have no data displayed"), () => {
        /* Pseudocode
        let elements = wrapper.find("CTableRow");
        expect(elements).columns(x)
        */
    };
})

describe("Check click while logged in", () => {
    let wrapper = shallow(<JoinARide isLoggedIn={true} />)

    //?
    it("Redirect to join a ride page if user is logged in", () => {
        let rideid = 1;
        let logoutInput = wrapper
            .find(ride.id)
            .simulate("click")
        //logoutInput = wrapper.handleSelection.navigate();
        expect(handleSelection(mockFunction, true)).toBe(`/confirm-joining/${rideid}/Confirm`)
    });
})

describe("Check click while logged out", () => {
    let wrapper = shallow(<JoinARide isLoggedIn={false} />)

    //FIX 
    it("Display login info when user is not logged in", () => {
        let showInfo = wrapper.find(loginInfo);
        expect(showInfo.loginInfo).toBe(false);

    });
})

describe("Check fetching of available ride data", () => {
    let wrapper = null;

    //FIX
    it("Get joinable ride data from database"), () => {
    }

    it("Throw error if no rides are available"), () => {
    }
})
