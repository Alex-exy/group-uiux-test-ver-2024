import Confirmation from "./Confirmation";
import { shallow, mount } from "enzyme";

const pressConfirm = (wrapper) => {
    let confirmButton = wrapper.find(".confirmButton")
    confirmButton.simulate("click");
}

const pressCancel = (wrapper) => {
    let cancelButton = wrapper.find(".cancelButton")
    cancel.simulate("click");
}

describe('Renders DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<Confirmation />)
    })

    //DOM Text Components
    it("Should Title be rendered as Please confirm you joining of the ride:", () => {
        let h2 = wrapper.find(".header").text();
        expect(h2).toBe("Please confirm you joining of the ride:");
    });

    it("Should Description be rendered as Summarized details of the selected ride:", () => {
        let div = wrapper.find(".description").text();
        expect(div).toBe("Summarized details of the selected ride:");
    });

    //DOM Buttons
    it("Should render Confirm for the Confirm button ", () => {
        let button = wrapper.find(".confirmButton").text();
        expect(button.text()).toBe("Confirm Joining");
    });

    it("Should render Cancel for the Cancel button", () => {
        let button = wrapper.find(".cancelButton").text();
        expect(button.text()).toBe("Cancel Joining");
    });

    //DOM Details List
    it("Should render Booker: for Booker Details", () => {
        let nameDetails = wrapper.find(".detName").text();
        expect(nameDetails.text()).toBe("Booker: ");
    });

    it("Should render To: for Destination Details", () => {
        let destinationDetails = wrapper.find(".detDest").text();
        expect(destinationDetails.text()).toBe("To: ");
    });

    it("Should render Leaves at: for Time Details", () => {
        let timeDetails = wrapper.find(".detTime").text();
        expect(timeDetails.text()).toBe("To: ");
    });
})

describe('Check Approval CModal', () => {
    let wrapper = shallow(<Confirmation showApproveModal={true} />)

    it("Check if Header is rendered correct", () => {
        let modalHeader = wrapper.find("CModalTitle");
        expect(modalHeader.text()).toBe("Joining Approved!");
    });

    it("Check if Body is rendered correct", () => {
        let modalBody = wrapper.find("CModalBody");
        expect(modalBody.text()).toBe("You will be redirected back to the Join-a-Ride page . . .");
    });

    it("Check if Button is rendered correct", () => {
        let modalButton = wrapper.find("CButton");
        expect(modalButton.text()).toBe("Ok");
    });

    it("Pressing Ok should redirect to Join a Ride", () => {

    });
})

describe('Check Cancel CModal', () => {
    let wrapper = shallow(<Confirmation shoCancelModal={true} />)

    it("Check if Header is rendered correct", () => {
        let modalHeader = wrapper.find("CModalTitle");
        expect(modalHeader.text()).toBe("Joining Canceled!");
    });

    it("Check if Body is rendered correct", () => {
        let modalBody = wrapper.find("CModalBody");
        expect(modalBody.text()).toBe("You will be redirected back to the Join-a-Ride page . . .");
    });

    it("Check if Button is rendered correct", () => {
        let modalButton = wrapper.find("CButton");
        expect(modalButton.text()).toBe("Ok");
    });

    it("Pressing Ok should redirect to Join a Ride", () => {

    });
})

describe('Check Button clicking actions', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<Confirmation />)
    })

    //FIX 

    it("Confirm Button should set showApprovedModal true", () => {
        let showApprove = wrapper.find(showApproveModal);
        pressConfirm(wrapper);
        expect(showApprove.showApproveModal).toBe(true);
    })

    it("Cancle Button should set showCancleModal true", () => {
        let showCancel = wrapper.find(showCancelModal);
        pressCancel(wrapper);
        expect(showCancel.showCancelModal).toBe(true);
    })
})

