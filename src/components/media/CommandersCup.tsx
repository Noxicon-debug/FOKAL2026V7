import { useEffect, useState } from 'react';
export const cupTitle = 'PNGDF Commanders Cup -2026';
export const cupIntro = 'Photography coverage of the 2RPIR team at the 2026 PNGDF Commanders Cup, capturing the action, teamwork and spirit of competition.';
export const cupDescription = 'Fokal Solutions Limited documented the 2RPIR team through sports photography, bringing the intensity of play and the connection between teammates into focus.\n\nFrom on-field action to moments of determination and camaraderie, this collection celebrates the people behind the team and preserves their Commanders Cup experience.';
export const cupPhotos = [18,29,4,23,36,33,25,14,20,27,37].map(number => ({src:`/media/commanders-cup-${number}-1280.webp`,small:`/media/commanders-cup-${number}-640.webp`,alt:`2RPIR team at the PNGDF Commanders Cup 2026 — photograph ${number}`}));
export default function CommandersCup({priority=false}:{priority?:boolean}) {
 const [slide,setSlide]=useState(0);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  if(paused || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=setInterval(()=>setSlide(i=>(i+1)%cupPhotos.length),5000);
  return()=>clearInterval(timer);
 },[paused]);
 const photo=cupPhotos[slide];
 return <section className="cup-slideshow" aria-label="PNGDF Commanders Cup photographs" aria-roledescription="carousel">
  <img src={photo.src} srcSet={`${photo.small} 640w, ${photo.src} 1280w`} sizes="(max-width:600px) 100vw, 60vw" alt={photo.alt} loading={priority?'eager':'lazy'} decoding="async"/>
  <div className="cup-controls"><button aria-label="Previous photograph" onClick={()=>{setPaused(true);setSlide(i=>(i+cupPhotos.length-1)%cupPhotos.length);}}>‹</button><span>{slide+1} / {cupPhotos.length}</span><button onClick={()=>setPaused(!paused)}>{paused?'Play slideshow':'Pause slideshow'}</button><button aria-label="Next photograph" onClick={()=>{setPaused(true);setSlide(i=>(i+1)%cupPhotos.length);}}>›</button></div>
 </section>;
}
