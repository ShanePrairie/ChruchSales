# Modernized Ministry — ChurchSales

A premium, mobile-first, **multi-page** site for [modernizedministry.com](https://modernizedministry.com), an outreach group founded and based in Illinois, plus an interactive fictional flagship church demo.

> GitHub repo is `ShanePrairie/ChruchSales` (original repository spelling). The customer-facing brand and domain are spelled correctly.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | About Modernized Ministry: brand, why we exist, mission and story |
| `/blog/` | Church growth and digital outreach resource journal, with 13 original guides |
| `/flagship/` | Interactive Haven Church flagship website *concept* (fictional) |
| `/solutions/` | Church websites, texts, email, and digital ministry systems |
| `/impact/` | Verified church discovery/digital worship research and an explicit scenario calculator for return visits, connected households, and hypothetical giving. |
| `/outreach/` | Interactive four-step guest journey / phone preview |
| `/work/` | Original portfolio concepts, clearly labeled demonstrations |
| `/packages/` | Presence / Connection / Flagship package outlines |
| `/process/` | Discovery, design, build and ongoing support |
| `/contact/` | Actual inquiry form backed by optional Cloudflare Pages Function |
| `/privacy/` | Data handling notice, including cookie-free Cloudflare Web Analytics |

## Development

No npm or bundler required. Static HTML, one shared CSS file, one shared JS file, optimized local image assets.

```sh
python3 scripts/deploy.py   # stage the reviewed HTML and assets in dist/
python3 -m http.server 8080
# open http://localhost:8080
```

**Edit the reviewed HTML pages directly**, shared design in `assets/site.css`, and interactions in `assets/site.js`. Run `python3 scripts/deploy.py` for Cloudflare deployment staging. The old `scripts/build.py` is now a safe compatibility entry point that invokes `deploy.py` without regenerating or overwriting the reviewed pages.

## Deploy to Cloudflare Pages

- Connect this GitHub repository to a **Cloudflare Pages** project.
- Framework preset: **None**.
- Build command: `python3 scripts/deploy.py`.
- Build output directory: `dist`.
- Add `modernizedministry.com` as a custom domain and follow Cloudflare's DNS verification flow.
- Ensure the `www` domain redirects to the canonical address if desired.

> The repository commit does **not** publish the domain. It remains unconnected until Cloudflare Pages project/domain setup is complete.

## Inquiry form delivery (not live until configured)

`functions/api/inquiry.js` delivers the website contact form to a real inbox via Resend. Set these Cloudflare Pages **secrets/environment variables**:

- `RESEND_API_KEY`: API key for a Resend account
- `FROM_EMAIL`: a verified sender address/domain, e.g. `inquiries@modernizedministry.com`
- `LEADS_TO_EMAIL`: the business inbox receiving contact leads

The form intentionally returns an error until delivery is configured. It never displays fake success. Validate a real message end-to-end before accepting leads. Configure Cloudflare WAF rate limiting, monitor errors, and consider Turnstile for anti-spam before outreach campaigns. Ensure mailbox routing is working.

## Truthful demos and safety

- Haven Church is a **fictional church**. Service times, events and guest names are examples.
- The Haven "Plan Your Visit" experience is deliberately **local-only** and never transmits/saves personal data.
- The outreach phone is a **clickable simulation**; it sends **no** texts or emails. A real church workflow requires opt-in, unsubscribe support, proper consent language and staff handoffs.
- No fake customer testimonials, results, or partner logos are used. Portfolio examples are clearly identified as concepts.
- Prices are package **outlines** without invented rates. Fill in confirmed setup/monthly figures before publishing the sales site.
- The current privacy notice is a starting point, not legal review. It discloses cookie-free Cloudflare Web Analytics. Update it when adding advertising pixels or other processors.

## Asset provenance

`assets/worship.webp`, `assets/connection.webp`, `assets/future.webp` and the additional `assets/worship-wide.webp`, `assets/ministry-tech.webp`, `assets/church-future.webp` are generated imagery commissioned for this project. All assets are stored in the repository—not remote image links. `assets/social-preview.jpg` is the prior generated brand share preview.

## Next milestones

1. Validate exact published package prices, service scope, and contractual terms.
2. Configure Resend sender + inbox and test the form end to end.
3. Set up Cloudflare Pages and connect `modernizedministry.com`.
4. Replace simulated visitor journey with real platform integration only after explicit opt-in design and messaging compliance review.
5. Add real client work, case studies and testimonials as they become available.

## Evidence and scenario model

The Impact page cites Lifeway Research (2023) and Hartford Institute for Religion Research (2024 digital and financial surveys, 2025) with direct links and survey context. The interactive calculator is **hypothetical**; baseline and improved retention rates are visitor-adjustable assumptions, not findings from these studies or documented results from Modernized Ministry. Giving is an estimated **annualized run-rate**, not donations already raised.

Creative direction: light ivory/white with new original marble-and-gold wave background. Reduced-motion and accessible contrast included.

## Church growth journal and SEO

The static, searchable journal lives in `blog/`, with original, distinct articles about church marketing, local search, visitor follow-up, outreach, websites, livestreams, online giving and messaging. Each article has a canonical URL, descriptive metadata, organization author identification, BlogPosting structured data, breadcrumbs, related guides and links to relevant services. The journal index is linked in the main site navigation and `sitemap.xml`.

`python3 scripts/deploy.py` stages all `blog/**/index.html` pages and `assets/blog.css`. The blog is not powered by a CMS; edit the reviewed HTML directly to publish updates and keep the dates and sitemap accurate. Before generating new keyword pages, confirm that they serve a distinct, useful search intent: do not create doorway city pages or stuff repetitive terms. Google Search Console indexing and performance tracking require separate setup with domain ownership verification after deployment.

**Publishing reminder:** A repository commit is not proof that Cloudflare Pages deployed it. Check the public URLs and their HTML after each release.
