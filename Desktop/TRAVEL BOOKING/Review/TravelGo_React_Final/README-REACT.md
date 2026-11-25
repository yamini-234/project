# TravelGo – React booking history upgrade

## Run
1. Install Node.js (18+).
2. Open this folder in VS Code.
3. Run `npm install` and then `npm run dev`.
4. Open the Vite URL printed in the terminal.

The existing HTML booking/search/payment pages are retained so the current flow continues to work. The booking-history dashboard is built with React + Vite. Open `history.html` from the app or from the home page's **My Bookings** link.

## Booking history behaviour
After a ticket reaches `confirmation.html`, the confirmed ticket is saved in browser `localStorage` under `bookingsByUser`, indexed by the signed-in account email. A successful user login now opens `history.html`, where the user can see their saved confirmation tickets. The login navigation also includes **My Bookings**. Refreshing the page does not duplicate the same booking ID.

## Important demo limitation
This project currently uses browser localStorage and demo authentication/payment. Records are available only in the same browser/device and can be cleared by the browser. For real users and cross-device booking history, connect a backend (for example Node/Express + MongoDB) and use secure password hashing and payment-gateway verification. Do not store real passwords in localStorage.


Booking history fix: successful payments now save a normalized ticket under the signed-in user email in `bookingsByUser`. The My Bookings page also imports older entries from `allBookings` when their email matches the signed-in account.
