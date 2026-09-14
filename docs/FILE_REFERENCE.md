# File-by-File Reference

## Root pages

| File | Purpose |
| --- | --- |
| `index.html` | Main marketing/content page, exercise filter, BMI UI, contact form, and embedded AI widget |
| `signup.html` | Browser-demo registration screen |
| `login.html` | Browser-demo sign-in screen |
| `forgot-password.html` | Browser-demo password-reset screen |
| `dashboard.html` | Local account dashboard, daily routine, workout log, and plan generator |
| `analytics.html` | Chart.js dashboard for browser-stored workout data |
| `generator.html` | Separate server-backed plan generator screen |
| `pricing.html` | Subscription display and Razorpay Checkout integration |
| `admin.html` | Contact-submission table backed by `/api/clients` |

## Root application files

| File | Purpose |
| --- | --- |
| `server.js` | Express static server, MySQL initialization, REST API, JWT, AI, and payment routes |
| `package.json` | Project metadata, commands, Node dependencies |
| `package-lock.json` | Reproducible dependency lock file |
| `.env.example` | Safe environment-variable template |
| `.gitignore` | Excludes secrets, dependencies, builds, logs, and caches |
| `requirements.txt` | Python dependency list |
| `workflow_architecture.md` | AI and voice data-flow details |

## Browser JavaScript

| File | Purpose | Linked status |
| --- | --- | --- |
| `js/auth.js` | Browser-demo accounts, PBKDF2, session, profile, reset, and page guards | Active on account/dashboard pages |
| `js/diet-planner.js` | Rule-based browser planner and renderer | Active on dashboard |
| `js/ai-coach.js` | Embedded AI/voice widget | Active on several public pages |
| `js/animations.js` | Theme, reveal, and shared interaction effects | Active on home/pricing |
| `auth-client.js` | Compatibility placeholder for home-page inclusion | Active placeholder |
| `cursor.js` | Custom pointer effects | Active on generator/admin |
| `theme-init.js` | Applies saved theme before page render | Active on generator/admin |
| `script.js` | Earlier full landing-page JavaScript implementation | Legacy/unlinked |
| `js/index.js` | Earlier home-page module | Legacy/unlinked |
| `js/workspace.js` | Alternative browser workout-store implementation | Legacy/unlinked |

## Styles

| File | Purpose | Linked status |
| --- | --- | --- |
| `styles/tokens.css` | Shared colours, spacing, typography, and design variables | Active |
| `styles/global.css` | Shared resets, layout, buttons, and common components | Active |
| `style.css` | Root page-specific shared styling | Active on generator/admin |
| `styles/auth.css` | Alternate extracted account-page styles | Legacy/unlinked; account pages use inline styles |
| `styles/index.css` | Alternate extracted landing-page styles | Legacy/unlinked; home page uses inline styles |

## Standalone chatbot

| File | Purpose |
| --- | --- |
| `public/index.html` | Standalone multilingual chatbot page |
| `public/style.css` | Standalone chatbot layout and visual design |
| `public/chatbot.js` | Language list, chat history, streaming response parser, and UI logic |
| `public/voice.js` | Active ES module imported by `chatbot.js`; language metadata, greetings, microphone and speech controls |

## Python modules

| File | Purpose |
| --- | --- |
| `fuaak_agent.py` | Receives a command-line message and calls the Groq chat endpoint |
| `openclaw_tools.py` | Runs `analytics.py` safely through a fixed subprocess interface |
| `analytics.py` | Aggregates JSON workout rows into heatmap and category data |

## Backend folder

| File | Purpose | Active status |
| --- | --- | --- |
| `backend/database.sql` | Canonical MySQL development schema | Active/setup |
| `backend/config/db.js` | PostgreSQL connection helper from an earlier architecture | Legacy; `server.js` uses MySQL directly |
| `backend/utils/email.js` | Nodemailer transport helper | Available but not connected to a route |
| `backend/utils/logger.js` | Winston file/console logger | Available but `server.js` currently uses console logging |

## Images

The `images/` folder contains exercise illustrations referenced by the exercise API, including strength, cardio, core, and yoga movements.

## Documentation and scripts

| Path | Purpose |
| --- | --- |
| `docs/` | Project report and complete developer/user documentation |
| `scripts/validate-project.js` | Cross-platform JavaScript syntax checker |
| `README.md` | GitHub project landing document |
| `SECURITY.md` | Security policy and production limitations |
| `CONTRIBUTING.md` | Branch, commit, review, and testing workflow |
| `CHANGELOG.md` | Notable project changes |

## Cleanup guidance

Legacy files have been documented rather than deleted because they may contain unfinished team work. Remove them only after the team confirms that no page or planned feature depends on them.
