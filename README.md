# Kuzu's Maze website

Static site for the store listings: landing page, privacy policy and credits.
Plain HTML, one stylesheet and one small script. No build step, no cookies. Hosted on GitHub Pages.

| File | Purpose |
|---|---|
| `index.html` | Landing page with store links |
| `privacy.html` | Privacy policy (Play Console, App Store Connect and in-game Settings link here) |
| `credits.html` | Credits and licence texts. Mirrors `../Godot/assets/licenses/` |
| `app-ads.txt` | AdMob seller verification. Only read at the root of a domain |
| `flip.js` | Tap-to-flip logo tile with a random face each time |
| `404.html` | GitHub Pages not-found page |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
| `assets/` | Tile back and faces (`render_all()` in `Blender/scripts/render_web_logo.py`), favicons, and the game's Latin font slices |

## Preview locally

Open `index.html` in a browser.

## Publish (GitHub Pages)

1. On github.com, create an empty **public** repository (no README), e.g. `kuzus-maze`.
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<user>/kuzus-maze.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<user>.github.io/kuzus-maze/` within a minute or two.

## Custom domain (later)

When a domain is bought (e.g. kuzusmaze.com): add it in **Settings → Pages → Custom domain**, which creates a
`CNAME` file in the repo, then set the DNS records GitHub shows. Old `github.io` links redirect automatically.
Then `app-ads.txt` is served at the domain root, where AdMob looks for it. Also update the website URL in the
store listings and `privacy_policy_url` in `Godot/data/app_info.tres`.

## Placeholders to fill

- [ ] Studio / developer name: `privacy.html` and `credits.html` (search for `TODO`).
- [ ] Original designer name(s) and the credits wording agreed with Stellar Factory: `credits.html`.
- [ ] Store links: replace the "Coming soon" spans in `index.html` (instructions in the HTML comment there).
- [ ] AdMob publisher line: `app-ads.txt`.
- [ ] Contact email: currently the developer's personal address in `privacy.html`.

## Keep in sync

- **Credits:** when `Godot/assets/licenses/` changes, update `credits.html`.
- **Privacy:** if the game adds analytics, another ad network, accounts or any online feature, update `privacy.html`,
  bump its effective date, and update the Play Data safety form and Apple's App Privacy answers to match.
