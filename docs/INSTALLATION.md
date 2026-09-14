# Installation and Local Setup

This guide is written for Windows and VS Code. Equivalent commands can be used on macOS or Linux.

## 1. Required software

Install and verify:

```powershell
node --version
npm --version
python --version
mysql --version
git --version
```

Recommended versions:

- Node.js 20+
- Python 3.10+
- MySQL 8+
- Git 2+

## 2. Open the project in VS Code

1. Extract the project ZIP.
2. Open VS Code.
3. Select **File → Open Folder**.
4. Choose the folder that directly contains `package.json` and `server.js`.
5. Open the terminal with **Terminal → New Terminal**.

Run this to confirm the correct folder:

```powershell
Get-ChildItem package.json, server.js
```

## 3. Install Node dependencies

For a clean, repeatable installation:

```bash
npm ci
```

Use `npm install` only when intentionally changing dependencies.

## 4. Create the environment file

PowerShell:

```powershell
Copy-Item .env.example .env
```

Command Prompt:

```cmd
copy .env.example .env
```

Open `.env` and replace the placeholder values. At minimum, configure MySQL and `JWT_SECRET`.

Generate a development JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the generated value into `JWT_SECRET`. Do not place it in documentation, screenshots, chat messages, or Git commits.

### MySQL settings

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=limitless_fitness
```

If MySQL runs on port `3308`, change only `DB_PORT` to `3308`.

### Optional AI settings

The normal pages load without AI keys, but AI replies require at least one configured provider.

```dotenv
PRIMARY_AI=groq
GROQ_API_KEY=your_key
CLAUDE_API_KEY=
PYTHON_BIN=python
```

Use `PYTHON_BIN=python3` on a Linux host where the executable is named `python3`.

### Optional Razorpay settings

Use test-mode keys during development:

```dotenv
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

## 5. Initialize MySQL

### Option A: MySQL command line

```text
mysql -u root -p
mysql> SOURCE backend/database.sql;
mysql> EXIT;
```

### Option B: MySQL Workbench

1. Open MySQL Workbench and connect to the local server.
2. Open `backend/database.sql`.
3. Run the complete script.
4. Refresh **Schemas** and confirm `limitless_fitness` appears.

The server also attempts to create the database and its core tables at startup. The SQL file contains the same core definitions. It creates missing tables; it does not migrate or repair existing ones. Keep your existing `.env` and database settings when applying the documentation update.

## 6. Set up optional Python support

PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Command Prompt:

```cmd
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
```

Python is required by the embedded `/api/chat` route. The rest of the Node server can start without it.

## 7. Validate the project

```bash
npm test
npm run check:python
```

## 8. Start the application

Development mode with automatic restart:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

Expected server address:

```text
http://localhost:5000
```

Do not open the HTML files directly with `file:///...`; use the Express URL so that relative API requests work.

## 9. Confirm the setup

Open these URLs:

- `http://localhost:5000/`
- `http://localhost:5000/api/health`
- `http://localhost:5000/signup.html`
- `http://localhost:5000/public/`

The health endpoint reports which AI keys are configured. It does not test provider billing or availability.

## 10. Common problems

### `JWT_SECRET is not set`

Create `.env`, add a long `JWT_SECRET`, save the file, and restart Node.

### `Database connection failed`

- Start the MySQL service.
- Check the port in MySQL Workbench or Windows Services.
- Confirm the username and password in `.env`.
- Run `backend/database.sql`.

### `npm` command not found

Install Node.js, restart VS Code, and open a new terminal.

### `Could not start AI agent`

- Verify `python --version`.
- Install `requirements.txt`.
- Check `PYTHON_BIN` in `.env`.
- Confirm `GROQ_API_KEY` is set for the Python route.

### AI service unavailable

Confirm the selected provider key and `PRIMARY_AI`. Restart the server after changing `.env`.

### Payment initialization fails

Use valid Razorpay test keys and serve the page through `npm start`. Never use live keys for a classroom demo.

### Voice button does not work

Use a browser that supports the Web Speech APIs, allow microphone permission, and access the site from `localhost` or HTTPS.

### Browser-demo account disappears

The visible account flow uses the current browser's local/session storage. Clearing site data, changing browsers, or using another device will not retain that demo account.
