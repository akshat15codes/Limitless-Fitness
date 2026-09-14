# Features and Implementation Status

This document separates implemented features from backend-ready and incomplete integrations.

## Public website

| Feature | Main files | Status |
| --- | --- | --- |
| Responsive landing page | `index.html`, shared styles | Implemented |
| Desktop and mobile navigation | `index.html`, `js/animations.js` | Implemented |
| Light/dark theme | `theme-init.js`, `js/animations.js` | Implemented |
| Workout programme cards | `index.html`, `server.js` | Static UI and API available |
| Exercise category filtering | `index.html` | Implemented in browser |
| Exercise images and API library | `images/`, `/api/exercises` | Implemented |
| BMI screen | `index.html`, `/api/bmi` | Implemented; educational screening only |
| Testimonials | `index.html`, `/api/testimonials` | Static UI and API available |
| Contact form | `index.html`, `/api/contact` | Implemented with MySQL |
| Newsletter field | `index.html` | UI-only demonstration |

## Accounts

| Feature | Main files | Status |
| --- | --- | --- |
| Signup | `signup.html`, `js/auth.js` | Browser-demo implementation |
| Login | `login.html`, `js/auth.js` | Browser-demo implementation |
| Logout and session expiry | `dashboard.html`, `js/auth.js` | Browser-demo implementation |
| Password recovery | `forgot-password.html`, `js/auth.js` | Disabled with a clear message; verified reset flow pending |
| PBKDF2 password derivation | `js/auth.js` | Implemented |
| MySQL registration and login | `/api/auth/register`, `/api/auth/login` | Backend implemented |
| JWT cookie/token verification | `server.js` | Backend implemented |
| Unified frontend/server auth | — | Pending |
| Email reset and verification | `backend/utils/email.js` | Utility only; route pending |

## Dashboard and analytics

| Feature | Main files | Status |
| --- | --- | --- |
| Daily routine | `dashboard.html` | Implemented |
| Workout entry and deletion | `dashboard.html` | Implemented in browser storage |
| Per-browser log retention | `dashboard.html` | Implemented |
| Analytics page | `analytics.html` | Chart code exists; reads a different key from the current dashboard |
| Chart.js charts | `analytics.html` | Implemented |
| MySQL workout log API | `/api/workouts/log` | Backend implemented |
| MySQL workout history API | `/api/workouts/history` | Backend implemented |
| MySQL analytics API | `/api/dashboard/analytics` | Backend implemented |
| Unified dashboard/analytics/MySQL records | — | Pending; currently three separate data sources |

## Planning and content

| Feature | Main files | Status |
| --- | --- | --- |
| Rule-based browser plan | `js/diet-planner.js`, `dashboard.html` | Implemented |
| Server plan route | `/api/generate-plan`, `generator.html` | Implemented; requires server JWT |
| Regional food options | `js/diet-planner.js`, `server.js` | Implemented |
| General training schedule | `js/diet-planner.js`, `server.js` | Implemented |

All generated health content is an educational estimate, not diagnosis or treatment. It should not be used to create restrictive or intensive plans for minors.

## AI and voice

| Feature | Main files | Status |
| --- | --- | --- |
| Embedded AI widget | `js/ai-coach.js` | Implemented |
| Python/Groq bridge | `fuaak_agent.py`, `/api/chat` | Implemented; key and Python required |
| Analytics wrapper | `openclaw_tools.py`, `analytics.py` | Implemented as optional helper |
| Standalone chatbot | `public/` | Implemented |
| Streaming responses | `/api/chat/stream` | Implemented |
| Groq primary provider | `server.js` | Implemented when configured |
| Anthropic fallback | `server.js` | Implemented when configured |
| Indian-language prompts | `server.js`, `public/chatbot.js` | Implemented |
| Speech recognition | `js/ai-coach.js`, `public/voice.js` | Browser-dependent |
| Speech synthesis | `js/ai-coach.js`, `public/voice.js` | Browser-dependent |

## Payments and administration

| Feature | Main files | Status |
| --- | --- | --- |
| Pricing page | `pricing.html` | Implemented |
| Server-controlled price map | `server.js` | Implemented |
| Razorpay order creation | `server.js` | Implemented when configured |
| HMAC signature verification | `server.js` | Implemented |
| Persist subscription after visible checkout | — | Pending integration |
| Save contact submissions | `server.js`, MySQL `clients` | Implemented |
| View client submissions | `admin.html`, `/api/clients` | Backend/UI present |
| Dedicated admin role enforcement | — | Pending; required before production |

## Repository quality

| Item | Status |
| --- | --- |
| Environment template without committed secrets | Implemented |
| MySQL schema matching the active server | Implemented |
| JavaScript syntax validator | Implemented |
| Python dependency file | Implemented |
| Complete GitHub documentation | Implemented |
| Unit/API/browser automation tests | Pending |
| CI workflow | Pending |
