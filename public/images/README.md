# Image assets

Drop production images here and reference them from content files / components.

| Asset                  | Used by                              | Notes                                  |
| ---------------------- | ------------------------------------ | -------------------------------------- |
| `wesdev-logo.png/.svg` | `Navbar` brand lockup                | shipped (2760×1400 wordmark).          |
| `portrait.jpg`         | `content/about.json` → `image`       | Wesley portrait (4:5). Replaces frame. |
| `work/*.jpg`           | `content/work/*.md` → `image`        | 16:9 project thumbnails.               |
| `../og-image.png`      | `app/layout.tsx` Open Graph metadata | Social share image (brand logo).       |

To use the portrait, set `"image": "/images/portrait.jpg"` in `about.json`.
To use a work thumbnail, set `image: /images/work/summit.jpg` in the project's
`.md` frontmatter. Until then, the diagonal-hatch placeholder frames render.
