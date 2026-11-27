import { Link } from 'react-router-dom';
import PageBanner from '../components/layout/PageBanner';

export default function NotFoundPage() {
  return <>
    <PageBanner slot="/404" eyebrow="404" title="Page Not Found"
      copy="The page you’re looking for may have moved or is temporarily unavailable."/>
    <div className="landing-shell landing-band">
      <Link to="/" className="landing-button primary">Back to Home</Link>
    </div>
  </>;
}
