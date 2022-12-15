
const url = `
https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856
`;

const cardMain = document.createElement("div");
document.addEventListener("DOMContentLoaded", () => {
    let options = {method: 'GET', headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'}};
    let scripts = document.getElementsByTagName('script');
    var merchantId= scripts[0].getAttribute('id');
    cardMain.innerHTML+=`<div class="loader"></div>`;
    document.body.appendChild(cardMain);
    fetch(`${url}/studios/${merchantId}`, options)
      .then(response => response.json())
      .then(response => {
        cardMain.style.width = "80%";
        cardMain.style.padding = "1% 0";
        cardMain.style.height = "40vh";
        cardMain.style.display = "grid";
        cardMain.style.gridTemplateColumns = "auto auto auto auto";
        cardMain.style.marginLeft = "auto";
        cardMain.style.marginRight = "auto";
        
        if (response.length > 0) { 
            cardMain.innerHTML="";
            response.forEach(x => {
                cardMain.innerHTML+=`
                <div class="cardy" id="${x.id}" data-merchantId>
                    <div class="innder-cardy" id="${x.id}" data-merchantId></div>
                    <h5 class="card-h5">Type: ${x.type}</h5>
                    <h5 class="card-h5">Period: ${x.startsAt.slice(0,-8)} - ${x.endsAt.slice(0,-8)}</h5>
                    <button type="button" class="btn-book" id="${x.id}"  data-bookings>Book this session</button>
                </div>
                `;
            });
            document.body.appendChild(cardMain);
        }
        else{
            cardMain.innerHTML+=`
                <p>Sorry no data yet!</p>
            `
        }
       
        
      }).catch(err => console.error(err));

      const cardModal = document.createElement("div");
      document.body.addEventListener("click", e => {
        if (e.target.matches("[data-bookings]")) {
            e.preventDefault();
            cardModal.innerHTML+="";
            document.body.appendChild(cardModal);
            cardModal.style.width = "40%";
            cardModal.style.padding = "10% 30%";
            cardModal.style.height = "100vh";
            cardModal.style.backgroundColor="#00000040";
            cardModal.style.position = "fixed";
            cardModal.style.top = "0";
            cardModal.style.zIndex = 1000;
            cardModal.innerHTML+=`
                
                <form>
                    <p data-diff style="cursor:pointer">X</p>
                    <p id="message"></p>
                    <input class="form-input-widget" type="text" id="sessionId" name="sessionId" data-sessionId  minlength="15" maxlength="100" required hidden />
                    
                    <input class="form-input-widget" type="date" id="date" name="date" data-date  required />
                    <p id="no-warning"></p>
                    <input class="form-input-widget" type="text" id="title" name="title" data-title  minlength="2" maxlength="75" placeholder="Title" />
                    <p id="title-warning"></p>
                    <textarea class="form-input-widget" style="height:100px"  id="notes" name="notes" data-notes  minlength="2" maxlength="500" placeholder="Notes"></textarea>
                    <p id="notes-warning"></p>


                    <button class="form-btn" type="button" id="booking-sumbit-btn" data-bookings-submit>Submit</button>

                    <div class="bottom-signup"><p data-diff>Book different Session</p></div>
                </form>
                
            `
            
            document.body.appendChild(cardModal);
            document.getElementById('sessionId').value = e.target.id;
            
        }
        if (e.target.matches("[data-bookings-submit]")) {
            e.preventDefault();
            let btn = document.getElementById('booking-sumbit-btn')
            btn.disabled = true;
            btn.innerText = "Submitting Data..."
            let formData
            formData = {
                sessionId: document.getElementById("sessionId").value,
                userId: merchantId,
                date: document.getElementById("date").value,
                notes: document.getElementById("notes").value,
                title: document.getElementById("title").value,

            }
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Prefer: 'code=200, dynamic=true'},
                body: JSON.stringify(formData) 
              };
              
              fetch(`${url}/bookings`, options)
                .then(response => response.json())
                .then(response => {
                    document.getElementById("message").style.display = "none";
                    document.getElementById("message").innerText = "";
                    if (response.errors) {
                        document.getElementById("message").style.display = "block";
                        document.getElementById("message").style.color = "red";
                        document.getElementById("message").style.textAlign = "center"
                        document.getElementById("message").innerText = "Oops! an error occured";
                        btn.innerText = "Submit Again";
                        btn.disabled = false;
                    }
                    else{
                        document.getElementById("message").style.display = "block";
                        document.getElementById("message").style.color = "green";
                        document.getElementById("message").style.textAlign = "center"
                        document.getElementById("message").innerText = "Studio Session successfully booked!";
                        btn.innerText = "Completed!"
                        
                    }
                    console.log(response)
                })
                .catch(err => console.error(err));
            
        }
        if (e.target.matches("[data-diff]")) {
            e.preventDefault();
            cardModal.innerHTML="";
            document.body.appendChild(cardModal);
            cardModal.remove();
        }

    });
});