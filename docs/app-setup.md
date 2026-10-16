# Heron Job Assistant: setup

The app is a static page (`public/index.html`) plus Vercel serverless functions in `api/`:

| Endpoint | What it does |
|---|---|
| `POST /api/claude` | Sends pricing and scheduling prompts to Claude. The API key stays on the server. |
| `GET /api/auth-url` | Starts Google Calendar sign-in. |
| `GET /api/auth-callback` | Google redirects here after sign-in. Tokens are stored in an encrypted, httpOnly cookie. |
| `GET /api/auth-status` | Returns `{ "connected": true/false }`. |
| `POST /api/add-event` | Adds a job to Google Calendar using the tokens from the cookie. |
| `POST /api/logout` | Disconnects Google Calendar by clearing the cookie. |

## Required environment variables

| Name | Required | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | An API key from https://console.anthropic.com → API Keys |
| `ANTHROPIC_MODEL` | no | Defaults to `claude-sonnet-5-5` |
| `GOOGLE_CLIENT_ID` | yes | The OAuth client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | yes | The OAuth client secret from the same client |
| `REDIRECT_URI` | yes | `https://<your-domain>/api/auth-callback`, for example `https://heron-assistant.vercel.app/api/auth-callback` |
| `SESSION_SECRET` | yes | A random string of at least 32 characters. It encrypts the calendar cookie. |

To make a `SESSION_SECRET`, run this in a terminal and copy the output:

```
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

If you change `SESSION_SECRET` later, everyone is signed out of Google Calendar and has to reconnect once.

## Set the variables in Vercel

1. Open https://vercel.com and go to the **heron-assistant** project.
2. Click **Settings**, then **Environment Variables** in the left sidebar.
3. For each variable in the table above:
   1. Enter its name in **Key** and its value in **Value**.
   2. Under **Environments**, tick **Production**. Tick **Preview** too if you test on preview URLs.
   3. Turn on **Sensitive** for `ANTHROPIC_API_KEY`, `GOOGLE_CLIENT_SECRET` and `SESSION_SECRET`.
   4. Click **Save**.
4. Redeploy so the new values take effect: open **Deployments**, click the **⋯** menu on the latest deployment, then click **Redeploy**.

## Google Cloud OAuth client

1. Go to Google Cloud Console → **APIs & Services** → **Credentials**.
2. Open the OAuth 2.0 Client ID of type "Web application", or create one.
3. Under **Authorized redirect URIs**, add exactly the same value as `REDIRECT_URI`, then click **Save**.
4. Under **APIs & Services** → **Library**, make sure the **Google Calendar API** is enabled.

## Local development

```
npm install
vercel env pull .env.local   # downloads the variables; .env* files are git-ignored
vercel dev
```

## Limits

- Vercel rejects request bodies over about 4.5 MB. The page shrinks large photos, and photos in formats Claude can't read (such as HEIC), to a JPEG before upload. `/api/claude` also rejects bodies over 6 MB and caps `max_tokens` at 8000.
- Google tokens never reach the browser. They are stored in a `heron_gcal` cookie that is AES-256-GCM encrypted, `HttpOnly`, `Secure` and `SameSite=Lax`.
