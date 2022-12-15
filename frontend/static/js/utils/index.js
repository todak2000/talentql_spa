const url = `
https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856
`;

import { navigateTo } from "../index.js";

export const accessType = JSON.parse(window.localStorage.getItem('accessType'))
export const current = JSON.parse(window.localStorage.getItem('current'))
export const userId = window?.localStorage?.getItem('userId')
export const defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'))
export const token = JSON.parse(window.localStorage.getItem('token'))

export function loginUsers(data){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'},
        body: JSON.stringify(data) 
      };
      
      fetch(`${url}/sign-in`, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("error").style.display = "none";
            document.getElementById("error").innerText = "";
            if (response.errors) {
                document.getElementById("error").style.display = "block";
                document.getElementById("error").innerText = "Oops! an error occured";
            }
            else{
                localStorage.setItem("token", JSON.stringify(response.token));
                localStorage.setItem("accessType", JSON.stringify(data.accessType));
                if (history?.state?.prevUrl === undefined) {
                    setTimeout(location.href = '/', 2000);
                }
                else if (history?.state?.prevUrl !== '/login' && history?.state?.prevUrl !== '/register' && history?.state?.prevUrl !== undefined ) {
                    setTimeout(location.href = history?.state?.prevUrl, 2000); 
                }
                else {
                    setTimeout(location.href = '/', 2000);
                }
                
            }
        })
        .catch(err => console.error(err));
}
export function registerUsers(userType, data){
    let typeOfUser
    if (userType === "USER") {
        typeOfUser = "users"
    }
    else if (userType === "MERCHANT") {
        typeOfUser = "merchants"
    }
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'},
        body: JSON.stringify(data)
    };
      fetch(`${url}/register/${typeOfUser}`, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("error").style.display = "none";
            document.getElementById("error").innerText = "";
            if (response.errors) {
                document.getElementById("error").style.display = "block";
                document.getElementById("error").innerText = "Oops! an error occured";
            }
            else{
                localStorage.setItem("defaultCity", JSON.stringify(data.cityOfOperation || data.cityOfResidence));
                localStorage.setItem("userId", response.userId || response.merchantId);
                navigateTo('/login');
                
            }
        })
        .catch(err => console.error(err));
}
export function getMerchants(offset=1, query=""){
    
    let options = {method: 'GET', headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'}};
    fetch(`${url}/clients?type=MERCHANT&limit=20&offset=${offset}&city=${query}&name=${query}`, options)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem("merchantData", JSON.stringify(response.data));
        
        // resulting data
        if (response.data.length > 0) { 
            document.getElementById('card-result').innerHTML="";
            response.data.forEach(x => {
                if (x.merchantId) {
                    document.getElementById('card-result').innerHTML+=`
                    <div class="cardy" id="${x.merchantId}" data-merchantId>
                        <div class="innder-cardy" id="${x.merchantId}" data-merchantId></div>
                        <h5 class="card-h5">${x.name}</h5>
                        <h5 class="card-h5">${x.cityOfOperation}</h5>
                    </div>
                    `; 
                }
                
            });
        }
        else{
            document.getElementById('card-result').innerHTML="";
            document.getElementById('card-result').innerHTML+=`
                <p>Sorry no data yet!</p>
            `
        }
        // next/previous
        let next = document.getElementById("next")
        let previous = document.getElementById("previous")
        localStorage.setItem("current", JSON.stringify(offset));
        if (response.next) {
            next.style.display= "block"
        }
        if (response.previous) {
            previous.style.display= "block"
        }
        
      }).catch(err => console.error(err));
}


    
export function getBookings(city, merchant="", offset=1, period=30){
    let dayDate = new Date().toISOString().slice(0, 10);
    let future =  new Date()
    future.setDate(future.getDate() + period);
    let futureDate = future.toISOString().split('T')[0];
    let p = `${dayDate}:${futureDate}`
    let options = {method: 'GET', headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'}};
    fetch(`${url}/bookings?limit=20&offset=${offset}&city=${city}&merchant=${merchant}&period=${p}`, options)
      .then(response => response.json())
      .then(response => {
        // resulting data
        if (response.data.length > 0) { 
            document.getElementById('card-result').innerHTML="";
            response.data.forEach(x => {
                document.getElementById('card-result').innerHTML+=`
                <div class="cardy" id="${x.bookingId}">
                    <div class="innder-cardy"></div>
                    <h5 class="card-h5">${x.title}</h5>
                    <h5 class="card-h5">${x.notes}</h5>
                    <h5 class="card-h5">Date: ${x.date}</h5>
                    <h5 class="card-h5">Time: ${x.startsAt.slice(0, -8)} - ${x.endsAt.slice(0, -8)}</h5>
                    
                </div>
                `;
            });
        }
        else{
            document.getElementById('card-result').innerHTML="";
            document.getElementById('card-result').innerHTML+=`
                <p>Sorry no data yet!</p>
            `
        }
        // next/previous
        let next = document.getElementById("next")
        let previous = document.getElementById("previous")
        localStorage.setItem("current", JSON.stringify(offset));
        if (response.next) {
            next.style.display= "block"
        }
        if (response.previous) {
            previous.style.display= "block"
        }
        
      }).catch(err => console.error(err));
}

export function getSigleMerchantSessions(merchantId){
    let options = {method: 'GET', headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'}};
    
    fetch(`${url}/studios/${merchantId}`, options)
      .then(response => response.json())
      .then(response => {
        document.getElementById('merchant-id').value = merchantId;
        // resulting data
        if (response.length > 0) { 
            document.getElementById('card-result').innerHTML="";
            response.forEach(x => {
                document.getElementById('card-result').innerHTML+=`
                <div class="cardy" id="${x.id}" data-merchantId>
                    <div class="innder-cardy" id="${x.id}" data-merchantId></div>
                    <h5 class="card-h5">Type: ${x.type}</h5>
                    <h5 class="card-h5">Period: ${x.startsAt.slice(0,-8)} - ${x.endsAt.slice(0,-8)}</h5>
                    <button type="button" class="btn-book" id="${x.id}"  data-bookings>Book this session</button>
                </div>
                `;
            });
        }
        else{
            document.getElementById('card-result').innerHTML="";
            document.getElementById('card-result').innerHTML+=`
                <p>Sorry no data yet!</p>
            `
        }
       
        
      }).catch(err => console.error(err));
}

export function bookSession(data){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'},
        body: JSON.stringify(data) 
      };
      
      fetch(`${url}/bookings`, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").innerText = "";
            let btn = document.getElementById('booking-sumbit-btn');
        
            if (response.errors) {
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").style.textAlign = "center"
                document.getElementById("message").innerText = "Oops! an error occured";
                btn.disabled = false;
                btn.innerText = "Submit Again"
            }
            else{
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").style.textAlign = "center"
                document.getElementById("message").innerText = "Studio Session successfully booked!";
                btn.disabled = true;
                btn.innerText = "Completed!"
            }
        })
        .catch(err => console.error(err));
}

export function createSession(data){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'},
        body: JSON.stringify(data) 
      };
      fetch(`${url}/studios/${userId}`, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("message").style.display = "none";
            document.getElementById("message").innerText = "";
            let btn = document.getElementById('create-sumbit-btn');
            
            if (response.errors) {
                btn.disabled = false;
                btn.innerText = "Submit Again"
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "red";
                document.getElementById("message").style.textAlign = "center"
                document.getElementById("message").innerText = "Oops! an error occured";
            }
            else{
                document.getElementById("startsAt").disabled=true,
                document.getElementById("endsAt").disabled=true,
                document.getElementById("type").disabled=true,
                document.getElementById("create-sumbit-btn").disabled=true,
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").style.textAlign = "center"
                document.getElementById("message").innerText = "Studio Session successfully created!";
                btn.disabled = true;
                btn.innerText = "Completed!"
            }
        })
        .catch(err => console.error(err));
}
