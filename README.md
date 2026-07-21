# Digital Humanities Group Website

This folder contains a static paper-list website for the PALM Lab Digital Humanities Group.

## Folder Structure

```text
Website/
  index.html                 # Homepage and paper list entrance
  README.md                  # This guide
  data/
    papers.json              # Paper-list data used by the homepage
  papers/
    mchdoc.html              # MCHDoc project page
    epiagent.html            # EpiAgent project page
    mm24.html                # MM 2024 CIRI project page
    dive3d.html              # Redirects old Dive3D link to EpiAgent
  assets/
    styles.css               # Global CSS
    js/
      paper-list.js          # Loads data/papers.json and renders homepage cards
    rendered/                # Web-ready images, icons, thumbnails
    figures/                 # Original PDF figures
```

## Local Preview

Because the homepage loads `data/papers.json` with `fetch`, preview it through a local server instead of opening `index.html` directly with `file://`.

From the `Website/` folder:

```bash
python3 -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500/
```

MCHDoc page:

```text
http://127.0.0.1:5500/papers/mchdoc.html
```

EpiAgent page:

```text
http://127.0.0.1:5500/papers/epiagent.html
```

MM 2024 CIRI page:

```text
http://127.0.0.1:5500/papers/mm24.html
```

In VS Code, you can also use:

1. `Cmd + Shift + P`
2. `Simple Browser: Show`
3. Enter `http://127.0.0.1:5500/`

## Add a New Paper

### 1. Add Assets

Put the paper thumbnail or rendered figure in:

```text
Website/assets/rendered/
```

Recommended formats:

- `png` for rendered figures or PDF screenshots
- `jpg` for photographic/banner images
- `ico` only for favicon-style icons

If the original figure is a PDF and it appears with padding when embedded, render it into a high-resolution PNG first. The current MCHDoc figures were generated from cropped PDFs at high DPI to avoid browser PDF-viewer padding.

### 2. Add a Project Page

Create a new HTML page under:

```text
Website/papers/
```

Example:

```text
Website/papers/new-paper.html
```

You can copy `papers/mchdoc.html` or `papers/epiagent.html` for a complete project-page style.

### 3. Register the Paper in `papers.json`

Open:

```text
Website/data/papers.json
```

Add a new object:

```json
{
  "title": "New Paper Title",
  "href": "papers/new-paper.html",
  "thumbnail": "assets/rendered/new-paper-thumbnail.png",
  "thumbnailAlt": "Short description of the thumbnail",
  "tags": ["CVPR 2027", "Benchmark"],
  "description": "One sentence summary shown on the homepage."
}
```

After saving, refresh the homepage. The new paper card will appear automatically.

## Update Homepage Hero

The homepage hero image is in `index.html`:

```html
<img src="assets/rendered/calligraphy_hero.png" alt="Chinese calligraphy scroll on warm xuan paper">
```

To replace it:

1. Add a new image under `assets/rendered/`
2. Update the `src`
3. Refresh the browser

## Update Logo or Favicon

Current favicon and navigation logo:

```text
Website/assets/rendered/favicon.ico
```

Homepage favicon reference:

```html
<link rel="icon" href="assets/rendered/favicon.ico" type="image/x-icon">
```

Navigation logo reference:

```html
<span class="seal image-seal"><img src="assets/rendered/favicon.ico" alt=""></span>
```

For pages inside `papers/`, use:

```html
<span class="seal image-seal"><img src="../assets/rendered/favicon.ico" alt=""></span>
```

## Deploy to a Server

This is a pure static website. Upload the entire contents of `Website/` to your web root.

Example using `scp`:

```bash
scp -r /Users/shengyijun/CVPR2026/Website/* username@server_ip:/var/www/digital-humanities/
```

Example Nginx config:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/digital-humanities;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Then visit:

```text
http://your-domain.com/
```

## Deploy with GitHub Pages

1. Create a GitHub repository.
2. Put the contents of `Website/` at the repository root.
3. Push to GitHub.
4. Open `Settings -> Pages`.
5. Select `Deploy from a branch`.
6. Select the `main` branch and `/root`.

GitHub Pages will provide a URL like:

```text
https://username.github.io/repo-name/
```

## Notes

- Keep relative paths unchanged when deploying.
- Do not upload only `index.html`; upload `assets/`, `data/`, and `papers/` together.
- If the homepage shows `Paper list failed to load`, make sure the site is opened through a server and that `data/papers.json` is valid JSON.
- Validate JSON with:

```bash
python3 -m json.tool Website/data/papers.json
```
