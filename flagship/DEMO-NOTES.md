# Haven Church — Interactive flagship concept

Fictional church experience built for Modernized Ministry's sales portfolio.

## What the demo does

- Mobile-first landing page with hero, newcomer information, community, events, and giving.
- Sermon experience shows a professional 16:10 player layout, sample service scheduling, a selectable archive, and a stream integration preview. **There is no broadcast or recorded sermon connected**.
- `Plan your visit` is an on-device interactive simulation; it does not submit or retain visitor information.
- `Explore online giving` demonstrates suggested gift amounts, custom amounts, and one-time or monthly giving with a review state. **No card fields, charges, or backend calls**.
- Community events are examples, not real events; detail previews do not accept RSVPs.
- Sample church location, service times, sermons, messages, and copy are fictional and labeled as such.

## Production integration recommendations

- Connect an actual church YouTube Live, Vimeo, Church Online Platform, or other permitted streaming source; show LIVE only after verifying stream health. Provide replay availability and captions.
- Configure a secure church-specific giving processor with transactional receipts, terms and privacy links. Keep payment data out of our own server.
- Connect visit form to an approved CRM, set up consent-based follow-ups, and provide church staff access.
- Replace invented sample service details/events with congregation-verified information and real photography with permission.

## Edit

- `flagship/index.html`: content and structure
- `assets/flagship.css`: independent design system (does not touch the agency website)
- `assets/flagship.js`: all demo behaviors, without backend calls
- `assets/haven-*.webp`: original imagery cropped from the project’s generated artwork

`python3 scripts/deploy.py` automatically publishes the `flagship/index.html` and copied assets via Cloudflare Pages. `flagship/DEMO-NOTES.md` stays in source only.
