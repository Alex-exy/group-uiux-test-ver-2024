import { CTable } from "@coreui/react";
import JoinARide from "./JoinARide";


describe('Render DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        //wrapper = shallow (<JoinARide />)
    })

    it("Should render Title as Join a Ride", () => {
        let h2 = wrapper.find("h2").text();
        expect(h2).toBe("Join a Ride");
    });

    it("Should render Description as Please click on the ride you want to join:", () => {
        let h4 = wrapper.find("h4").text();
        expect(h4).toBe("Please click on the ride you want to join:");
    });

    it("Should CTable rendered correctly", () => {
        let ctable = wrapper.find(CTable).find("");
        expect(ctable).toBe("");
    }); 

    it("Should CTable Header rendered correctly", () => {
 
    }); 
})

describe("Check CModal displays correct"), () => {
   
    it("Should Cmodal rendered correctly after clicked on element while logged out", () => {
        /*
        SIMULATE CLICK WHILE LOGGED OUT
        -> Check rendered element Title, Description
        */
    });

    it("Check CModal closes on OK click", () => {
        /*
        SIMULATE CLICK WHILE LOGGED OUT
        -> Check rendered element
        */
    });
}

describe("Check for displayed Ride elements inside CTable", () => {
    let wrapper = null;

    beforeEach(() => {
        //whapper = CTable ?
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

describe("Check operations for Clicking on Table elements", () => {
    let wrapper = null;
    
    const mockFunction = jest.fn();
    mockFunction.mockReturnValue(true);

    beforeEach(() => {
        //wrapper = CTable ? JoinARide
    })

    it("Display login info when user is not logged in"), () => {
        let logoutInput = wrapper
            .find(ride.id)
            .simulate("click")
        //logoutInput = wrapper.handleSelection.navigate();
        expect(handleSelection(mockFunction, true)).toBe(`/confirm-joining/${rideid}/Confirm`)
    };


    it("Redirect to join a ride page if user is logged in"), () => {
        let rideid = 1;
        let logoutInput = wrapper
            .find(ride.id)
            .simulate("click")
        //logoutInput = wrapper.handleSelection.navigate();
        expect(handleSelection(mockFunction, true)).toBe(`/confirm-joining/${rideid}/Confirm`)
    };
})

describe("Check fetching of available ride data", () => {
    let wrapper = null;

    it("Get joinable ride data from database"), () => {

    }

    it("Throw error if no rides are available"), () => {

    }
})