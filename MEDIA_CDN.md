# Public media CDN setup

1. Create a public `media` bucket in Supabase Storage.
2. Upload immutable files beneath `v1/images/` and `v1/videos/` using the naming convention in `src/lib/media-assets.ts`.
3. Generate AVIF and WebP images at 480, 768, 1280, and 1920 pixels wide. Generate H.264 MP4 video at mobile, tablet, and desktop bitrates plus a WebP/JPEG poster.
4. Set `Cache-Control: public, max-age=31536000, immutable` for versioned assets.
5. Set `VITE_MEDIA_CDN_URL=https://<project>.supabase.co/storage/v1/object/public/media/v1` when the files are live.

Until this variable is set, the application keeps using existing asset URLs so the site remains functional during migration.
