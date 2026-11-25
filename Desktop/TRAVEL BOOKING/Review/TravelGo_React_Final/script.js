/* =====================================================
   TRAVEL SEARCH
===================================================== */

function searchTravel() {

    const from =
        document.getElementById("from").value.trim();

    const to =
        document.getElementById("to").value.trim();

    const departure =
        document.getElementById("departure").value;

    const travellers =
        document.getElementById("travellers").value;


    /* Validation */

    if (
        from === "" ||
        to === "" ||
        departure === ""
    ) {

        alert(
            "Please enter From, To and Departure date."
        );

        return;
    }


    /* Save search details */

    localStorage.setItem(
        "travelFrom",
        from
    );

    localStorage.setItem(
        "travelTo",
        to
    );

    localStorage.setItem(
        "travelDeparture",
        departure
    );

    localStorage.setItem(
        "travelTravellers",
        travellers
    );


    /* Set booking type */

    localStorage.setItem(
        "bookingType",
        "flight"
    );


    /* Open results */

    window.location.href =
        "results.html";
}


/* =====================================================
   DESTINATIONS
===================================================== */

function selectDestination(destination) {

    localStorage.setItem(
        "selectedDestination",
        destination
    );


    /*
       Put the selected destination
       into the "To" field.
    */

    const toInput =
        document.getElementById("to");


    if (toInput) {

        toInput.value =
            destination;

        /*
           Scroll back to booking box
           so the user can search.
        */

        const bookingBox =
            document.querySelector(".booking-box");


        if (bookingBox) {

            bookingBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }

}


/* =====================================================
   NAVIGATION
===================================================== */

function openFlights() {

    window.location.href =
        "index.html#booking";
}


function openHotels() {

    window.location.href =
        "hotels.html";
}


function openTrains() {

    window.location.href =
        "trains.html";
}


/* =====================================================
   LOGIN
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginButton =
            document.getElementById("loginButton");

        const signupButton =
            document.getElementById("signupButton");


        if (loginButton) {

            loginButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "login.html";

                }
            );

        }


        if (signupButton) {

            signupButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "signup.html";

                }
            );

        }

    }
);