import { Link } from 'react-router-dom';
import CommandersCup, {cupTitle,cupIntro,cupDescription,cupPhotos} from '../components/media/CommandersCup';
export default function PhotographyPage() {
  return (
    <main className="light-page photography-page">
      <small>PHOTOGRAPHY</small>
      <h1>{cupTitle}</h1>
      <p>{cupIntro}</p>
      <CommandersCup priority />
      {cupDescription.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className="photography-grid">
        {cupPhotos.map(photo => (
          <img key={photo.src} src={photo.small} srcSet={`${photo.small} 640w, ${photo.src} 1280w`}
            sizes="(max-width: 600px) 90vw, 33vw" alt={photo.alt} loading="lazy" decoding="async" />
        ))}
      </div>
      <Link className="blue-btn" to="/booking">ENQUIRE ABOUT PHOTOGRAPHY</Link>
    </main>
  );
}
