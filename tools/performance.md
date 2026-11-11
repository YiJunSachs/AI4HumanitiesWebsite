# Static resource delivery

The original PNG/JPEG/PDF/font files are retained. Pages use smaller WebP display copies in `assets/optimized/`; full-resolution source and paper links are unchanged. Diagram and restoration-comparison display copies use lossless WebP encoding (some are resized to their display resolution). Photographs and decorative backgrounds use quality 90; transparency is preserved. Conversion dimensions and sizes are recorded in `web-assets-manifest.json`.

The homepage background has 1280, 2560 and 3200 pixel variants selected with `srcset`. Images below the homepage introduction use native lazy loading and explicit dimensions. No layout styles or research copy were changed.

## Updating copy

After changing page copy or translations, run `python tools/refresh-heading-font.py` in an environment with `fonttools[woff]`. This subsets the original Hanyi font to the characters in current HTML/CSS/JS/JSON and updates its stylesheet URLs. The original font remains available. Bump the changed stylesheet query versions in HTML before deploying. Do not overwrite a published file in `assets/optimized/`; use a new content-versioned filename when its content changes.

## Server caching

HTML must revalidate (`Cache-Control: no-cache`). Versioned display assets may be cached for one year with `immutable`; other static files use a shorter cache lifetime. Enable gzip for HTML, CSS, JS, JSON and SVG. Already compressed WebP and WOFF2 do not need gzip. Validate with `nginx -t` before reloading, and retain the previous release and config for rollback.
