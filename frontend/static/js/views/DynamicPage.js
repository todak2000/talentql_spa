import AbstractView from "./AbstractView.js";
import { Navbar } from "./Navbar.js";
import { accessType, current } from "../utils/index.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
        this.id = params.id
    }
    
    async getLoading() {
        return `Loading...`
    }
     

    async getHtml() {
        return [Navbar, 
            accessType && accessType === "USER" ?
            `
            <div class="main-section">
            <input type="text" id="merchant-id" hidden/>
            <a class="nav__link ml-2" id="signout" data-back>Go Back</a>
            <h1 class="merchant-hi">${history?.state?.prevUrl === '/' ? "Merchant "+this.id+" Studio": "Schedule a Session with "+this.id}</h1>
                <div class="flex-center bottom-fix">
                    <button class="pagination-btn" id="previous"  style="display:none" data-page>Previous ${current-1}</button>
                    <button class="pagination-btn" id="next" style="display:none" data-page>Next ${current+1}</button>
                </div>
                <section class="card-container" id="card-result">
                    <div class="loader"></div>
                </section>

                <div id="bookings-form">
                    <p id="message"></p>
                    <form>
                        <input class="form-input" type="text" id="sessionId" name="sessionId" data-sessionId  minlength="15" maxlength="100" required hidden />
                        
                        <input class="form-input" type="date" id="date" name="date" data-date  required />
                        <p id="no-warning"></p>
                        <input class="form-input" type="text" id="title" name="title" data-title  minlength="2" maxlength="75" placeholder="Title" />
                        <p id="title-warning"></p>
                        <textarea class="form-input" style="height:100px"  id="notes" name="notes" data-notes  minlength="2" maxlength="500" placeholder="Notes"></textarea>
                        <p id="notes-warning"></p>

        
                        <button class="form-btn" id="booking-sumbit-btn" data-bookings-submit>Submit</button>
                    </form>
                    <div class="bottom-signup"><p data-diff>Book different Session</p></div>
                </div>

            </div>
        `
            :
            `
            <div class="main-section">
                <h1 class="merchant-hi">${location.pathname === '/' ? "Dashboard": "Create New Session"}</h1>
                <div id="newsession-form">
                    <p id="message"></p>
                    <form>
                        <select class="form-input" id="period" name="period" data-period >
                            <option value="45" selected >Select preffered time slot</option>
                            <option value="45" >45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                        </select>
                        <select class="form-input" id="type" name="type" data-type >
                            <option value="WeekDay" selected >Select preffered Day type</option>
                            <option value="WeekDay">WeekDay (Mon - Fri)</option>
                            <option value="WeekEnd">WeekEnd (Sat)</option>
                        </select>
                        <div class="time-div">
                            <input class="form-time" type="text" id="startsAt" name="startsAt" data-startsAt   placeholder="Start Time" onfocus="(this.type='time')" required /> 
                            <input class="form-time" type="time" id="endsAt" name="endsAt" data-endsAt   placeholder="End Time" disabled />
                        </div>
                        <p id="no-warning"></p>
        
                        <button class="form-btn" id="create-sumbit-btn" data-create-submit>Submit</button>
                    </form>
                    <div class="bottom-signup"><a href="/create_session" class="nav__link mr-2" data-link>Create Another session</a></div>
                 
                </div>
                
            </div>
        `];
    }
}