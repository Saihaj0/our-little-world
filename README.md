# Our Little World ❤️

A private, password-protected little universe — a gift for my Dumbo.

Cinematic intro · relationship timeline · photo gallery with lightbox ·
Open When… letters · random reasons I love you · songs · a shared bucket
list · a final letter. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Framer Motion and Lucide icons.

---

## 1. Prerequisites

- **Node.js 20.9+** (Node 22/24 recommended) — check with `node -v`
- **npm** 10+ (ships with Node)
- A GitHub account and a [Vercel](https://vercel.com) account for deployment

## 2. Install dependencies

```bash
npm install
```

## 3. Create the local environment file

```bash
cp .env.example .env
```

`.env` is git-ignored — never commit it. The site **refuses to authenticate**
(with a clear server-side error) if these values are missing or too weak.

## 4 & 5. Set the password and generate a session secret

Open `.env` and set:

```env
SITE_PASSWORD=a-long-memorable-passphrase
SESSION_SECRET=<32+ random characters>
```

- `SITE_PASSWORD` — at least **8 characters**. A sentence works well and is
  easy to tell her over the phone.
- `SESSION_SECRET` — used to sign session cookies so they can't be forged.
  Generate a strong one:

  ```bash
  # macOS / Linux
  node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"

  # Windows (PowerShell)
  node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
  ```

  Paste the output as `SESSION_SECRET`. Rotating it invalidates every
  existing session (useful if you suspect a leak).

## 6. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. You'll land on the lock screen; the correct
password unlocks the site and sets an HTTP-only session cookie (30 days).

Other scripts:

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run start      # serve the production build
```

## 7. Replace the sample photos

1. Put your images in `public/photos/` (jpg/webp/png).
2. Open `lib/content/gallery.ts` and point each entry's `src` at your file:

   ```ts
   src: "/photos/our-evening-walk.jpg",
   caption: "that evening walk we never wanted to end",
   date: "April 2025",
   alt: "Us on a rooftop at sunset",   // required — screen readers read this
   shape: "landscape",                  // optional: portrait | landscape | square
   ```

3. Timeline photos work the same way — `lib/content/timeline.ts`, `photo` field.
4. Delete the placeholder `.svg` files when you no longer need them.

> **Privacy note:** the password gate protects the *pages*, but files in
> `public/` are served statically and anyone with the direct URL could load
> them. Only add photos you're both fine with; keep genuinely private ones
> off the site.

## 8. Edit letters, memories, songs and reasons

All personal content lives in **`lib/content/`** — UI code never hard-codes
copy. Search the folder for `PLACEHOLDER` to find everything to replace.

| File | What's in it |
|---|---|
| `site.ts` | Names, hero text, live counters, future plans, the final long-distance letter |
| `timeline.ts` | Relationship timeline entries (date, title, story, photo, location) |
| `gallery.ts` | Photos, captions, dates, alt text |
| `letters.ts` | The ten “Open when…” letters |
| `reasons.ts` | 100 reasons — add as many as you want |
| `songs.ts` | Songs with personal notes and Spotify/YouTube links |
| `bucket-list.ts` | The “things we still have to do together” examples |

TypeScript interfaces for all of it are in `lib/content/types.ts`.

**Live counters (hero):** `site.ts` optionally takes two fields that power a
live-ticking strip under the hero — `togetherSince` ("Together for 2,147
days …") and `anniversary: { label, mode? }` (a recurring countdown to the
next anniversary of `togetherSince`; on the day itself it reads “Happy
Anniversary, my love! ❤️”). `mode` is `"yearly"` (default — 1 July each
year) or `"monthly"` (the 1st of every month). The anniversary date is
always `togetherSince`, so there is only one date to keep in sync. Delete
either field to hide that half.

**Timezone:** the site runs on **Indian Standard Time (UTC+05:30)**. A bare
date like `togetherSince: "2026-07-01"` is read as midnight IST and an
offset-less datetime is read as IST, so counters tick over at midnight
Indian time no matter what timezone the visitor's device is set to.

**Songs:** the site never downloads or embeds copyrighted audio — each song's
button opens the streaming link you provide (Spotify/YouTube/Apple Music).
With no link supplied, the UI honestly says so instead of faking playback.

## 9. Test the password gate

1. Open the site in a private window → you must see the lock screen.
2. Wrong password → generic “That didn't work” 401 (no hint about correctness).
3. Eight wrong attempts → 429 “Too many attempts” for 15 minutes.
4. Right password → the cinematic intro plays, then the site.
5. Try fetching protected content directly:
   `curl -i http://localhost:3000/api/anything` → 401,
   `curl -i http://localhost:3000/` → 307 redirect to `/welcome`.
6. “Leave this world” (nav/footer) → POST `/api/auth/logout` clears the
   cookie and returns you to the lock screen.
7. Sessions expire after 30 days; after expiry the next click re-locks.

## 10 & 11. Deploy to Vercel with environment variables

```bash
npm i -g vercel   # if you don't have it
vercel            # link the project (answer the setup questions)
```

Or push the repo to GitHub and import it at <https://vercel.com/new>.

Then in the Vercel dashboard: **Project → Settings → Environment Variables**
add for *Production* (and Preview if you like):

- `SITE_PASSWORD`
- `SESSION_SECRET`

## 12. Redeploy after configuration changes

Environment variables are read at **runtime**, but to be safe after the
first setup (or after rotating `SESSION_SECRET`):

```bash
vercel --prod
```

or use **Deployments → ··· → Redeploy** in the dashboard.

## 13. Limitations (please read)

- **Sessions are cookies, not accounts.** There's one password, one shared
  secret. Clearing browser data or rotating `SESSION_SECRET` signs everyone
  out. Sessions last 30 days.
- **Rate limiting is per server instance.** On serverless (Vercel) each
  instance has its own memory, so a distributed attacker could evade the
  8-attempts-per-15-min brake. It's a speed bump, not a vault — use a long
  password.
- **localStorage is device-specific.** Bucket-list ticks and custom items
  she adds are saved in *her* browser only — never synced to you, never
  sent to the server, and lost if she clears site data. Auth never uses
  localStorage.
- **Static files in `public/`** (photos) are served without auth checks if
  someone already knows the exact URL.
- **Honesty by design:** nothing claims opened letters or added items are
  encrypted or private beyond the site's password gate.

## 14. Test on a mobile phone

**Same Wi-Fi, local dev server:**

```bash
npm run dev -- -H
```

Find your machine's LAN IP (`ipconfig` on Windows, `ifconfig`/`ip addr` on
macOS/Linux), then on the phone visit `http://<that-ip>:3000`.

