# arXiv Classic Red

A lightweight browser extension that restores the classic red arXiv header
(the pre-2026 "Campus Red" look) on arxiv.org.

Not affiliated with or endorsed by arXiv.

![Classic red header](docs/screenshot-abs.png)

## What it does

- Turns the site header back to the classic red `#b31b1b`.
- Makes the logo and navigation text white, as in the old header.
- Fixes hover and mobile-menu colors so nothing flashes the new dark brown.
- Click the toolbar icon to toggle the styling on/off (an `OFF` badge shows
  the disabled state; open arXiv tabs reload to apply the change).

## Resource footprint

- The styling itself is one static CSS file; **no code runs inside arXiv
  pages**, ever.
- The only JavaScript is an event-driven MV3 service worker that wakes up
  when you click the toolbar icon and sleeps otherwise.
- No tracking, no analytics, no network requests, no data collection.

## Install (developer mode)

1. Open `edge://extensions` (or `chrome://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.

## Publish to Microsoft Edge Add-ons

1. Create the upload package (from the parent directory):
   `cd arxiv-classic-red-extension && zip -r ../arxiv-classic-red-0.0.1.zip manifest.json background.js classic-red.css icons/`
2. Register at https://partner.microsoft.com/dashboard/microsoftedge
   (one-time, free for Edge Add-ons).
3. Create a new extension, upload the zip, and fill in the listing.
   The extension collects no data; declare "does not collect data" in the
   privacy section. The `scripting`/`storage` permissions and arxiv.org
   host access are used solely for the local CSS toggle.
4. Bump `"version"` in `manifest.json` for every new upload.

## Color

The red is `#b31b1b` (historical arXiv/Cornell red) with `#8f1717` for hover.
Change `--classic-red` / `--classic-red-dark` in `classic-red.css` if you
prefer the `#ae2a24` toolbar red some users reported.

## License

[MIT](LICENSE)
