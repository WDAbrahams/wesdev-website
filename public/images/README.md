# Image assets

Drop production images here and reference them from content files / components.

| Asset                  | Used by                              | Notes                                  |
| ---------------------- | ------------------------------------ | -------------------------------------- |
| `wesdev-logo.png/.svg` | `Navbar` brand lockup                | shipped (2760×1400 wordmark).          |
| `wesley-portrait.webp` | `content/about.json` → `image`       | Wesley portrait (4:5 via cover). Optimized webp. |
| `work/*.jpg`           | `content/work/*.md` → `image`        | 16:9 project thumbnails.               |
| `../og-image.png`      | `app/layout.tsx` Open Graph metadata | Social share image (brand logo).       |

The portrait is wired up: `"image": "/images/wesley-portrait.webp"` in `about.json`.
To use a work thumbnail, set `image: /images/work/summit.jpg` in the project's
`.md` frontmatter. Until then, the diagonal-hatch placeholder frames render.
