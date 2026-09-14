# Security Policy

## Development status

Limitless Fitness is an educational development project. It has not completed a production security review and should be used with test data only.

## Reporting a vulnerability

Do not post passwords, API keys, tokens, private user data, or exploitable details in a public issue. Contact the repository owner privately or use the repository's private security-reporting feature when enabled.

Include:

- A short description of the issue
- Affected file or route
- Safe reproduction steps using test data
- Expected and actual behaviour
- Suggested mitigation, if known

## Secret management

- Commit `.env.example`, never `.env`.
- Use separate development and production credentials.
- Rotate a secret immediately if it appears in Git history, logs, screenshots, or chat.
- Do not rely only on deleting a committed secret; revocation/rotation is required.
- Use Razorpay test keys during development.

## Security controls already present

- bcrypt password hashing for MySQL users
- PBKDF2 and per-user salt in the browser-demo auth module
- HTTP-only JWT cookie support
- Parameterized MySQL queries
- CORS origin allowlist
- Payment signature verification
- Input limits on several public routes
- HTML escaping in several dynamic views
- Python child-process timeout and no shell execution
- Secrets excluded through `.gitignore`

## Known security limitations

### Browser-demo authentication

The visible account flow uses browser storage. It is appropriate only for a local demonstration. Browser storage is controlled by the device user and can be read or changed by scripts running on the same origin.

### Split authentication systems

The browser pages and server APIs use separate account systems. Protected features may appear signed out even when the browser-demo dashboard is open.

### Admin authorization

`/api/clients`, `/api/clients/:id`, and the delete route require a valid JWT but do not enforce an administrator role. Do not expose these routes with real data until role-based authorization is added.

### Payment integration

The visible checkout verification route is not unified with authenticated subscription persistence. Do not grant paid access based only on the current browser response.

### Password reset

Password recovery is deliberately disabled and returns an unavailable response. It does not change account data. A secure server implementation needs single-use, hashed, expiring reset tokens and controlled email delivery. Knowing an email address is not proof of account ownership.

### Shared local workout data

Dashboard and analytics storage keys are not scoped per account. Different accounts using the same browser profile can see the same local records. Do not enter private health information.

### Static source exposure

`server.js` serves the repository root with `express.static`. Non-dot source files such as server code, SQL and package metadata can be downloaded. Before deployment, explicitly serve only intended frontend files; keep server source and configuration outside the static directory.

### CSRF and rate limiting

Cookie-authenticated state-changing routes need CSRF protection. Route-specific rate limits should be enabled for authentication, contact, AI, and payment endpoints.

### Security headers

The project declares `helmet` but does not currently apply a reviewed Content Security Policy. Inline scripts and external CDN assets must be inventoried before enabling a strict policy.

### Logging and privacy

Production logs must not include passwords, JWTs, payment secrets, AI keys, private messages, or unnecessary health-related information.

## Production security checklist

- [ ] Unify frontend and server authentication.
- [ ] Add admin roles and least-privilege authorization.
- [ ] Add CSRF protection and route-specific rate limits.
- [ ] Validate every request with consistent schemas.
- [ ] Apply reviewed security headers/CSP.
- [ ] Add secure email verification and password reset.
- [ ] Consolidate payment routes and make callbacks idempotent.
- [ ] Add dependency, secret, and code scanning in CI.
- [ ] Add privacy, retention, export, and deletion controls.
- [ ] Use HTTPS and secure production cookies.
- [ ] Use a restricted MySQL account and encrypted connections.
- [ ] Complete penetration and accessibility testing.

## Health-information safety

The application must not present generated content as medical advice. Avoid collecting unnecessary health data. Add professional review, age-appropriate controls, clear consent, and emergency guidance before any real health-data deployment.
