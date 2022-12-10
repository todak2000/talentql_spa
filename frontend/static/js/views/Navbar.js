import { token, accessType } from "../utils/index.js"

let currentPage = location.pathname
if (currentPage ==='/login' || currentPage ==='/register') {
    window.localStorage.removeItem('token')
}
console.log(currentPage, "cur page")
export const Navbar = token && currentPage !=='/login' && currentPage !=='/register' ?
`
    <nav class="nav">
        <div class="flex-row mobile-hide" >
            <a href="/" class="nav__link name">Cut Session</a>
        </div>
        <div class="flex-row">
            <span class="profile-img">AU</span>
            <a href="/" class="nav__link ml-2" data-link>Dashboard</a>
            ${accessType && accessType === "USER" ? `<a href="/bookings" class="nav__link ml-2" data-link>Bookings</a>`:`<a href="/create_session" class="nav__link ml-2" data-link>Create</a>`}
            <a class="nav__link ml-2" id="signout" data-signout>Logout</a>
        </div>
    </nav>
`:
`
    <nav class="nav">
        <div class="flex-row">
            <a href="/" class="nav__link name">Cut Session</a>
        </div>
        <div class="flex-row">
            <a href="/register" class="nav__link mr-2" data-link>Register</a>
            <a href="/login" class="nav__link ml-2" data-link>Login</a>
        </div>
    </nav>
`
;
