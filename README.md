# PowerShare — Frontend Prototype

A clickable, frontend-only prototype for **PowerShare**, a South African battery
rental platform that lets households and small businesses rent portable
EcoFlow batteries during load shedding. Built for a university capstone
presentation with HTML5, CSS3, and vanilla JavaScript only — no frameworks,
no backend, no database.

## Running it

No build step. Open `index.html` (the splash screen) directly in any modern
browser, or serve the folder locally for the smoothest experience:

```bash
cd PowerShare
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. An internet connection is needed once, to
load Google Fonts (Inter, Roboto) and Material Icons from their CDNs — the
rest of the app has no external dependencies.

## Structure

```
PowerShare/
├── index.html                  Splash screen
├── welcome.html                Onboarding / intro
├── login.html                  Customer + business login
├── register.html                Sign-up (name, phone, SA ID, address)
├── home.html                   Customer home feed
├── battery-catalogue.html      Browse & filter batteries
├── battery-details.html        Battery specs + Book Now
├── booking.html                Dates, pickup/delivery, quantity
├── payment.html                Card / EFT / cash
├── booking-confirmation.html   Success + QR code + receipt
├── my-rentals.html             Active / upcoming / completed
├── rental-details.html         Agreement + extend/return
├── return-battery.html         Return checklist & condition
├── notifications.html          Reminders, payments, promos
├── profile.html                Personal details, rental stats
├── settings.html                Dark mode, language, privacy
├── customer-support.html       FAQ, WhatsApp/call/email, report issue
├── about.html                  Mission, vision, contact, version
├── admin-dashboard.html        Business: revenue, fleet, bookings
├── inventory.html              Business: battery fleet & charge levels
├── bookings.html                Business: pending/approved/cancelled
├── customers.html               Business: customer list & balances
├── reports.html                 Business: revenue & utilization charts
├── business-settings.html       Business: pricing, hours, delivery zones
├── css/
│   ├── style.css                Design tokens, typography, buttons, forms
│   ├── components.css           Nav bars, cards, badges, admin chrome
│   └── responsive.css           Breakpoints (phone frame on desktop review)
├── js/
│   ├── main.js                  Dummy data + toasts + validation helpers
│   ├── navigation.js             Active states, tabs, sheets, steppers
│   └── animations.js             Ripple, reveals, splash auto-advance, transitions
└── images/                       Reserved for icons/assets (Material Icons used inline)
```

## Design system

- **Palette:** Primary `#2E7D32`, Accent `#FFC107`, Background `#F5F5F5`,
  Text `#212121`, Success `#4CAF50`, Error `#F44336`.
- **Type:** Inter (headings/UI), Roboto (body).
- **Signature element:** the *charge ring* — a circular charge-level
  indicator reused across battery details, rental status, and admin
  inventory, tying every screen back to the product's emotional core:
  how much power is left.
- Every screen shares one `.app-shell` frame sized to 390×844, with a
  bottom navigation bar (Home · Batteries · Rentals · Notifications ·
  Profile) on customer-facing pages and a fixed sidebar on business pages.

## Prototype behaviour

- All data (batteries, rentals, notifications, customers, bookings) is
  dummy data defined in `js/main.js` and rendered client-side.
- Forms validate with vanilla JS (email format, SA phone numbers, 13-digit
  SA ID numbers, password match) — there is no server round-trip.
- Booking selections are passed between `booking.html` → `payment.html` →
  `booking-confirmation.html` via `localStorage`, purely to make the flow
  feel continuous; nothing is sent anywhere.
- The business/admin side is reachable from the login screen via a
  "Business / admin login" link, for demonstration purposes only — there
  is no real authentication.

## Presentation notes

This is a design and interaction prototype only. It is not connected to any
backend, payment processor, or real inventory system.
