# REST API Reference

## Base URL

Local development:

```text
http://localhost:5000
```

All request and response bodies use JSON unless the endpoint is documented as Server-Sent Events.

## Authentication

Protected endpoints accept either:

- The HTTP-only `token` cookie created by `/api/auth/register` or `/api/auth/login`.
- `Authorization: Bearer <jwt>`.

Common authentication responses:

- `401 Unauthorized`: token missing.
- `403 Forbidden`: token invalid or expired.

## Endpoint summary

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/workouts` | No | List workout programmes |
| GET | `/api/exercises` | No | List exercises |
| GET | `/api/testimonials` | No | List testimonials |
| POST | `/api/bmi` | No | Return an educational BMI screening result |
| POST | `/api/auth/register` | No | Create a MySQL user and JWT |
| POST | `/api/auth/login` | No | Authenticate a MySQL user |
| POST | `/api/auth/logout` | No | Clear the auth cookie |
| GET | `/api/auth/me` | Cookie | Return the signed-in API user |
| POST | `/api/workouts/log` | Yes | Store a user workout record |
| GET | `/api/workouts/history` | Yes | Return user workout records |
| GET | `/api/dashboard/today` | Yes | Return the day's routine and plan tier |
| GET | `/api/dashboard/analytics` | Yes | Aggregate MySQL workout records |
| POST | `/api/generate-plan` | Yes | Generate a general plan response |
| POST | `/api/payment/create-order` | Yes | Legacy authenticated Razorpay order route |
| POST | `/api/payment/verify` | Yes | Verify and persist a legacy payment flow |
| GET | `/api/user/status` | Yes | Return name, email, and subscription tier |
| POST | `/api/contact` | No | Save a contact submission |
| GET | `/api/clients` | Yes | List contact submissions |
| GET | `/api/clients/:id` | Yes | Get one contact submission |
| DELETE | `/api/clients/:id` | Yes | Delete one contact submission |
| POST | `/api/chat` | No | Embedded Python/Groq chat |
| POST | `/api/chat/stream` | No | Streaming provider chat |
| GET | `/api/health` | No | Service/configuration health response |
| GET | `/api/razorpay/key` | No | Return the public checkout key |
| POST | `/api/razorpay/create-order` | No | Create a server-priced checkout order |
| POST | `/api/razorpay/verify-payment` | No | Verify visible checkout signature |

## Public content

### `GET /api/workouts`

Optional query: `level=beginner|intermediate|advanced`.

Returns an array of programme objects containing ID, level, title, duration, display estimate, exercises, description, icon, and colour.

### `GET /api/exercises`

Optional query: `category=strength|core|cardio|yoga|all`.

Returns exercise metadata including name, category, target area, difficulty, suggested display set, image path, and posture text.

### `GET /api/testimonials`

Returns the in-memory testimonial array used by the content API.

### `POST /api/bmi`

Request:

```json
{
  "weight": 70,
  "height": 175,
  "unit": "metric"
}
```

For imperial input, weight is pounds and height is inches. The result is a general adult screening estimate, not a diagnosis and not intended for users under 18.

## Server authentication

### `POST /api/auth/register`

Request:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "example-password"
}
```

Success: `201 Created`, a signed JWT response, a user object, and an HTTP-only cookie. Duplicate email: `409 Conflict`.

### `POST /api/auth/login`

Request:

```json
{
  "email": "user@example.com",
  "password": "example-password"
}
```

Success: JWT response, user object, and HTTP-only cookie. Invalid credentials: `401 Unauthorized`.

### `POST /api/auth/logout`

Clears the `token` cookie and returns a success message.

### `GET /api/auth/me`

Reads the HTTP-only cookie and returns:

```json
{
  "user": {
    "id": 1,
    "name": "Example User",
    "email": "user@example.com",
    "subscription_plan": "free"
  }
}
```

## Workout and dashboard endpoints

### `POST /api/workouts/log`

Request:

```json
{
  "exercise": "Squat",
  "sets": 3,
  "reps": 8,
  "weight": 0
}
```

The route validates values and stores the row under `req.user.id`.

### `GET /api/workouts/history`

Returns the authenticated user's records ordered by date.

### `GET /api/dashboard/today`

Returns the current weekday, the matching predefined routine, and the user's subscription tier.

### `GET /api/dashboard/analytics`

Returns:

```json
{
  "success": true,
  "heatmap": [{ "date": "2026-09-10", "count": 30 }],
  "pieChart": {
    "labels": ["Legs"],
    "data": [3]
  }
}
```

## Plan endpoint

### `POST /api/generate-plan`

Request fields:

```json
{
  "weight": 70,
  "goal": "maintain",
  "dietPref": "balanced",
  "religion": "none",
  "geography": "indian"
}
```

Returns `diet`, `dailyMeals`, and `routine` fields. This endpoint produces educational estimates only and should not be used for medical decisions or restrictive plans.

## Contact and client endpoints

### `POST /api/contact`

Request:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "goal": "general",
  "message": "I would like more information about the platform."
}
```

Validation:

- Name, email, and message are required.
- Email must have a valid basic format.
- Name maximum: 100 characters.
- Message: 10–2000 characters.

### `GET /api/clients`

Optional query: `search=<text>`. Returns `{ count, clients }`.

### `GET /api/clients/:id`

Returns one client row or `404`.

### `DELETE /api/clients/:id`

Deletes one client row or returns `404`.

> Production warning: these three routes currently verify a JWT but do not check an administrator role.

## AI endpoints

### `POST /api/chat`

Request:

```json
{
  "message": "How can I build a consistent wellness routine?"
}
```

The server starts `fuaak_agent.py`, waits up to 25 seconds, and returns its output as `reply`. Requirements: Python, `requests`, and `GROQ_API_KEY`.

### `POST /api/chat/stream`

Request:

```json
{
  "message": "Give me a simple recovery reminder.",
  "language": "en-IN",
  "chatHistory": []
}
```

Response content type: `text/event-stream`.

Token event:

```text
data: {"token":"response text"}
```

Completion event:

```text
data: [DONE]
```

Supported prompt keys in the server include `hi-IN`, `bn-IN`, `te-IN`, `ta-IN`, `mr-IN`, `gu-IN`, `kn-IN`, `ml-IN`, `pa-IN`, `or-IN`, `ur-IN`, `as-IN`, and `en-IN`.

## Health endpoint

### `GET /api/health`

Example:

```json
{
  "status": "ok",
  "primaryAI": "groq",
  "groqKey": false,
  "claudeKey": false
}
```

This confirms server configuration state. It does not contact MySQL or an AI provider.

## Razorpay endpoints

### Visible pricing-page flow

- `GET /api/razorpay/key`
- `POST /api/razorpay/create-order` with `{ "planId": "initiate", "cycle": "monthly" }`
- `POST /api/razorpay/verify-payment` with the three Razorpay response fields

The order route uses the server `SECURE_PRICING` map and does not trust an amount supplied by the browser.

### Legacy authenticated flow

- `POST /api/payment/create-order`
- `POST /api/payment/verify`
- `GET /api/user/status`

This flow can store a payment and update `subscription_plan`, but the visible pricing page currently uses the other route set. Consolidate the two flows before production.

## Error format

Most errors use one of these forms:

```json
{ "error": "Description" }
```

or:

```json
{ "success": false, "message": "Description" }
```

Consumers should check both the HTTP status and the response body.

