import { useState } from 'react';
export default function ClickToPlay({title, youtubeId, facebookUrl, poster, showTranscriptLink = true}: {title: string; youtubeId?: string; facebookUrl?: string; poster?: string; showTranscriptLink?: boolean}) {
  const [playing, setPlaying] = useState(false);
  const src = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&cc_load_policy=1` : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookUrl!)}&show_text=false&autoplay=true`;
  return <div className="click-to-play">
    {playing ? <iframe className="project-video" src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      <img src={poster || (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : '/media/home-768.webp')} alt="" loading="lazy" decoding="async"/>
      <span>▶ Play video</span>
    </button>}
    {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer">Watch on Facebook</a>}
    {youtubeId && showTranscriptLink && <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">
      Open on YouTube for transcript options
    </a>}
  </div>;
}
