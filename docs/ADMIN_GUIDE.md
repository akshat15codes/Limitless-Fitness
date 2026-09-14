# Administration Guide

## Purpose

`admin.html` displays contact submissions saved by `/api/contact`. It requests data from `/api/clients` and refreshes every 30 seconds.

## Requirements

- Express server running
- MySQL configured and reachable
- `clients` table initialized
- Valid server JWT supplied by cookie or bearer token

## Open the page

```text
http://localhost:5000/admin.html
```

The table shows:

- Client ID
- Name
- Email
- Goal category
- Message
- Submission date

Dynamic user content is escaped before insertion into the table.

## Search API

The page does not currently include a search box, but the backend supports:

```text
GET /api/clients?search=example
```

The search matches name, email, or goal.

## Retrieve one record

```text
GET /api/clients/:id
```

## Delete one record

```text
DELETE /api/clients/:id
```

Deletion is permanent at the database level. Confirm the exact client ID before using this route.

## Important access limitation

The current API only checks whether a JWT is valid. It does **not** verify a dedicated administrator role. Therefore any server-authenticated user could access client records if they know the endpoint.

Before production:

1. Add a role or permission model to `users`.
2. Add `requireAdmin` middleware after `authenticateToken`.
3. Reject non-admin access with `403 Forbidden`.
4. Connect the visible login page to server authentication.
5. Keep an audit trail for record access and deletion.
6. Add CSRF protection for cookie-authenticated state changes.

Until those controls exist, use this screen only with non-sensitive test data in a local development environment.

## Troubleshooting

### Access denied

The browser-demo login does not create a server JWT. Use an API client to call `/api/auth/register` or `/api/auth/login` and retain its cookie, or finish the frontend/server authentication integration.

### MySQL connection error

Check `.env`, start MySQL, and run `backend/database.sql`.

### Empty table

Submit the home-page contact form while the server is running, then reload the admin page.

