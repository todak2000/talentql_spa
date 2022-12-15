import AbstractView from "./AbstractView.js";
import { Navbar } from "./Navbar.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sign up");
        this.page = "signup"
    }
    

    async getHtml() {

        return [Navbar, 
            `
            <div class="main-section">
                <h1 id="signup-header">Register as</h1>
                <div class="signup-div flex-row" id="signup-main">
                    <button class="dif-btn" id="merchant" data-signup>Merchants</button>
                    or
                    <button class="dif-btn" id="user" data-signup>Users</button>
                </div>

                <div id="signup-form">
                <p id="error"></p>
                <form>
                    <input class="form-input" type="text" id="name" name="name" data-name  minlength="2" maxlength="25" placeholder="Name" required />
                    <p id="name-warning"></p>
                    <input class="form-input" type="email" id="email" name="email" data-email  minlength="2" maxlength="50" placeholder="Email" required />
                    <p id="email-warning"></p>
                    <input class="form-input" type="text" id="dob" name="dob" data-dob   placeholder="Date of Birth" onfocus="(this.type='date')" required />
                    <p id="no-warning"></p>
                    <input class="form-input" type="text" id="cityOfResidence" name="cityOfResidence" data-cityOfResidence  minlength="2" maxlength="20" placeholder="City of Residence" />
                    <input class="form-input" type="text" id="cityOfOperation" name="cityOfOperation" data-cityOfOperation  minlength="2" maxlength="20" placeholder="City of Operation" required/>
                    <p id="city-warning"></p>
                    <input class="form-input" type="text" id="username" name="username" data-username  minlength="6" maxlength="20" placeholder="Username" required />
                    <p id="username-warning"></p>
                    <input class="form-input" type="password" id="password" name="password" data-password  minlength="6"  placeholder="Password" required />
                    <p id="password-warning"></p>
                    <input class="form-input" type="text" id="phoneNumber" name="phoneNumber" data-phoneNumber  minlength="10" maxlength="20" placeholder="Phone Number" />
                    <p id="phoneNumber-warning"></p>
                    <input class="form-input" type="text" id="accessType" name="accessType" data-accessType  hidden />
                    <button class="form-btn" id="signup-sumbit-btn" data-register>Submit</button>
                </form>
                <div class="bottom-signup"><a href="/register" class="nav__link mr-2" data-link>Back</a></div>
                </div>
            </div>
        `];
    }
}