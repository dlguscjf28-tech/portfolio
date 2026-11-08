# HyunchulPortfolio.com — After Hours Archive

Free Render static site, React + Canvas 2D. No server or paid database.

## Explore

Move with Left/Right or A/D, jump with Space/Up/W. Walk within range of a terminal and click it, click the on-screen interaction button, or press E. Mobile has held touch movement and jump controls. Profile and contact shortcuts move the character directly; the game library provides a normal accessible list.

The world uses fixed 120 Hz physics, buffered/coyote jumps, raised one-way platforms, camera tracking and collectible signals. Published games become terminals automatically. Empty slots are explicitly marked; no sample portfolio projects are invented.

CRT/scanlines/VHS grain affect only the world; CRT can be disabled. Reduced-motion settings remove animated grain, transition glitch and camera easing. Detailed project text and editor forms remain sharp.

## Audio

Original ambient score "After hours", 56 BPM, generated with sine tones. Attempts to start on load; browser autoplay policy may require the first pointer or key gesture. Music continues across world, dialogs and editor. Retro square/triangle sounds are action effects only. Master mute/volume controls are provided. Music ducks during embedded game play.

## Edit and publish

Open 관리자 설정. Edit profile or games, save games into the local editing draft, and use 월드 미리보기. Export content.json and upload it to the repository root with GitHub's Commit changes; Render auto-deploys. Only GitHub collaborators can publish. Drafts remain local to this browser; do not treat browser draft storage as an off-device backup. Published exports omit unpublished games.

Images: PNG/JPG/WebP up to 2 MB, embedded in the content file. Games and video use external hosting URLs. Keep font originals at the published CDN URLs; TtukttakGamja display and Galmuri body are the requested fonts.

## Build and verify

- Build: npm install --include=dev && npm run build
- Publish directory: public
- Tests: npm test (walking, friction, bounds, jump arc, one-way platforms, proximity, variable jump height, empty and populated world layout)

A custom .com domain requires separate domain ownership and DNS. Render usage allowances apply.


UI cleanup: decorative terminal labels, file counters, slogans, coordinates and footer branding are removed. Three pixel palettes are selectable. Touch controls are only shown for coarse pointers inside the game viewport. Renderer clears the entire opaque framebuffer every frame; the browser render regression compares travelled and fresh canvases across all three palettes (0 different channels in each).
