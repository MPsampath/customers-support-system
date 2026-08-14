# After-Sales Support Ticket System

A Laravel + Inertia (React) application for handling after-sales customer support tickets.

- **Guests/customers** can open a support ticket and check its status by reference number — no account needed.
- **Support agents** log in (JWT-authenticated API) to view, search, open, and reply to tickets. Replies notify the customer by email.

## Tech Stack

- **Backend:** Laravel 13 (PHP 8.3), SQLite database
- **Frontend:** React 18 via Inertia.js v2, Tailwind CSS 3, Vite
- **Auth:** JWT (`php-open-source-saver/jwt-auth`) for the agent-facing API (`/api/agent/*`); public ticket endpoints require no auth
- **Mail:** Laravel Mailables, sent synchronously (no queue worker required)
- **Testing:** PHPUnit (Feature tests cover the full ticket lifecycle)

## Project Structure Highlights

- `app/Http/Controllers/Api/` — public ticket endpoints (`TicketController`) and JWT-protected agent endpoints (`AgentTicketController`, `AuthController`)
- `app/Models/SuportTicket.php`, `SuportTicketComments.php` — ticket + reply models
- `app/Mail/` — ticket-created and ticket-replied notification emails
- `resources/js/Pages/` — React pages (`Tickets/Create`, `Tickets/Status`, `Agent/Login`, `Agent/Tickets/Index`, `Agent/Tickets/Show`)
- `resources/js/lib/` — JWT-aware axios client and localStorage-based session helpers used by the agent pages
- `routes/web.php` — Inertia page shells; `routes/api.php` — JSON API endpoints
- Can check email service workes with laravel.log. 

## Running Locally (without Docker)

**Requirements:** PHP 8.3+, Composer, Node.js 20+, npm

```bash
# 1. Clone and install dependencies
- Extract the zip file then can find screen shot folder and project foler then go to
cd customer_support_service
composer install
npm install

# 2. Configure environment
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# 3. Run migrations and seed a test agent account


php artisan migrate --seed

# 4. Build frontend assets
npm run build
# ...or for development with hot reload, run this in a separate terminal:
npm run dev

# 5. Serve the app
php artisan serve
```

Visit `http://127.0.0.1:8000`. A test agent account is seeded: `test@example.com` / `password`.

### Checking the email service

By default `.env` sets `MAIL_MAILER=log`, so no real emails are sent — Laravel writes the full rendered email (subject, headers, HTML body) to the log file instead. After opening a ticket or sending an agent reply, check:
```bash
tail -n 100 storage/logs/laravel.log
```

To see emails rendered as a real inbox would show them without sending to real addresses, run a local SMTP catcher such as [Mailpit](https://github.com/axllent/mailpit) and point `.env` at it:
```
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
```
Then view captured emails at `http://127.0.0.1:8025`.

| Variable | Purpose |
|---|---|
| `DB_CONNECTION` / `DB_DATABASE` | Set to `sql` and a file path (default setup) |
| `JWT_SECRET` | Required for agent API authentication — generate via `php artisan jwt:secret` |
| `MAIL_MAILER` | `log` for local dev (emails written to `storage/logs/laravel.log`), `smtp` pointed at Mailpit in Docker, or a real provider (SMTP/SES/Postmark) in production |