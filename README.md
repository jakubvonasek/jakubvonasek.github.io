# Personal Website

Personal site and portfolio of Jakub Vonášek — live at [jakub-dev.com](https://jakub-dev.com).

Static HTML/CSS/JS. No build step, no dependencies, no framework.

## Running locally

Serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

You can also just `open index.html`, but prefer the server: root-relative
links (`/postit/`, `/round-corners/`) don't resolve over `file://`.

## Deploying

Hosted from the `jakubvonasek/jakubvonasek.github.io` repo — pushing to
`master` publishes the site. `CNAME` points it at `jakub-dev.com`, and
Vercel Analytics is loaded on the landing page.

## Structure

| Path               | What it is                                        |
| ------------------ | ------------------------------------------------- |
| `index.html`       | Landing page — hero, projects, contact            |
| `minesweeper.html` | Browser Minesweeper                               |
| `games/chess.html` | Browser chess                                     |
| `postit/`          | PostIt — gradient backgrounds for screenshots     |
| `round-corners/`   | Round Corners — rounds app-icon corners online    |
| `3d/`              | Redirect stub                                     |
| `emi/`             | Personal side page                                |
| `cv.txt`           | CV                                                |

## Notes

`index.html` is self-contained: styles live in a single `<style>` block in
the `<head>`, scripts sit at the end of `<body>`.

The hero's AI prompt bar is a front-end piece with no backend — it matches
the query against keywords in `REPLIES` and streams a canned answer that
links to the relevant project. To wire it to a real model, replace
`pickReply()` with a fetch. All of its animations are disabled under
`prefers-reduced-motion`.

## Conventions

- Standard HTML5 / CSS3, 2-space indentation
- Clean, commented JavaScript
- Both light and dark color schemes are supported — check changes in both
