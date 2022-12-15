import AbstractView from "./AbstractView.js";
import { Navbar } from "./Navbar.js";
import { getMerchants } from "../utils/index.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Sign ip");
        this.page = "signin"
    }
    

    async getHtml() {

        return [Navbar, 
            `
            <div class="main-section">
                <h1 id="signup-header">Login as</h1>
                <div class="signup-div flex-row" id="signin-main">
                    <button class="dif-btn" id="merchant" data-signin>Merchants</button>
                    or
                    <button class="dif-btn" id="user" data-signin>Users</button>
                </div>

                <div id="signin-form">
                <p id="error"></p>
                <form>
                    <input class="form-input" type="text" id="username" name="username" data-username  minlength="6" maxlength="20" placeholder="Username" required />
                    <input class="form-input" type="password" id="password" name="password" data-password  minlength="6"  placeholder="Password" required />
                    <input class="form-input" type="text" id="accessType" name="accessType" data-accessType  hidden />
                    <button class="form-btn" id="signin-sumbit-btn" data-login>Submit</button>
                </form>
                <div class="bottom-signup"><a href="/login" class="nav__link mr-2" data-link>Back</a></div>
                </div>
            </div>
        `];
    }
}