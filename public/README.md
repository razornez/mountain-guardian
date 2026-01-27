# Public Assets Directory

This directory contains static assets that are served directly by Next.js.

## Files

- `favicon.ico` - Browser favicon
- `favicon.svg` - SVG version of the favicon
- `icon.png` - App icon (512x512)
- `placeholder.png` - Placeholder image for development
- `robots.txt` - Search engine crawler instructions
- `.gitkeep` - Ensures this directory is tracked by Git

## Usage

Files in this directory are served from the root URL:
- `/favicon.ico` → `public/favicon.ico`
- `/robots.txt` → `public/robots.txt`
- etc.

## Adding Assets

Place any static files (images, fonts, etc.) in this directory.
Reference them in your code without the `/public` prefix:

```jsx
<img src="/placeholder.png" alt="Example" />
```
