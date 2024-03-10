import LoginButton from "./LoginButton";

// PSEUDOCODE

escribe('Render DOM elements correctly', () => {
    let wrapper = null;

    beforeEach(() => {
        //wrapper = shallow (<LoginButton />)
    })

    if ("Check if Button default render Login", () => {

    })

        it("Check if Button displays Login if Logged Out", () => {
            let button = wrapper.find("login").text();
            expect(button.displayFalse).toBe(false);
        })

    it("Check if Button displays Logout if Logged In", () => {
        let button = wrapper.find("logut").text();
        expect(button.displayTrue).toBe(true);
    })

    if ("Check if Loading symbol is displayed", () => {

        /*
         while isLoading = true
        display loading symbol 
        */
    })

})
