import { useState } from 'react';
export default function ClickToPlay({title, youtubeId, facebookUrl}: {title: string; youtubeId?: string; facebookUrl?: string}) {
  const [playing, setPlaying] = useState(false);
  const src = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1` : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookUrl!)}&show_text=false&autoplay=true`;
  return <div className="click-to-play">
    {playing ? <iframe className="project-video" src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      <img src={youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : '/media/home-768.webp'} alt="" loading="lazy" decoding="async"/>
      <span>▶ Play video</span>
    </button>}
    {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer">Watch on Facebook</a>}
  </div>;
}
