# Go-live checklist

Follow the steps in order. Steps marked **You** need your own accounts. Values marked 📋 are secrets: paste them only into Vercel's Environment Variables (step 4), never into GitHub, chat groups or email.

## 0. Decide first

- [ ] **Domain**: check the "dMAT" trademark question before buying a domain that contains it.
- [ ] **Brand name** shown on the site (now the placeholder "MockPilot", set in `web/src/lib/brand.ts`).
- [ ] **Public contact details**: which email / phone / WhatsApp appear on the site (`BRAND.contact` in `web/src/lib/brand.ts`).
- [ ] **Live batches**: real dates, fees, instructors (edit them later in the admin panel, or before launch).
- [ ] **Privacy policy**: have the draft at `/privacy` reviewed.

## 1. Domain (You)

- [ ] Buy the domain (GoDaddy, Namecheap, Hostinger, …).
- [ ] Keep the registrar login handy: steps 3 and 5 add DNS records there.

## 2. Database: Neon (You)

1. Sign up at neon.tech (Google/GitHub login is fine).
2. **Create project** → name it e.g. `mockpilot` → region **AWS Asia Pacific (Mumbai)** → Postgres version: the default.
3. On the project dashboard click **Connect** → turn **Connection pooling ON** → copy the connection string.
   📋 This is `DATABASE_URL` (it looks like `postgresql://user:password@ep-…-pooler.ap-south-1.aws.neon.tech/neondb?sslmode=require`). It contains a password: treat it as secret.

## 3. Email for login codes: Resend (You)

1. Sign up at resend.com.
2. **Domains → Add domain** → enter your domain (e.g. `dmatmockpilot.com`), region close to India if offered.
3. Resend shows 3–4 **DNS records** (TXT/MX for SPF and DKIM). Add each one at your domain registrar exactly as shown, then click **Verify** in Resend (can take minutes to hours).
4. **API Keys → Create API key** (permission: "Sending access").
   📋 This is `RESEND_API_KEY` (starts with `re_`). Secret.
5. Choose the sender, e.g. `MockPilot <login@your-domain.com>`. 📋 This is `EMAIL_FROM`.

## 4. Hosting: Vercel (You, with the developer)

> Vercel's free **Hobby** plan is for non-commercial use only. Because the site sells classes, plan for the **Pro** plan (paid, per team member) once you take payments.

1. Sign up at vercel.com **with your GitHub account** (vikas5896).
2. **Add New → Project → Import** the `DMATMockPilot` repository.
3. **Root Directory: `web`** (important). Framework: Next.js (detected automatically). Leave build settings as they are.
4. **Environment Variables**: add these for *Production* (and *Preview* if you use previews):

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string (step 2) |
| `ADMIN_EMAILS` | the admin emails, comma-separated (copy the line from your local `web/.env.local`) |
| `AUTH_SECRET` | a **new** random value, generate it with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `RESEND_API_KEY` | from step 3 |
| `EMAIL_FROM` | from step 3, e.g. `MockPilot <login@your-domain.com>` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.your-domain.com` |

5. Click **Deploy**. The build first updates the database tables, then builds the site.
6. Project **Settings → Functions → Function Region**: choose **Mumbai (bom1)** so the site is fast in India and close to the Neon database.

## 5. Connect the domain (You)

1. Vercel project → **Settings → Domains** → add `your-domain.com` and `www.your-domain.com`.
2. Vercel shows the DNS records to add (usually an **A** record for the bare domain and a **CNAME** for `www`). Add them at your registrar.
3. Wait until both show "Valid configuration". HTTPS is set up automatically.

## 6. Test the live site (together)

- [ ] Home, Mock Tests, Live Classes, a batch page, Study in Germany, dMAT Guide, Contact all load.
- [ ] Take a short mock test; results appear.
- [ ] Send an enquiry from `/contact`.
- [ ] Log in at `/admin` with each admin email: the code arrives **by email**.
- [ ] The enquiry from the step above is listed; change its status.
- [ ] Edit a batch; the change shows on `/live-classes`. Change it back.
- [ ] Log out; `/admin` asks for login again.

## 7. After launch

- [ ] Google Search Console: add the domain and submit `https://www.your-domain.com/sitemap.xml`.
- [ ] Share the free mock link in your channels.
- [ ] Next phase: online payments (Razorpay) for live classes and mock packs.

## Good to know

- **Adding or removing an admin**: change `ADMIN_EMAILS` in Vercel → Settings → Environment Variables, then redeploy.
- **Changing `AUTH_SECRET`** logs everyone out.
- **Database changes** (new tables) are applied automatically on every deployment.
- **Local development** keeps working without any of these accounts (built-in database, login codes in the console).
