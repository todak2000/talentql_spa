import Dashboard from "./views/Home.js";
import Signup from "./views/Signup.js";
import Signin from "./views/Signin.js";
import Page404 from "./views/Page404.js";
import DynamicPage from "./views/DynamicPage.js";
import {accessType, userId, getMerchants, 
    registerUsers, loginUsers, getBookings, 
    defaultCity, getSigleMerchantSessions,
    bookSession, createSession 
} from "./utils/index.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        console.log([key, values[i]], "asads")
        return [key, values[i]];
    }));
};

export const navigateTo = url => {
    history.pushState({ prevUrl: location?.pathname || '/' }, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/register", view: Signup },
        { path: "/login", view: Signin },
        { path: "/bookings", view: Dashboard },
        { path: "/create_session", view: DynamicPage },
        { path: "/:id",  view: DynamicPage },
        { path: "/404", view: Page404 }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    console.log(match, "match")
    if (!match) {
        match = {
            route: routes[routes.length - 1],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    if (location?.pathname === '/' && !accessType) {
        location.href = '/login';
    }
    if (location?.pathname === '/' && accessType === "USER") {
        getMerchants()
    }
    if (location?.pathname === '/' && accessType === "MERCHANT") {
        getBookings(defaultCity || "lagos", userId, 1, 30)
    }
    

    if (location?.pathname === '/bookings') {
        // let city= defaultCity || "lagos"
        getBookings(defaultCity || "lagos")
    }
    // let id = document.getElementById('merchant-id').value
    if (location?.pathname === `/${document.getElementById('merchant-id')?.value}`) {
        console.log(location.pathname, "gg")
        getSigleMerchantSessions(id)
    }
    
    setTimeout(document.querySelector("#app").innerHTML = await view.getHtml()
    , 2000)
    // document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

function getData(x){
    console.log(x, "sds")
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        // console.log(e.target.id, "sfddsf")
        // navbar navigation
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
        // sign out function
        if (e.target.matches("[data-signout]")) {
            e.preventDefault();
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('accessType')
            // navigateTo('/login');
            location.href = '/login';
        }
        // dynamic page function
        if (e.target.matches("[data-merchantId]")) {
            e.preventDefault();
            if (location.pathname === '/' && accessType === "USER") {
                getSigleMerchantSessions(e.target.id)
                navigateTo(`/${e.target.id}`)
            }
        }
        // book a session page function
        if (e.target.matches("[data-bookings]")) {
            e.preventDefault();
            document.getElementById('card-result').style.display = "none";
            document.getElementById('bookings-form').style.display = "block";
            document.getElementById('sessionId').value = e.target.id;
            
        }
        // back to book a session page function
        if (e.target.matches("[data-diff]")) {
            e.preventDefault();
            document.getElementById('card-result').style.display = "grid";
            document.getElementById('bookings-form').style.display = "none";
            
        }
        // goback from un existing page
        if (e.target.matches("[data-back]")) {
            e.preventDefault();
            history.back();
        }
        // next/previous functionality
        if (e.target.matches("[data-page]")) {
            const current = JSON.parse(window.localStorage.getItem('current'))
            if (e.target.id == "next") {
                if (location?.pathname === '/bookings' && accessType === "USER") {
                    getBookings(defaultCity || "lagos", "", current+1)
                }
                else if (location?.pathname === '/' && accessType === "USER") {
                    getMerchants(current+1, "")
                }
                else if (location?.pathname === '/' && accessType === "MERCHANT") {
                    getBookings(defaultCity || "lagos", userId, current+1, 30)
                }
                // else if (location?.pathname === '/:id') {
                //     let id = document.getElementById('merchant-id').value
                //     getSigleMerchantSessions(id)
                // }
                
            }
            else if (e.target.id == "previous") {
                if (location?.pathname === '/bookings' && accessType === "USER") {
                    getBookings(defaultCity || "lagos", "", current-1)
                }
                else if (location?.pathname === '/' && accessType === "USER") {
                    getMerchants(current-1, "")
                }
                else if (location?.pathname === '/' && accessType === "MERCHANT") {
                    getBookings(defaultCity || "lagos", userId, current-1, 30)
                }
            }
        }
        // get merchant signup screen
        if (e.target.matches("[data-signup]")) {
            document.getElementById("signup-main").style.display = "none";
            document.getElementById("signup-form").style.display = "block";
            if (e.target.id == "merchant") {
                document.getElementById("dob").style.display = "none";
                document.getElementById("signup-header").innerText = "Register as a Merchant";
                document.getElementById("cityOfResidence").style.display = "none";
                document.getElementById("accessType").value = "MERCHANT";
                
            }
            else if (e.target.id == "user") {
                document.getElementById("signup-header").innerText = "Register as a User";
                document.getElementById("cityOfOperation").style.display = "none";
                document.getElementById("accessType").value = "USER";
            }
        }
        // get merchant signin screen
        if (e.target.matches("[data-signin]")) {
            document.getElementById("signin-main").style.display = "none";
            document.getElementById("signin-form").style.display = "block";
            if (e.target.id == "merchant") {
                document.getElementById("signup-header").innerText = "Login as a Merchant";
                document.getElementById("accessType").value = "MERCHANT";
                
            }
            else if (e.target.id == "user") {
                document.getElementById("signup-header").innerText = "Login as a User";
                document.getElementById("accessType").value = "USER";
            }
        }


        // register function
        if (e.target.matches("[data-register]")) {
            let userType = document.getElementById("accessType").value
            e.preventDefault();
            let formData
            if (userType === "USER") {
                formData = {
                    name: document.getElementById("name").value,
                    dob: document.getElementById("dob").value,
                    email: document.getElementById("email").value,
                    cityOfResidence: document.getElementById("cityOfResidence").value,
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                    phoneNumber: document.getElementById("phoneNumber").value
                }
            }
            else if (userType === "MERCHANT") {
                formData = {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    cityOfOperation: document.getElementById("cityOfOperation").value,
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                    phoneNumber: document.getElementById("phoneNumber").value
                }
            }
            // console.log(formData, "formData")
            registerUsers(userType, formData)
            
        }
        // login function
        if (e.target.matches("[data-login]")) {
            e.preventDefault();
            let formData = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                accessType: document.getElementById("accessType").value
            }
            loginUsers(formData)
        }
        
        // book a session function
        if (e.target.matches("[data-bookings-submit]")) {
            e.preventDefault();
            let formData
            formData = {
                sessionId: document.getElementById("sessionId").value,
                userId: userId,
                date: document.getElementById("date").value,
                notes: document.getElementById("notes").value,
                title: document.getElementById("title").value,

            }
            bookSession(formData)
            
        }

        // create a session function
        if (e.target.matches("[data-create-submit]")) {
            e.preventDefault();
            let formData
            formData = {
                startsAt: document.getElementById("startsAt").value+":00Z",
                endsAt: document.getElementById("endsAt").value+":00Z",
                type: document.getElementById("type").value,

            }
            if (document.getElementById("startsAt").value !== "" && document.getElementById("endsAt").value !== "") {
                createSession(formData)
            }
            else{
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").style.textAlign = "center"
                document.getElementById("message").innerText = "Sorry, the start or end time field is empty!";
            }
            
            
        }

        
    });

    router();

 

    // search functionality
    document.body.addEventListener("keydown", e => {
        
        if (location?.pathname === '/' && accessType === "USER") {
            getMerchants(1, e.target.value)
        }
        if (location?.pathname === '/bookings' && accessType === "USER") {
            // city, merchant="", offset=1, period=30
            let city = document.getElementById('select-location').value
            let merchant = document.getElementById('main-search').value
            let period = document.getElementById('select-period').value
            if (merchant !=="") {
                getBookings(city || defaultCity || "lagos", merchant, 1, period)
            }
            
        }

        // form name validation
        if (e.target.matches("[data-name]")) {
            if (e.target.value.length < 2 ) {
                document.getElementById("name-warning").innerText = "Name must not be less than 2 characters";
            }
            else{
                document.getElementById("name-warning").innerText = ""
            }
             
        }
        // form email validation
        if (e.target.matches("[data-email]")) {
            let emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let emailCheck = e.target.value.match(emailFormat);
            if (e.target.value.length < 2 || emailCheck === null) {
                document.getElementById("email-warning").innerText = "Email must not be less than 2 characters and be a valid email";
            }
            else{
                document.getElementById("email-warning").innerText = ""
            }
             
        }
        // form city validation
        if (e.target.matches("[data-cityOfResidence]") || e.target.matches("[data-cityOfOperation]")) {
            if (e.target.value.length < 2 || e.target.value.length > 25) {
                document.getElementById("city-warning").innerText = "City must not be less than 2 characters";
            }
            else{
                document.getElementById("city-warning").innerText = ""
            }
             
        }
        // form username validation
        if (e.target.matches("[data-username]")) {
            if (e.target.value.length < 5 || e.target.value.length > 25) {
                document.getElementById("username-warning").innerText = "Username must not be less than 6 characters";
            }
            else{
                document.getElementById("username-warning").innerText = ""
            }
             
        }
        // form password validation
        if (e.target.matches("[data-password]")) {
            let pwdFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
            let pwdCheck = e.target.value.match(pwdFormat);
            if (pwdCheck === null) {
                document.getElementById("password-warning").innerText = "Password must not be less than 6 characters which contain at least one numeric digit and a special character";
            }
            else{
                document.getElementById("password-warning").innerText = ""
            }
             
        }
        // form phoneNumber validation
        if (e.target.matches("[data-phoneNumber]")) {
            let phoneFormat = /^\d{10}$/
            let phoneCheck = e.target.value.match(phoneFormat);
            // if (e.target.value.length < 10 ) {
            if (phoneCheck === null) {
                document.getElementById("phoneNumber-warning").innerText = "Phone number must be 11 characters";
            }
            else{
                document.getElementById("phoneNumber-warning").innerText = ""
            }
             
        }
        
    });

    
});