// =========================
// TRAVEL SEARCH
// =========================

function searchTravel() {

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const departure = document.getElementById("departure").value;
    const travellers = document.getElementById("travellers").value;

    if (from === "" || to === "" || departure === "") {
        alert("Please enter From, To and Departure date.");
        return;
    }

    localStorage.setItem("travelFrom", from);
    localStorage.setItem("travelTo", to);
    localStorage.setItem("travelDeparture", departure);
    localStorage.setItem("travelTravellers", travellers);

    window.location.href = "results.html";
}


// =========================
// EXPLORE NOW
// =========================

const exploreButton = document.querySelector(".explore-btn");

if (exploreButton) {

    exploreButton.addEventListener("click", function() {

        const destinations =
            document.querySelector(".destinations");

        if (destinations) {
            destinations.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// =========================
// LOGIN BUTTON
// =========================

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", function() {

        window.location.href = "login.html";

    });

}


// =========================
// SIGN UP BUTTON
// =========================

const signupButton = document.querySelector(".signup-btn");

if (signupButton) {

    signupButton.addEventListener("click", function() {

        window.location.href = "signup.html";

    });

}


// =========================
// BOOKING TABS
// =========================

const tabs = document.querySelectorAll(".tab");

tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        const selectedService =
            tab.textContent.trim();


        // HOTELS
        if (selectedService === "Hotels") {

            window.location.href = "hotels.html";

            return;
        }


        // TRAINS
        if (selectedService === "Trains") {

            window.location.href = "trains.html";

            return;
        }


        // FLIGHTS
        if (selectedService === "Flights") {

            window.location.href = "index.html";

            return;
        }


        // Other tabs
        tabs.forEach(function(item) {

            item.classList.remove("active");

        });

        tab.classList.add("active");

    });

});


// =========================
// SERVICE BUTTONS
// =========================

const serviceButtons =
    document.querySelectorAll(".service-card button");

serviceButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const serviceCard =
            button.closest(".service-card");

        if (!serviceCard) {
            return;
        }


        const serviceName =
            serviceCard.querySelector("h3");


        if (serviceName) {

            const name =
                serviceName.textContent.trim();


            // HOTEL SERVICE
            if (name === "Hotels") {

                window.location.href = "hotels.html";

                return;
            }


            // TRAIN SERVICE
            if (name === "Trains") {

                window.location.href = "trains.html";

                return;
            }

        }


        alert("Booking service selected!");

    });

});


// =========================
// PACKAGE BUTTONS
// =========================

const packageButtons =
    document.querySelectorAll(".package-bottom button");

packageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert("Travel package selected!");

    });

});


// =========================
// DESTINATION SELECTION
// =========================

function selectDestination(destination) {

    alert(
        "You selected " +
        destination +
        "!\n\n" +
        "Let's find the best travel options for you."
    );

}