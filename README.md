# HyunchulPortfolio.com

Free static portfolio on Render. No server or database charges are configured. Visitor access needs no login.

## Publish changes
Open the site's edit tool, edit your profile/games, and export content.json. Upload that file to this repository root using GitHub (only repository collaborators can publish). Commit changes; Render automatically rebuilds. Local editing does not change the live site. Unpublished games are excluded from export; preserve their text separately.

Images: PNG/JPG/WebP up to 2 MB are embedded in content.json. Host games on itch.io and paste a playable embed URL; native builds and videos use external links.

Build: npm install --include=dev && npm run build
Publish directory: public

The render.yaml defines only a static site; do not deploy the older Node server configuration. A custom .com domain requires separate registration and DNS. Render free-tier usage allowances still apply.
