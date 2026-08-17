# Video ads

Drop five MP4s here, named exactly:

    demo-01.mp4  demo-02.mp4  demo-03.mp4  demo-04.mp4  demo-05.mp4

Each one goes live in the Video ads section as soon as the file exists.

Optional: add a still frame at `demo-01.jpg` (etc.) and set `poster` on the
matching entry in `lib/portfolio.ts`. Without a poster the card shows a
type-only panel, which is fine but plainer.

Titles, categories, and runtimes are edited in `lib/portfolio.ts` under
`VIDEO_ADS`.

Keep files under ~10 MB each — they are served straight from `public/`.
