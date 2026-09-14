# User Guide

## Start the application

Run `npm start` and open `http://localhost:5000`. Use the server URL instead of opening an HTML file directly.

## Home page

The home page provides:

- Main navigation and mobile menu
- Platform feature overview
- Workout programme information
- Food and exercise sections
- Exercise category filters
- BMI screening interface
- Testimonials
- Contact form
- Theme switcher
- Embedded AI coach

The BMI and planning tools provide general educational estimates only. They are not diagnosis or treatment. Users under 18 should not use adult screening categories or generated targets without a parent/guardian and a qualified healthcare professional.

## Create a browser-demo account

1. Open `signup.html`.
2. Enter first name, last name, email, password, and confirmation.
3. Use a password with at least eight characters, one uppercase letter, and one number.
4. Select **Create My Account**.
5. The page creates the local demo account and signs in automatically.

The demo account stays only in the current browser profile. It is not a MySQL account.

## Sign in

1. Open `login.html`.
2. Enter the same email and password used during signup.
3. Select **Sign In**.
4. A successful login opens `dashboard.html`.

The tab session expires after eight hours and is cleared when the browser session ends.

## Password recovery

The recovery page is present, but recovery is not implemented. Submission shows a clear unavailable message and leaves the account unchanged. A secure reset needs proof of ownership, such as a single-use emailed token; an email address alone is not sufficient.

## Dashboard

After login, the dashboard displays:

- First name from the active browser session
- A predefined routine for the current weekday
- Workout-entry form
- Today's saved entries
- General plan-generation panel
- Link to analytics

### Save a workout entry

1. Select an exercise.
2. Enter valid sets and repetitions.
3. Enter `0` for a bodyweight movement or a non-negative load value.
4. Select **Save Workout**.

The dashboard stores demo entries in browser local storage. Use the delete control beside an entry to remove it.

### Generate a general plan

Complete the requested choices and select **Generate My Plan**. The dashboard uses a browser-based rules engine; it does not call an AI service. Treat output as a software demonstration, not an individualized health prescription.

## Analytics

Open `analytics.html` from the dashboard. Its charts read `limitless_workouts`, whereas the dashboard writes `__lf_workout_log__`. As a result, new dashboard entries will not appear in the charts until these data sources are connected. Do not describe the charts as a verified end-to-end feature during the demo.

## Smart generator page

`generator.html` is separate from the dashboard planner. It calls a protected server API and therefore requires the server JWT flow. Because the visible login currently uses browser-demo authentication, this integration is marked as pending.

## AI coach

### Embedded widget

1. Select the floating chat button.
2. Type a short wellness question and send it.
3. The widget calls `/api/chat`.
4. With Python and the Groq key configured, the reply appears in the chat.

For voice input, allow microphone access. When a message begins through the microphone, the browser can read the response aloud.

### Standalone multilingual chatbot

Open `http://localhost:5000/public/`.

1. Choose a language.
2. Enter text or select the microphone.
3. Enable or disable automatic speech output.
4. Send the message.

The page uses streaming responses from `/api/chat/stream`.

## Pricing and payments

The pricing screen supports monthly/yearly display and Razorpay Checkout. Configure Razorpay test keys before testing. Do not enter a real payment unless the project owner has deliberately configured and reviewed a production deployment.

## Contact form

1. Open the contact section on the home page.
2. Enter name, email, goal category, and a message of 10–2000 characters.
3. Submit the form.

The Express server validates and saves the entry in MySQL.

## Theme

Use the moon/sun control on supported pages. The choice is stored under `limitless_theme` in browser local storage.

## Privacy notes

- Do not enter real private health information in a classroom/demo build.
- Do not share `.env` or API keys.
- Browser-demo accounts and workout entries are visible to anyone with access to the same unlocked browser profile.
- AI responses may be inaccurate; verify important health information with a qualified professional.