**Or after deploying:** just open the Vercel URL on her phone — that's the
real experience, including touch gestures in the gallery lightbox and the
mobile nav sheet.

---

## Project structure

```
app/
  page.tsx             Protected homepage (re-verifies the session)
  welcome/             Lock screen
  api/auth/            Login + logout route handlers
  layout.tsx           Fonts, generic metadata (no private details)
  globals.css          Tailwind v4 theme: burgundy/rose/cream palette
components/
  world/               Intro, nav, ambient background, shell, footer, back-to-top
  sections/            Hero, timeline, gallery, letters, reasons, songs,
                       bucket list, final letter, future plans
  ui/                  Reveal-on-scroll, section headings
lib/
  auth/                Session signing (Web Crypto), rate limiting, env checks
  content/             ← ALL personal content lives here
middleware.ts          Server-side gate in front of every route
public/photos/         Placeholder art — replace with your photos
```

## Security notes

- Password verified server-side with a constant-time comparison; the secret
  never reaches the browser bundle.
- Sessions are HMAC-SHA256-signed, HTTP-only, `SameSite=Lax`, `Secure` in
  production, expiring after 30 days — verified in **middleware** *and*
  again in the page itself (defense in depth).
- Login is rate-limited (8 attempts / 15 min / IP) with `Retry-After`.
- Security headers on every response: CSP, HSTS, `X-Frame-Options: DENY`,
  `nosniff`, referrer policy, permissions policy.
- No private data in metadata/OG tags; `noindex` is set.

Made with love, for my Dumbo ♡
