# Limitless Fitness

Limitless Fitness is a college web project built with HTML, CSS, JavaScript, Node.js and MySQL. It includes account pages, workout logging, an exercise library, charts, a rule-based planner and an AI chat interface. This README explains the uploaded code and the parts that still need integration.

> **Health notice:** The project is an educational software prototype, not medical advice. BMI, meal, workout, and wellness outputs are general estimates. Users under 18 should use health-related features only with a parent/guardian and a qualified healthcare professional.

## Project status

This repository is a development build. The account and dashboard pages contain local browser logic. Server APIs require MySQL or external services where noted. Syntax and isolated checks have passed, but a full browser and server demo has not been verified in the review environment.

Two authentication implementations currently exist:

- The visible login, signup and dashboard flow uses browser storage for demonstration. Password recovery is disabled until account-ownership verification is implemented.
- `server.js` also provides MySQL/JWT authentication APIs for future full server integration.

See [Known limitations](#known-limitations) before production use.

## Main features

- Responsive landing page with light/dark theme and mobile navigation
- Workout programme and exercise-library content
- Browser-demo signup, login and logout; password-recovery screen with a clear unavailable message
- Personal dashboard with routine display and workout logging
- Analytics charts using a separate local dataset; dashboard-to-analytics integration is pending
- Rule-based diet and training plan generator
- Embedded text/voice AI coach
- Standalone multilingual streaming chatbot
- Contact form stored in MySQL
- Admin client-list screen
- Razorpay order and signature-verification routes
- Node.js, MySQL, and optional Python analytics/AI bridge

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Charts | Chart.js |
| Backend | Node.js, Express.js |
| Database | MySQL 8+, `mysql2` |
| Authentication | Browser Web Crypto demo; JWT and bcrypt API |
| AI | Groq API, optional Anthropic fallback, Python bridge |
| Voice | Web Speech Recognition and Speech Synthesis APIs |
| Payments | Razorpay Checkout and server-side HMAC verification |
| Utilities | Python 3, Requests, Winston, Nodemailer |

## Quick start

### Requirements

- Node.js 20 or newer
- npm
- MySQL 8 or newer
- Python 3.10 or newer for the Python AI route

### Run locally

```bash
git clone https://github.com/sarveshchaudhary0021/Limitless-Fitness-.git
cd Limitless-Fitness-
npm ci
```

Create `.env` from `.env.example`, replace every placeholder, then initialize MySQL:

```bash
mysql -u root -p < backend/database.sql
```

Install the optional Python dependency and start the application:

```bash
python -m pip install -r requirements.txt
npm start
```

Open <http://localhost:5000>.

For complete Windows and VS Code instructions, read [Installation](docs/INSTALLATION.md).

## Useful URLs

| Screen | Local URL |
| --- | --- |
| Home | `http://localhost:5000/` |
| Login | `http://localhost:5000/login.html` |
| Signup | `http://localhost:5000/signup.html` |
| Dashboard | `http://localhost:5000/dashboard.html` |
| Analytics | `http://localhost:5000/analytics.html` |
| Smart generator | `http://localhost:5000/generator.html` |
| Pricing | `http://localhost:5000/pricing.html` |
| Admin screen | `http://localhost:5000/admin.html` |
| Standalone AI coach | `http://localhost:5000/public/` |
| API health | `http://localhost:5000/api/health` |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Express server |
| `npm run dev` | Start with Nodemon auto-reload |
| `npm test` | Run JavaScript syntax checks |
| `npm run check` | Run the repository JavaScript validator |
| `npm run check:python` | Compile-check the Python modules |

## Documentation

- [Documentation index](docs/README.md)
- [Complete project report](docs/PROJECT_REPORT.md)
- [College demo and viva guide](docs/COLLEGE_DEMO.md)
- [Features and implementation status](docs/FEATURES.md)
- [Architecture and data flow](docs/ARCHITECTURE.md)
- [API reference](docs/API_REFERENCE.md)
- [Database design](docs/DATABASE.md)
- [User guide](docs/USER_GUIDE.md)
- [Admin guide](docs/ADMIN_GUIDE.md)
- [Testing guide](docs/TESTING.md)
- [Verification report](docs/VERIFICATION.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [VS Code to GitHub push guide](docs/GITHUB_PUSH_GUIDE.md)
- [File-by-file reference](docs/FILE_REFERENCE.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)
- [Change log](CHANGELOG.md)

## Project structure

```text
Limitless-Fitness-/
├── backend/                 # Database schema and backend utilities
├── docs/                    # Complete project documentation
├── images/                  # Exercise images
├── js/                      # Browser modules
├── public/                  # Standalone streaming chatbot UI
├── scripts/                 # Repository validation utilities
├── styles/                  # Shared design system CSS
├── *.html                   # Application pages
├── server.js                # Express API and static server
├── analytics.py             # Workout aggregation helper
├── fuaak_agent.py           # Python-to-Groq chat bridge
├── openclaw_tools.py        # Safe Python analytics wrapper
├── package.json             # Node dependencies and commands
└── requirements.txt         # Python dependencies
```

## Environment variables

The complete template is in `.env.example`. Important values include:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- `GROQ_API_KEY`, `CLAUDE_API_KEY`, `PRIMARY_AI`
- `PYTHON_BIN`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Optional email settings

Never commit `.env`, API keys, database passwords, JWT secrets, or payment secrets.

## Known limitations

- Browser-demo authentication and server JWT authentication are not yet unified.
- Dashboard workout data is stored locally in the browser; protected workout APIs store separate MySQL data.
- The admin API requires a valid JWT but does not yet enforce an admin role.
- Password recovery is disabled; entering an email alone must not reset an account.
- Dashboard entries use `__lf_workout_log__`, while analytics reads `limitless_workouts`. New dashboard entries do not currently feed the charts.
- Both local workout keys are shared within the browser profile, not isolated per signed-in account.
- The pricing page verifies a payment signature but does not currently connect that checkout flow to server-side subscription persistence.
- Email utilities exist but are not connected to a public password-reset or notification route.
- Several legacy/experimental files are retained for reference and are identified in the file guide.
- Automated browser, API, and database integration tests are not yet included; current `npm test` performs syntax validation.

These items should be completed before real public deployment.

## License

The package metadata declares the ISC license. Add a repository `LICENSE` file after the project owner confirms the final copyright holder.
