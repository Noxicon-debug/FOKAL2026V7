# FOKAL-V2-dev

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Noxicon-debug/FOKAL-V2-dev)

## Quote and contact submissions

Both forms submit to Netlify Forms. The `submission-created` function copies
verified submissions to the private Supabase `form_submissions` table.

1. Apply the Supabase migrations, including `20261124000000_form_submissions.sql`.
2. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the Netlify site's environment
   variables with the Functions scope. Use a Supabase secret API key. Keep it out
   of the repository and out of any `VITE_` variable.
3. Enable form detection in Netlify and deploy. Confirm that `booking` and
   `contact` appear in the site's Forms dashboard.
4. Submit one test through each deployed form and confirm that both entries
   appear in Netlify Forms and in the Supabase table. Check the
   `submission-created` function logs if a Netlify entry has no Supabase copy.

If enquiries should also reach an inbox, configure the recipient under
**Forms → Submission notifications** in Netlify.

## Our Work CMS

Use `/admin` to add projects, upload photos, and publish to `/gallery`. Drafts
are visible to editors. Saving changes to a published entry updates the live
gallery. Photos accept JPEG, PNG, WebP, GIF, or AVIF files up to 10 MB.

Before deploying the frontend, apply the Supabase migrations in order. Grant
each approved editor the boolean `gallery_editor: true` in Supabase Auth
`app_metadata` using a trusted admin session or the Auth Admin API. Editors
should sign out and back in after the grant so their session receives it.
Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the frontend.
Without those settings, `/gallery` displays the bundled portfolio for local preview.

Set both variables in the Netlify production build environment and in the
ignored `.env.local` for the local preview. Use the CMS project's public
Supabase key. Redeploy Netlify and restart Vite after updating the values.
In Supabase Auth, allow `https://fokalltd.com/reset-password` and the exact
local preview origin with a `/reset-password` path for password recovery.

For share previews on `/work/:projectId`, also make the same public Supabase URL
and public key available to Netlify Functions. The share handler only reads
published projects and serves the project title, description and cover metadata.

To provide verified English captions and a transcript for the home showreel,
set `VITE_SHOWREEL_CAPTIONS_URL` to its WebVTT file and
`VITE_SHOWREEL_TRANSCRIPT_URL` to its readable transcript. Use same-origin
assets or allow cross-origin access on the media server.

New uploads live in the private `our-work` bucket. Unpublishing stops new
public media URLs from being issued. Previously issued URLs can remain valid
for up to five minutes.
