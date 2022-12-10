import AbstractView from "./AbstractView.js";
import { Navbar } from "./Navbar.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("404 - Not Found");
        this.page = "404";
    }
     

    async getHtml() {

        return  `
        <nav class="nav">
            <div class="flex-row">
                <a href="/" class="nav__link name">Cut Session</a>
            </div>
            <div class="flex-row">
                <a class="nav__link ml-2" id="signout" data-back>Go Back</a>
            </div>
        </nav>
            <div class="main-section">
                <h1 id="signup-header">&#128533; Oops! Page does not Exist</h1>
            </div>
        `;
    }
}