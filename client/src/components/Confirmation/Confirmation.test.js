import Confirmation from "./Confirmation";

//PSEUDOCODE

describe('Render DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        //wrapper = shallow (<Confirmation />)
    })

    it("Should render Title as Please confirm you joining of the ride:", () => {
        let h2 = wrapper.find("h2").text();
        expect(h2).toBe("Please confirm you joining of the ride:");
    });

    it("Should div rendered as - - - Summary details of the selected ride - - -", () => {
        let div = wrapper.find("div").text();
        expect(div).toBe("- - - Summary details of the selected ride - - -");
    });

    it("Should Confirm button rendered correct", () => {
        let button = wrapper.find(button).find("confirmButton");
        expect(button.text()).toBe("Confirm Joining");
    });

    it("Should Cancel button rendered correct", () => {
        let button = wrapper.find(button).find("cancelButton");
        expect(button.text()).toBe("Cancel Joining");
    });

    it("Check if Approve CModal is rendered correct", () => {

    })

    it("Check if Cancel CModal is rendered correct", () => {
        
    })
})

describe('Check both Button clicking actions'), () => {
    let wrapper = null;

    beforeEach(() => {
        //wrapper = shallow (<Confirmation />)
    })

    it("Confirm Button should render Approved CModal"), () => {

    }

    it("Cancle Button should render Cancel CModal"), () => {
        
    }

    it("Pressing Ok on Approve CModal should redirect to Join a Ride"), () => {
        
    }

    it("Pressing Ok on Cancel CModal should redirect to Join a Ride"), () => {
        
    }
}

