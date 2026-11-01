# Coffee Frame Asset Setup

## Expected directory

Place the extracted files here:

```text
public/
└── coffee-frames/
    ├── coffee-frame-manifest.json
    ├── frame-000001.webp
    ├── frame-000002.webp
    ├── ...
    └── frame-000480.webp
```

## If using the four ZIP parts

Extract all four archives into the **same** `public/coffee-frames/` directory:

- Part 1: frames 000001–000120
- Part 2: frames 000121–000240
- Part 3: frames 000241–000360
- Part 4: frames 000361–000480

Do not extract each part into a separate subfolder unless the application is explicitly configured to load from those subfolders. If Windows asks whether to replace files, stop and inspect the duplicate; the ranges should not overlap.

## Verify the sequence

Check that:
- There are exactly 480 `.webp` files.
- The first is `frame-000001.webp`.
- The last is `frame-000480.webp`.
- Numbering is continuous with six digits.
- The manifest is present and valid JSON.
- A sample of early, middle, and late frames opens correctly.

Useful terminal checks:

```bash
# macOS / Linux
find public/coffee-frames -maxdepth 1 -name 'frame-*.webp' | wc -l
```

```powershell
# Windows PowerShell
(Get-ChildItem public/coffee-frames -Filter 'frame-*.webp').Count
```

Expected count: `480`.

## Public URL pattern

For a standard Next.js public directory:

```text
/public/coffee-frames/frame-000001.webp
```

is served at:

```text
/coffee-frames/frame-000001.webp
```

Do not include `/public` in the browser URL.

## Manifest

Use `coffee-frame-manifest.json` if it lists frame paths and timestamps. Inspect its actual schema rather than assuming property names. If it is only metadata, deterministic six-digit filenames are sufficient.

## Important

Do not recompress or resize the supplied frames during initial integration. First make the sequence work correctly. Optimize only after measuring actual loading and rendering performance.
