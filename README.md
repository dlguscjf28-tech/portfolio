# HyunchulPortfolio.com

Standalone public portfolio with administrator password login. Deploy with render.yaml. Set ADMIN_PASSWORD (12+ characters) directly in Render. SESSION_SECRET is generated automatically. Uploads and SQLite live on /var/data persistent disk (1 GB). Never commit secrets.

Build: npm install --include=dev && npm run build
Start: npm start
Tests: npm test

Single-file HTML games and external web game embeds are supported. ZIP uploads provide downloads. Custom .com domain requires ownership and DNS setup.
