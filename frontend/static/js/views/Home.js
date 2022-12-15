import AbstractView from "./AbstractView.js";
import { Navbar } from "./Navbar.js";
import { accessType, current,userId } from "../utils/index.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
        this.page = "dashboard"
    }
    
    async getLoading() {
        return `Loading...`
    }
     

    async getHtml() {

        return [Navbar, 
            accessType && accessType === "USER" ?
            `
            <div class="main-section">
            <h1 class="merchant-hi">${location.pathname === '/' ? " Dashboard": "Scheduled Bookings"}</h1>
                <section class="search-container">
                    <input type="text" id="main-search" class="search-input" placeholder="Search ${location.pathname === '/' ? "by merchant or city": "booked merchants"}"/>
                    ${location.pathname === '/bookings' ? `<select class="select-input" id="select-period">
                        <option value="30" selected >Next One month</option>
                        <option value="7">Next One week</option>
                        <option value="60">Next Two months</option>
                        <option value="90">Next Three months</option>
                        <option value="120">Next Six months</option>
                    </select>
                    <input type="text" class="search-input" placeholder="Enter Location" id="select-location"/>
                    `:""}
                </section>

                <div class="flex-center bottom-fix">
                    <button class="pagination-btn" id="previous"  style="display:none" data-page>Previous</button>
                    <button class="pagination-btn" id="next" style="display:none" data-page>Next</button>
                </div>
                
                <section class="card-container" id="card-result">
                    <div class="loader"></div>
                </section>
                
            </div>
        `
            :
            `
            <div class="main-section">
                <div class="flex-row">
                    <h1 class="merchant-hi">${location.pathname === '/' ? " Session Bookings": "Create New Session"}</h1>
                    <button data-modal>Expose Widget</button>
                </div>
                <div class="flex-center bottom-fix">
                    <button class="pagination-btn" id="previous"  style="display:none" data-page>Previous</button>
                    <button class="pagination-btn" id="next" style="display:none" data-page>Next</button>
                </div>
                
                <section class="card-container" id="card-result">
                    <div class="loader"></div>
                </section>
                
            </div>
        `];
    }
}