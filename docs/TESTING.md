# Testing Guide

## Current automated checks

Install dependencies:

```bash
npm ci
```

Run JavaScript syntax validation:

```bash
npm test
```

The validator checks 17 JavaScript files, including backend utilities and the validator itself, with the active Node executable. Browser ES modules are parsed in module mode.

Run Python compile checks:

```bash
npm run check:python
```

Direct equivalent:

```bash
python -m py_compile analytics.py fuaak_agent.py openclaw_tools.py
```

These checks detect syntax errors. They do not prove browser, database, AI, or payment behaviour.

## Manual smoke test

### Startup

- [ ] `npm start` completes without a fatal error.
- [ ] MySQL success or a clear database warning appears.
- [ ] `GET /api/health` returns HTTP 200.
- [ ] Home page loads at `http://localhost:5000`.

### Navigation and design

- [ ] Desktop navigation links open the correct pages/sections.
- [ ] Mobile menu opens and closes.
- [ ] Theme toggle persists after refresh.
- [ ] Pages have no horizontal overflow at 360 px width.
- [ ] Keyboard focus remains visible on controls.

### Browser-demo accounts

- [ ] Signup rejects missing or invalid fields.
- [ ] Signup accepts a valid demo account.
- [ ] Duplicate demo email is rejected.
- [ ] Login rejects an incorrect password.
- [ ] Login opens the dashboard with valid data.
- [ ] Logout clears the demo session.
- [ ] Password recovery shows an unavailable message.
- [ ] A recovery attempt does not change stored credentials or the current session.

### Dashboard and analytics

- [ ] Today's routine renders.
- [ ] Invalid workout entries are rejected.
- [ ] A valid entry appears immediately.
- [ ] Deleting an entry updates the page.
- [ ] Refresh preserves the entry.
- [ ] Record the known dashboard/analytics storage mismatch; the charts must not be reported as connected.
- [ ] Empty analytics state is clear and does not crash.

### Public APIs

- [ ] `/api/workouts` returns an array.
- [ ] `/api/workouts?level=beginner` filters the result.
- [ ] `/api/exercises?category=yoga` filters the result.
- [ ] `/api/testimonials` returns an array.
- [ ] `/api/contact` rejects invalid input.
- [ ] A valid contact submission appears in MySQL.

### Server authentication and protected APIs

- [ ] Register creates a user with a bcrypt hash.
- [ ] Duplicate registration returns 409.
- [ ] Login rejects invalid credentials.
- [ ] Login sets an HTTP-only cookie.
- [ ] A protected endpoint rejects a missing token.
- [ ] Workout records are scoped to the authenticated user.

### AI

- [ ] Embedded chat handles missing input.
- [ ] Embedded chat reports missing Python/provider configuration clearly.
- [ ] A configured Groq request returns a text reply.
- [ ] Standalone streaming chat displays incremental tokens.
- [ ] Provider fallback is tested only with authorized test keys.
- [ ] Microphone permission denial does not break text chat.
- [ ] AI output is inserted as text rather than raw HTML.

### Payments

- [ ] Use Razorpay test mode only.
- [ ] Invalid plan/cycle is rejected.
- [ ] Server order amount matches the trusted price map.
- [ ] Missing signature fields are rejected.
- [ ] Invalid signature is rejected.
- [ ] Successful test verification returns a success response.

## API smoke examples

Health:

```bash
curl http://localhost:5000/api/health
```

Workout catalogue:

```bash
curl "http://localhost:5000/api/workouts?level=beginner"
```

Contact validation:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d "{}"
```

## Future automated test structure

```text
tests/
├── unit/
│   ├── validation.test.js
│   └── analytics.test.js
├── integration/
│   ├── auth-api.test.js
│   ├── workouts-api.test.js
│   └── contact-api.test.js
└── e2e/
    ├── account-flow.spec.js
    └── dashboard-flow.spec.js
```

Recommended priorities:

1. Extract `app` from `server.js` so Supertest can start it without opening a fixed port.
2. Use a separate test database.
3. Mock AI and Razorpay calls.
4. Add browser automation for signup, login, dashboard, and analytics.
5. Run checks in CI for every pull request.

## Test-data rules

- Use fake names, email addresses, and records.
- Never place real API keys in tests.
- Never make a real payment during automated testing.
- Do not use real private health information.
