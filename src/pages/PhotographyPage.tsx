import { useSiteContent } from '../components/layout/SiteContentProvider';
import { Link } from 'react-router-dom';
import PageBanner from '../components/layout/PageBanner';
import CommandersCup, { cupTitle, cupIntro, cupDescription, cupPhotos } from '../components/media/CommandersCup';

export default function PhotographyPage() {
  const site = useSiteContent();
  return <>
    <PageBanner eyebrow="Photography" title={cupTitle} copy={cupIntro} image={cupPhotos[0].src}/>
    <div className="light-page photography-page">
      <CommandersCup priority/>
      {cupDescription.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className="photography-grid">
        {cupPhotos.map(photo => <img key={photo.src} src={site.image(photo.slot) ?? photo.src} alt={site.alt(photo.slot, photo.alt)} loading="lazy" decoding="async"/>)}
      </div>
      <Link className="landing-button primary" to="/booking">Enquire About Photography</Link>
    </div>
  </>;
}
