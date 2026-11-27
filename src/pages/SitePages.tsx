import { useSiteContent } from '../components/layout/SiteContentProvider';
import { defaultTeam, validSocial } from '../lib/site-content';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BarChart3, PlayCircle, Clapperboard, Gem, Layers, Play, ArrowRight, CalendarDays, Camera, Check, ChevronDown, ChevronLeft, ChevronRight, Facebook, Heart, Instagram, Lightbulb, Linkedin, Mail, MapPin, Megaphone, MessageCircle, Music2, Phone, Radio, Target, Users, Video, Award, Eye, X } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { galleryVideo } from '../lib/gallery-media';
import { useGalleryCategories, useGalleryProjects } from '../lib/hooks/useGallery';
import { projectStatuses, type ProjectStatus } from '../types/gallery';
import * as Dialog from '@radix-ui/react-dialog';
import ResponsiveImage from '../components/media/ResponsiveImage';
import PageBanner from '../components/layout/PageBanner';
import NotFoundPage from './NotFoundPage';
import ClickToPlay from '../components/media/ClickToPlay';
import {cupTitle,cupIntro,cupDescription,cupPhotos} from '../components/media/CommandersCup';
import { optimizedImage } from '../lib/media-assets';


const IMG = {
  hero: '/images/AG8A5146_fullres.jpg',
  team: '/images/273A1336.JPG',
  work: '/images/6H8A9956.jpg',
  beach: '/images/AG8A4662_fullres.jpg',
  event: '/images/273A1438.JPG',
  about: '/media/image-8-768.webp',
  services: '/images/6H8A9052.jpg',
  gallery: '/media/work-poster.webp',
  contact: '/media/contact-poster.webp',
  booking: '/images/273A1295.JPG',
  clients: '/images/AG8A4970_fullres.jpg',
};
// Set VITE_HERO_VIDEO_URL to the Supabase Storage public URL after its bucket is provisioned.
const HERO_VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL || '/videos/fokal-postcards.m4v';
const SHOWREEL_CAPTIONS = import.meta.env.VITE_SHOWREEL_CAPTIONS_URL;
const SHOWREEL_TRANSCRIPT = import.meta.env.VITE_SHOWREEL_TRANSCRIPT_URL;
const CONTACT_HERO_VIDEO = import.meta.env.VITE_CONTACT_HERO_VIDEO;
const CONTACT_MAP_EMBED = 'https://www.google.com/maps?q=-9.4554272,147.1855726&z=16&output=embed';
const CONTACT_MAP_LINK = 'https://www.google.com/maps/place/FOKAL+SOLUTIONS+LTD/@-9.4554219,147.1829977,1112m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6902313e709e52ed:0xc9ca5de553e7313d!8m2!3d-9.4554272!4d147.1855726!16s%2Fg%2F11zf333mjb?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';
const HOME_HERO_IMAGE = {fallback:'/media/home-1920.webp',webp:Object.fromEntries([480,768,1280,1920].map(w=>[w,`/media/home-${w}.webp`]))};
const LANDING_HERO_IMAGE = {fallback:'/media/image-9-1920.webp',webp:Object.fromEntries([480,768,1280,1920].map(width=>[width,`/media/image-9-${width}.webp`]))};
const LANDING_SCENIC_IMAGE = HOME_HERO_IMAGE;
const LANDING_STUDIO_IMAGE = {
  fallback: '/media/image-55-1280.webp',
  webp: Object.fromEntries([480, 768, 1280, 1920].map(width => [width, `/media/image-55-${width}.webp`])),
};
const homeClients = [
  ['NiuPower', 0], ['UNFPA', 1], ['TWM Group', 2], ['BSP', 3],
  ['SLMP', 4], ['APTC', 6], ['UNCDF', 7],
] as const;
const SUPABASE_ASSETS = {
  corporate: '/media/image-10-768.webp',
  documentary: '/media/image-11-768.webp',
  liveEvent: '/media/image-12-768.webp',
  brand: '/media/image-13-768.webp',
} as const;
const services: [string, any, string, string[]][] = [
  ['Video Production', Video, 'Documentaries, campaign films and event coverage from planning to final edits.', ['/media/work-poster.webp']],
  ['Photography', Camera, 'Capturing moments that tell your story with clarity and impact.', ['/images/photo1.jpg']],
  ['Live Streaming', Radio, 'Professional live streaming solutions for events of any scale.', ['/images/LIV_1.jpg', '/images/live2.jpg', '/media/image-15-768.webp']],
  ['Events', CalendarDays, 'End-to-end event production and management.', ['/media/image-16-768.webp', '/media/image-17-768.webp', '/media/image-18-768.webp']],
  ['Marketing', Megaphone, 'Creative strategies that build brands and drive results.', [SUPABASE_ASSETS.brand, SUPABASE_ASSETS.corporate, SUPABASE_ASSETS.documentary, SUPABASE_ASSETS.liveEvent]],
  ['Branding', Award, 'Distinctive brand identities that make a lasting impression.', ['/media/image-22-768.webp', '/media/image-23-768.webp', '/media/image-24-768.webp']],
  ['Staging & AV', Lightbulb, 'Stage, lighting, sound and AV solutions for unforgettable events.', ['/media/image-25-768.webp', '/media/image-26-768.webp', '/media/image-27-768.webp', '/media/image-28-768.webp']],
];
const serviceDetails: Record<string, { overview: string; deliverables: string[] }> = {
  'Video Production': {
    overview: 'We plan, film and edit documentaries, campaign films and event coverage for organisations in Port Moresby and across Papua New Guinea. Tell us your audience, deadlines and where the finished video will be shown so we can scope the shoot and edits.',
    deliverables: ['Creative planning and shoot coordination', 'On-location filming and audio capture', 'Editing, colour grading and sound finishing', 'Final video files for agreed platforms'],
  },
  Photography: { overview: 'From sports action and graduation celebrations to executive portraits, corporate events and industrial documentation, our photographers combine careful planning, strong composition and professional post-production to create images that communicate clearly and remain useful across print, digital and social channels.', deliverables: ['Sports photography — action, teamwork and competition highlights', 'Graduation photography — portraits, ceremonies and milestone moments', 'Professional portraits and corporate event coverage', 'Industrial documentation and retouched high-resolution images'] },
  'Live Streaming': { overview: 'We deliver reliable multi-camera broadcasts for conferences, ceremonies, launches and public events. Our team manages capture, switching, graphics, audio, connectivity and platform delivery so audiences can join from anywhere with a polished viewing experience.', deliverables: ['Multi-camera production', 'Live graphics and lower thirds', 'Platform setup and stream monitoring', 'Recorded master and highlight edits'] },
  Events: { overview: 'Our event team coordinates the complete production journey, from concept and run sheet development through suppliers, staging, guest experience and on-site delivery. Every moving part is managed around your objectives, audience and venue.', deliverables: ['Event planning and coordination', 'Technical production management', 'Stage and programme direction', 'On-site crew and post-event reporting'] },
  Marketing: { overview: 'We turn business goals into focused campaigns built for Papua New Guinea audiences. Strategy, creative development, content production and channel execution work together to strengthen awareness, engagement and measurable results.', deliverables: ['Campaign and content strategy', 'Social and digital content', 'Copywriting and creative production', 'Performance reporting and optimisation'] },
  Branding: { overview: 'We create distinctive, practical brand systems that help organisations communicate with confidence. Our process aligns visual identity, messaging and real-world applications so every touchpoint feels consistent and recognisable.', deliverables: ['Brand strategy and positioning', 'Logo and visual identity systems', 'Brand guidelines and templates', 'Launch collateral and campaign assets'] },
  'Staging & AV': { overview: 'From intimate presentations to large public events, we design and operate staging, lighting, sound and screen systems that support the programme and keep audiences engaged. Equipment and crew are matched to the venue and production requirements.', deliverables: ['Stage and set configuration', 'Lighting and sound systems', 'LED screens and presentation playback', 'Technical crew and show operation'] },
};
type Project = {
  youtubeId?: string;
  facebookUrl?: string;
  commissionedBy?: string;
  role?: string;
  status: string;
  title: string;
  category: string;
  image: string;
  date: string;
  client: string;
  progress: number;
  description: string;
  location: string;
};
const projectSlugs: Record<number,string> = {0:'guardians-of-the-sea',2:'governor-allan-bird-cocoa-training',3:'bougainville-chocolate-festival-2025'};
const homeProjectUpdates: Record<number, {title: string; youtubeId: string; description: string}> = {
  0: {
    title: 'Guardians of the Sea',
    youtubeId: 'oh1jUFaVbwo',
    description: `Eda Davara Marine Sanctuary and the Eco Rangers is a documentary created by Fokal Solutions Limited, showcasing Eda Davara’s conservation activities in the Barakau area of Central Province, Papua New Guinea.

Through this documentary, we shine a light on local conservation efforts and the people working to care for their marine environment. It is an opportunity to recognise their commitment and share a story of community, responsibility, and protecting the natural world for future generations.

At Fokal Solutions Limited, we bring meaningful stories to the screen through professional filming, documentary production, and editing. From capturing footage on location to shaping the final story, we help communities and organisations share their work, raise awareness, and connect with audiences.

We are proud to showcase Eda Davara and the Eco Rangers, highlighting conservation efforts in Barakau through the power of documentary storytelling.`,
  },
  2: {
    title: 'Governor Allan Bird Cocoa Fertilizer Training. - 2024',
    youtubeId: 't7jFfb65dpU',
    description: `Healthy soils, healthy cocoa trees, and stronger farming communities.
Join Governor Allan Bird in this cocoa fertiliser training video, sharing the importance of caring for cocoa trees and using fertiliser as part of good farm management. The video puts practical farming knowledge in focus, encouraging cocoa growers to invest in the health and productivity of their farms.

Fokal Solutions Limited was proud to produce this video, helping bring agricultural knowledge to the screen and making it accessible to wider audiences.

At Fokal Solutions Limited, we combine professional filming, editing, and storytelling to create engaging training videos, documentaries, and corporate productions. From capturing demonstrations to shaping clear explanations in the final edit, we help organisations share knowledge and connect with the communities they serve.`,
  },
  3: {
    title: 'Bougainville Chocolate Festival -2025',
    youtubeId: 'CLDt8SkPCOQ',
    description: `Fokal Solutions Limited was proud to produce this highlights video for the 2025 Bougainville Chocolate Festival in Buka, capturing the spirit of the occasion and celebrating the people at the heart of Bougainville’s cocoa story.

This video brings together moments from the festival, offering a glimpse into a celebration of local pride, passion, and the connections that bring communities together.

At Fokal Solutions Limited, we bring events and stories to life through professional filming and video production. From capturing moments on location to crafting the final edit, we create videos that help businesses, organizations, and communities share their stories and connect with wider audiences.

We are proud to have played a part in documenting the 2025 Bougainville Chocolate Festival and sharing this celebration through our production work.`,
  },
};

function ProjectVideo({id,title}:{id:string;title:string}){
 return <ClickToPlay youtubeId={id} title={title}/>;
}
function FacebookProjectVideo({url,title}:{url:string;title:string}){
 return <ClickToPlay facebookUrl={url} title={title}/>;
}
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  display_order: number;
};
const normalizeTeamMemberName = (name: string) => name.trim().toUpperCase();
const projects: Project[] = [
  { title:'Guardians of The Tides – 2024', category:'Video Production', image:SUPABASE_ASSETS.corporate, youtubeId:'iM53m4wdALo', date:'2024', client:'Eda Davara Marine Sanctuary', role:'Lead Production Company (Concept, Direction, Filming, Editing)', progress:100, status:'Completed', description:'This project focused on documenting community-level responses to climate-related challenges, highlighting local resilience, adaptation strategies, and lived experiences. FOKAL Solutions Limited managed the project from concept development through to final delivery, ensuring ethical representation and clarity of messaging. The content was formatted for use across social media, presentations, and stakeholder engagement.', location:'' },
  {"title": "Sea Women of Melanesia", "category": "Video Production", "date": "2023", "client": "UNDP Equator Initiative", "commissionedBy": "What Took You So Long?", "role": "Director of Photography", "youtubeId": "60-lq-OzoWg", "description": "In 2023, The Sea Women of Melanesia was awarded the UNDP Equator Initiative Prize, and FOKAL Solutions Limited was contracted as the in-country filming partner to capture the stories and work of Sea Women of Melanesia. Fokal Solutions Limited managed the Production and filming of the feature documentary spanning over three days. This video highlighted climate resilience initiatives at the community level, showcasing the role of local leadership and traditional knowledge in adaptation efforts.", "location": "", "image": SUPABASE_ASSETS.documentary, "progress": 100, "status": "Completed"},
  {"title": "East Sepik Province Labour Mobility – Cocoa Farming Video – 2024", "category": "Video Production", "date": "2024", "client": "East Sepik Provincial Government / Labour Mobility Programme", "role": "Lead Production Company (Concept, Filming, Direction, Editing)", "facebookUrl": "https://www.facebook.com/share/v/1AT98jwtPm/", "description": "FOKAL Solutions Limited produced a short-form video for the East Sepik Province Labour Mobility initiative, featuring the Governor of East Sepik Province, Hon. Allan Bird, who explains the different types of cocoa in Papua New Guinea and best-practice cocoa farming methods. The video was designed to convey practical agricultural knowledge through a trusted local voice, supporting sustainable livelihoods and economic resilience. FOKAL Solutions Limited delivered the full production process, with the final content optimised for digital distribution and community-level engagement.", "location": "East Sepik Province", "image": SUPABASE_ASSETS.liveEvent, "progress": 100, "status": "Completed"},
  {"title": "Bougainville Chocolate Festival – Daily Highlights Video Series – 2025", "category": "Video Production", "date": "2025", "client": "Bougainville Tourism / Bougainville Chocolate Festival", "role": "Lead Production Company (Concept, Filming, Direction, Editing)", "facebookUrl": "https://www.facebook.com/share/v/1CokX46Gqs/", "description": "FOKAL Solutions Limited produced a series of daily highlight videos for the Bougainville Chocolate Festival in collaboration with Bougainville Tourism. The content captured cocoa-related activities, cultural performances, and community participation, promoting Bougainville as a cocoa-producing region and tourism destination. The production required a rapid turnaround, with daily filming and editing to enable timely digital release. Final outputs were optimised for online and social media platforms, delivering engaging, high-quality visual storytelling.", "location": "Bougainville", "image": SUPABASE_ASSETS.brand, "progress": 100, "status": "Completed"},
  { title:cupTitle, category:'Photography', image:'/media/commanders-cup-18-1280.webp', date:'2026', client:'2RPIR Team', role:'Photography Coverage', progress:100, status:'Completed', description:`${cupIntro}\n\n${cupDescription}`, location:'' },
  {"title": "TWM Group – World Environment Day Video – 2025", "category": "Video Production", "image": "/images/6H8A9956.jpg", "date": "2025", "client": "TWM Group", "role": "Lead Production Company (Filming, Editing, Final Delivery)", "progress": 100, "status": "Completed", "description": "FOKAL Solutions Limited produced a video for TWM Group to mark World Environment Day, highlighting their community outreach initiatives promoting cleaner and safer environments. The production captured TWM Group’s engagement with local communities, including clean-up activities, educational outreach, and environmental advocacy. The project required coordinated on-location filming and post-production to create a visually compelling narrative that reinforced TWM Group’s commitment to environmental stewardship. Final outputs were optimised for online platforms and corporate communications.", "location": ""},
  { title:'Community Event', category:'Events', image:'/images/273A1438.JPG', date:'Jul 2026', client:'Save the Children PNG', progress:100, status:'Completed', description:'End-to-end production of a community outreach event including stage setup, sound, live coverage and photography for post-event reporting.', location:'Morobe Province' },
  { title:'Stage & Lighting Setup', category:'Staging & AV', image:'/images/273A1356.JPG', date:'Aug 2026', client:'Air Niugini', progress:100, status:'Completed', description:'Full stage design, lighting rig and PA system for a corporate awards night attended by 400 guests, with live mixing and playback support.', location:'Port Moresby, NCD' },
  { title:'Executive Portrait Series', category:'Photography', image:'/images/AG8A4971_fullres.jpg', date:'Jul 2026', client:'Westpac PNG', progress:100, status:'Completed', description:'A studio and on-location portrait series for the executive leadership team, delivered as high-resolution retouched images for print and web.', location:'Port Moresby, NCD' },
  { title:'Mining Site Documentation', category:'Photography', image:'/images/273A1295.JPG', date:'Jun 2026', client:'Newcrest Mining', progress:100, status:'Completed', description:'Industrial photography documenting mining operations, safety procedures and community programs across multiple sites over a one-week shoot.', location:'New Ireland Province' },
  { title:'Regional Roadshow', category:'Events', image:'/images/273A1265.JPG', date:'Aug 2026', client:'ExxonMobil PNG', progress:100, status:'Completed', description:'A four-city roadshow with pop-up stage, AV and live streaming at each stop, plus daily highlight reels for social media.', location:'Multiple Provinces' },
  { title:'Tourism Promotional Video', category:'Video Production', image:'/images/AG8A4973_fullres.jpg', date:'Sep 2026', client:'PNG Tourism Promotion Authority', progress:100, status:'Completed', description:'A vibrant promotional video showcasing PNG tourism destinations, featuring aerial, cultural and landscape footage set to an original score.', location:'Nationwide' },
  { title:'Annual Report Photography', category:'Photography', image:'/images/273A1298.JPG', date:'Sep 2026', client:'The World Bank', progress:100, status:'Completed', description:'Documentary-style photography for an annual report, covering project sites, beneficiaries and stakeholder meetings across three provinces.', location:'Multiple Provinces' },
  { title:'Hydropower Project Film', category:'Video Production', image:'/images/273A1230.JPG', date:'Oct 2026', client:'JICA Papua New Guinea', progress:65, status:'In Progress', description:'An ongoing documentary project tracking the construction of a community hydropower scheme, with site visits filmed at key milestones.', location:'East New Britain' },
  { title:'National Sports Broadcast', category:'Live Streaming', image:'/images/6H8A9047.jpg', date:'Oct 2026', client:'PNG Sports Foundation', progress:40, status:'In Progress', description:'Live multi-camera streaming of a national sports tournament across three weekends, with instant replay and commentary integration.', location:'Port Moresby, NCD' },
  { title:'Cultural Festival Coverage', category:'Events', image:'/images/273A1336.JPG', date:'Nov 2026', client:'National Cultural Commission', progress:15, status:'Planning', description:'Planned coverage of a three-day cultural festival including stage production, live streaming, photography and a post-event documentary short.', location:'Eastern Highlands' },
  { title:'Digital Literacy Campaign', category:'Marketing', image:'/images/6H8A9050.jpg', date:'Nov 2026', client:'Australian High Commission', progress:20, status:'Planning', description:'A multi-channel campaign promoting digital literacy, including video assets, social content, radio spots and community workshop materials.', location:'Nationwide' },
  { title:'University Graduation Live', category:'Live Streaming', image:'/images/AG8A5146_fullres.jpg', date:'Dec 2026', client:'University of Papua New Guinea', progress:10, status:'Planning', description:'Live streaming of graduation ceremonies across two days with multi-camera setup, lower-thirds and on-demand replay for remote families.', location:'Port Moresby, NCD' },
];

export function ProjectOverviewPage(){
 const {slug}=useParams();
 const entry=Object.entries(projectSlugs).find(([,value])=>value===slug);
 if (!entry) return <NotFoundPage/>;
 const index=Number(entry[0]);
 const project=projects[index];
 const content=homeProjectUpdates[index];
 return <><PageBanner eyebrow={project.category} title={content.title} copy={project.date} image={project.image}/>
 <div className="light-page photography-page project-overview">
  <Link className="public-back" to="/gallery">← All projects</Link>
  <ClickToPlay key={slug} youtubeId={content.youtubeId} title={content.title}/>
  <h2>Project overview</h2>{content.description.split('\n\n').map((paragraph,i)=><p key={i}>{paragraph}</p>)}
  <dl><dt>Client / Organisation</dt><dd>{project.client}</dd>{project.role&&<><dt>Our role</dt><dd>{project.role}</dd></>}{project.location&&<><dt>Location</dt><dd>{project.location}</dd></>}</dl>
  <Button to="/booking">DISCUSS A SIMILAR PROJECT</Button>
 </div></>;
}
function Button({to='/contact', children}:{to?:string,children:React.ReactNode}) { return <Link className="blue-btn" to={to}>{children}<ArrowRight size={17}/></Link>; }
function Stats() { return <div className="stats">{[[Users,'150+','Projects Completed'],[Heart,'100+','Happy Clients'],[CalendarDays,'10+','Years Experience'],[MapPin,'Across PNG','Serving Nationwide']].map(([Icon,n,l]:any)=><div key={l}><Icon/><b>{n}</b><span>{l}</span></div>)}</div>; }
const WORK_HERO_VIDEO = import.meta.env.VITE_WORK_HERO_VIDEO;

function CTA() {
  const site = useSiteContent();
  return <section className="landing-contact" style={site.background('site:cta')}><div className="landing-shell landing-heading">
    <div><SectionLabel>Let’s Work Together</SectionLabel><h2>{site.copy("site.cta", "Have a Project in Mind?")}</h2>
      <p>We’d love to hear about your next project.</p></div>
    <div className="landing-actions">
      <Link className="landing-button primary" to="/booking">{site.copy("site.ctaLabel", "Request a Quote")} <ArrowRight size={19}/></Link>
      <Link className="landing-button" to="/contact"><Phone size={18}/>Contact Our Team</Link>
    </div>
  </div></section>;
}

const landingServices = [
  [Video, 'Media & Film Production', 'Corporate video, documentaries, commercials, photography, live streaming and broadcast production.'],
  [Megaphone, 'Marketing & Communications', 'Strategic communications, digital marketing, social media, campaigns and brand development.'],
  [BarChart3, 'Research & Insights', 'Field research, community engagement and data-driven storytelling.'],
  [CalendarDays, 'Events & Production Management', 'Corporate events, conferences, product launches and virtual events.'],
  [Layers, 'Audio-Visual & Technical Solutions', 'Professional sound, staging, lighting, LED screens and technical support.'],
] as const;

function SectionLabel({children}: {children: React.ReactNode}) {
  return <div className="landing-label">{children}</div>;
}

function LandingStats({about = false}: {about?: boolean}) {
  const stats = [
    [about ? Video : Clapperboard, '150+', 'Projects Completed'],
    [Users, '100+', about ? 'Clients & Partners' : 'Happy Clients'],
    [CalendarDays, '10+', 'Years of Experience'],
    [MapPin, 'Nationwide', 'Service Across PNG'],
  ] as const;
  return <dl className="landing-stats">{stats.map(([Icon, figure, label]) => <div key={label}>
    <Icon aria-hidden="true"/><dt>{label}</dt><dd>{figure}</dd>
  </div>)}</dl>;
}

function LandingHero({about = false}: {about?: boolean}) {
  const site = useSiteContent();
  return <section className={`landing-hero ${about ? 'landing-hero-about' : ''}`}>
    <ResponsiveImage className="landing-hero-photo" asset={site.asset(about ? 'hero:/about' : 'hero:/', LANDING_HERO_IMAGE)} alt="" priority sizes="100vw"/>
    <div className="landing-shell">
      <div className="landing-hero-copy">
        {about && <SectionLabel>About Us</SectionLabel>}
        {about ? <h1>{site.copy("about.hero", "A Papua New Guinean Creative Production Company")}</h1> : site.content.copy?.["home.hero"]?.trim() ? <h1 className="whitespace-pre-line">{site.content.copy["home.hero"]}</h1> :
          <h1>Creative<br/>Storytelling.<br/>Professional<br/>Production.<br/><strong>Meaningful Impact.</strong></h1>}
        <p>{about
          ? 'We tell stories, create experiences and deliver integrated media, marketing and event solutions across Papua New Guinea.'
          : 'Fokal Solutions Limited delivers integrated media production, marketing, communications and event solutions across Papua New Guinea.'}</p>
        {!about && <div className="landing-actions">
          <Link className="landing-button primary" to="/gallery"><PlayCircle size={20}/>Explore Our Work</Link>
          <Link className="landing-button" to="/booking">{site.copy("site.ctaLabel", "Request a Quote")} <ArrowRight size={19}/></Link>
        </div>}
      </div>
      {!about && <LandingStats/>}
    </div>
  </section>;
}

function StudioShowreel() {
  const site = useSiteContent();
  const [failed, setFailed] = useState(false);
  return <Dialog.Root onOpenChange={open => { if (open) setFailed(false); }}>
    <Dialog.Trigger className="landing-showreel" aria-label="Watch the Fokal showreel">
      <ResponsiveImage asset={site.asset('home:showreel', LANDING_STUDIO_IMAGE)} alt="" sizes="(max-width: 760px) 100vw, 55vw"/>
      <span><Play fill="currentColor" aria-hidden="true"/></span>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="showreel-overlay"/>
      <Dialog.Content className="showreel-dialog" aria-describedby={undefined}>
        <div className="showreel-heading">
          <Dialog.Title>Fokal Showreel</Dialog.Title>
          <Dialog.Close aria-label="Close showreel">&times;</Dialog.Close>
        </div>
        {failed ? <p role="alert">The showreel couldn’t play. <a href={HERO_VIDEO_URL}>Open the video directly</a>.</p> :
          <video src={HERO_VIDEO_URL} poster={HOME_HERO_IMAGE.fallback} controls autoPlay playsInline
            crossOrigin={SHOWREEL_CAPTIONS ? 'anonymous' : undefined} onError={() => setFailed(true)}>
            {SHOWREEL_CAPTIONS && <track kind="captions" src={SHOWREEL_CAPTIONS} srcLang="en" label="English" default/>}
          </video>}
        <details className="px-4 py-3 text-white">
          <summary>Read about the showreel</summary>
          <p className="mt-2">Fokal’s portfolio spans photography, video, live streaming and event coverage across Papua New Guinea.</p>
          <Link className="underline" to="/gallery">Explore Our Work</Link>
          {SHOWREEL_TRANSCRIPT && <a className="ml-4 underline" href={SHOWREEL_TRANSCRIPT}>Read the showreel transcript</a>}
        </details>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

function ClientLogos() {
  const site = useSiteContent();
  return <div id="clients" className="landing-partners">
    <div className="landing-partners-heading"><SectionLabel>Our Clients &amp; Partners</SectionLabel></div>
    <div className="landing-logo-strip">
      <div className="landing-logo-track">
        {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate || undefined}>
          {homeClients.map(([name, image]) => <li key={name}>
            <img src={site.image(`home:client:${name}`) ?? `/media/image-${image}-480.webp`} alt={duplicate ? '' : site.alt(`home:client:${name}`, name)} loading="lazy" decoding="async"/>
          </li>)}
        </ul>)}
      </div>
    </div>
  </div>;
}

export function HomePage() {
  const site = useSiteContent();
  return <div className="landing-page landing-home">
    <LandingHero/>
    <section className="landing-shell landing-intro">
      <div>
        <SectionLabel>Who We Are</SectionLabel>
        <h2>Fokal Solutions Limited</h2>
        <p className="landing-tagline">Driven by Creativity, Backed by Experience, Inspired by You.</p>
        <p>{site.copy("home.intro", "We are a Papua New Guinean creative production, marketing and events company. We bring together creative storytelling, technical expertise and strategic communications to help organisations share their stories, engage audiences and deliver meaningful experiences.")}</p>
        <Link className="landing-button" to="/about">More About Us <ArrowRight size={18}/></Link>
      </div>
      <StudioShowreel/>
    </section>

    <section className="landing-services">
      <div className="landing-shell landing-band">
        <div className="landing-heading">
          <div><SectionLabel>Our Services</SectionLabel><h2>End-to-End Creative &amp; Production Solutions</h2></div>
          <Link to="/services">View All Services <ArrowRight size={18}/></Link>
        </div>
        <div className="landing-services-grid">{landingServices.map(([Icon, title, description]) =>
          <article key={title}><Icon aria-hidden="true"/><h3>{title}</h3><p>{description}</p></article>
        )}</div>
      </div>
    </section>

    <section className="landing-shell landing-band">
      <div className="landing-heading">
        <div><SectionLabel>Featured Projects</SectionLabel><h2>{site.copy("home.work", "Our Work in Action")}</h2></div>
        <Link to="/gallery">View All Projects <ArrowRight size={18}/></Link>
      </div>
      <div className="landing-projects">
        {projects.slice(0, 4).map((project, index) => {
          const photography = index === 1;
          const title = ['Guardians of the Sea', 'PNGDF Commanders Cup 2026', 'Governor Allan Bird Cocoa Fertilizer Training', 'Bougainville Chocolate Festival 2025'][index];
          const cover = photography ? cupPhotos[0].src : project.image;
          const route = photography ? '/photography' : '/projects/' + projectSlugs[index];
          const youtubeId = photography ? undefined : homeProjectUpdates[index]?.youtubeId ?? project.youtubeId;
          return <article key={route} className="landing-project">
            <Link to={route}>
              <ResponsiveImage asset={site.asset(`home:project:${index}`, optimizedImage(cover))} alt={site.alt(`home:project:${index}`, "")} sizes="(max-width: 900px) 50vw, 25vw"/>
              <strong>{title}</strong>
            </Link>
            {youtubeId && <Dialog.Root>
              <Dialog.Trigger className="landing-project-play" aria-label={`Play ${title}`}><PlayCircle aria-hidden="true"/></Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="showreel-overlay"/>
                <Dialog.Content className="showreel-dialog" aria-describedby={undefined}>
                  <div className="showreel-heading"><Dialog.Title>{title}</Dialog.Title><Dialog.Close aria-label="Close video">&times;</Dialog.Close></div>
                  <iframe className="landing-project-player" src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&cc_load_policy=1`}
                    title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>}
          </article>;
        })}
      </div>
    </section>

    <section className="landing-proof" aria-label="Why choose Fokal">
      <div className="landing-trust" style={site.background('home:trust')}>
        <SectionLabel>Why Choose Fokal</SectionLabel>
        <h2>A Trusted Creative Partner<br/>in Papua New Guinea</h2>
        <ul>{[
          'Integrated media, marketing and event capabilities',
          'Proven experience across diverse sectors',
          'Local knowledge with a national reach',
          'Professional, reliable and delivery-focused team',
          'Strong track record with government, corporate and development clients',
        ].map(item => <li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul>
      </div>
      <ClientLogos/>
    </section>

    <section className="landing-contact" style={site.background('home:contact')}>
      <div className="landing-shell landing-heading">
        <div><SectionLabel>Let’s Work Together</SectionLabel><h2>{site.copy("site.cta", "Have a Project in Mind?")}</h2>
          <p>From content production to full-scale events, our team is ready to bring your ideas to life.</p></div>
        <div className="landing-actions">
          <Link className="landing-button primary" to="/booking">{site.copy("site.ctaLabel", "Request a Quote")} <ArrowRight size={19}/></Link>
          <Link className="landing-button" to="/contact"><Phone size={18}/>Contact Our Team</Link>
        </div>
      </div>
    </section>
  </div>;
}

const journey = [
  ['2014', 'Our beginnings in media production.'],
  ['2018', 'Expanded into marketing and event solutions.'],
  ['2022', 'Delivered nationwide and multi-sector projects.'],
  ['Today', 'A full-service creative partner across Papua New Guinea.'],
];

export function AboutPage() {
  const site = useSiteContent();
  const [team, setTeam] = useState<TeamMember[]>([]);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let current = true;
    void supabase.from('team_members').select('*').order('display_order').then(({data}) => {
      if (current && data) setTeam(data as TeamMember[]);
    });
    return () => { current = false; };
  }, []);

  const directors = (site.content.team ?? defaultTeam.map(profile => ({
    ...profile,
    bio: team.find(member => normalizeTeamMemberName(member.name) === normalizeTeamMemberName(profile.name))?.bio || profile.bio,
  }))).filter(profile => !profile.hidden);
  const directorPhoto = (director: typeof directors[number]) => site.photo(director.photo) ||
    (director.id === 'shannon-ambu' ? '/media/image-29-768.webp' :
      director.id === 'patrick-turbarat' ? '/media/image-30-768.webp' : '');
  const socialIcons = {Facebook, LinkedIn: Linkedin, Instagram, TikTok: Music2};


  return <div className="landing-page landing-about">
    <LandingHero about/>
    <section className="landing-shell landing-story">
      <ResponsiveImage asset={site.asset('about:story', LANDING_SCENIC_IMAGE)} alt={site.alt("about:story", "Aerial view of a Papua New Guinean community surrounded by forest")} sizes="(max-width: 760px) 100vw, 45vw"/>
      <div>
        <SectionLabel>Our Story</SectionLabel>
        <h2>Who We Are</h2>
        <p>{site.copy("about.story", "Fokal Solutions Limited is a Papua New Guinea-based creative production, marketing and events company. We combine creative storytelling, technical expertise and strategic communications to help organisations share their stories, engage audiences and deliver meaningful impact.")}</p>
        <p>With experience across government, development, corporate and community projects, we deliver creative solutions nationwide.</p>
      </div>
    </section>
    <div className="landing-shell"><LandingStats about/></div>

    {directors.length > 0 && <section id="directors" className="landing-shell landing-directors">
      <SectionLabel>Our Directors</SectionLabel>
      <h2>Our Directors</h2>
      <div className="landing-director-grid">
        {directors.map(director => <Dialog.Root key={director.id}>
          <Dialog.Trigger className="landing-director" aria-label={`View ${director.name}’s profile`}>
            {directorPhoto(director) ? <img loading="lazy" decoding="async" src={directorPhoto(director)} alt=""/> : <div className="site-empty-portrait"><Users aria-hidden="true"/></div>}
            <span className="landing-director-copy"><strong>{director.name}</strong><span>{director.role}</span><span>{director.bio}</span></span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="showreel-overlay"/>
            <Dialog.Content className="director-modal landing-profile">
              <Dialog.Close aria-label="Close director profile"><X/></Dialog.Close>
              {directorPhoto(director) ? <img src={directorPhoto(director)} alt=""/> : <div className="site-empty-portrait"><Users aria-hidden="true"/></div>}
              <div className="director-modal-copy">
                <small>{director.role}</small>
                <Dialog.Title>{director.name}</Dialog.Title>
                <Dialog.Description>{director.bio}</Dialog.Description>
                <Button to="/contact">Get in Touch</Button>
                <nav className="director-socials" aria-label={`${director.name}’s social profiles`}>
                  {Object.entries(director.socials).filter(([, url]) => validSocial(url)).map(([name, url]) => {
                    const Icon = socialIcons[name as keyof typeof socialIcons];
                    return Icon && <a key={name} href={url} aria-label={name}><Icon/></a>;
                  })}
                </nav>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>)}
      </div>
    </section>}

    <section className="landing-shell landing-purpose">
      <div><SectionLabel>Our Purpose</SectionLabel><h2>Our Mission,<br/>Vision &amp; Values</h2></div>
      <article><Target aria-hidden="true"/><h3>Our Mission</h3><p>{site.copy("about.mission", "To deliver creative, reliable media, marketing and event solutions that connect people and create positive change.")}</p></article>
      <article><Eye aria-hidden="true"/><h3>Our Vision</h3><p>{site.copy("about.vision", "To be Papua New Guinea’s leading creative production and communications partner, recognised for quality, innovation and impact.")}</p></article>
      <article><Gem aria-hidden="true"/><h3>Our Values</h3>
        <ul>{['Professionalism', 'Creativity', 'Reliability', 'Local Expertise', 'People Focused'].map(value => <li key={value}><Check aria-hidden="true"/>{value}</li>)}</ul>
      </article>
    </section>

    <section className="landing-journey" style={site.background('about:journey')}>
      <div className="landing-shell">
        <h2>Our Journey</h2>
        <ol>{journey.map(([date, description]) => <li key={date}><strong>{date}</strong><p>{description}</p></li>)}</ol>
      </div>
    </section>
  </div>;
}

function ServiceThumbnail({images,alt}:{images:string[],alt:string}){
 const site = useSiteContent();
 const [idx,setIdx]=useState(0);
 const [hasInteracted,setHasInteracted]=useState(false);
 useEffect(()=>{if(!hasInteracted || images.length<2)return;const t=setInterval(()=>setIdx(i=>(i+1)%images.length),3500);return()=>clearInterval(t);},[hasInteracted,images.length]);
 const selectImage=(next:number)=>{setHasInteracted(true);setIdx(next);};
 return <div className="service-thumb-wrap">{images.slice(0,hasInteracted?images.length:1).map((src,i)=><ResponsiveImage key={src} asset={optimizedImage(src)} alt={site.alt(`services:${alt}:${i}`, alt)} sizes="(max-width: 900px) 100vw, 45vw" className={i===idx?'active':''}/>) }<div className="service-thumb-dots">{images.map((_,i)=><button key={i} className={i===idx?'active':''} onClick={e=>{e.stopPropagation();selectImage(i);}} aria-label={`Show image ${i+1}`}/>)}</div></div>;
}
const photographyShowcase = [
  {
    "title": "Executive Portrait Photography",
    "image": "/media/image-31-768.webp",
    "description": "Professional portraits that capture personality and confidence for leadership profiles, corporate websites and personal branding."
  },
  {
    "title": "Corporate Event Photography",
    "image": "/media/image-32-768.webp",
    "description": "Capturing speakers, guests and key moments at corporate events, with polished images for communications, publicity and lasting records."
  },
  {
    "title": "Industrial Documentation Photography",
    "image": "/media/image-33-768.webp",
    "description": "Clear, detailed photography of industrial sites, equipment and people at work for project documentation, reports and company communications."
  }
];

type Service = (typeof services)[number];
function ServiceModal({service,onClose}:{service:Service,onClose:()=>void}){
 const [name,Icon,copy,images]=service;
 const [slide,setSlide]=useState(0);
 const showcase: {title:string;image:string;description?:string}[]=name==='Live Streaming'?[{title:'Corporate Live Stream',image:'/media/ibbm-corporate-live-stream.webp',description:'Corporate event live streaming with multi-camera production, live switching and clear audio, connecting the audience in the room with viewers online.'}]:name==='Photography'?photographyShowcase:images.map((image,index)=>({title:`${name} project ${index+1}`,image}));
 useEffect(()=>{setSlide(0);const timer=showcase.length>1?setInterval(()=>setSlide(current=>(current+1)%showcase.length),4000):undefined;const onKey=(event:KeyboardEvent)=>event.key==='Escape'&&onClose();document.body.style.overflow='hidden';window.addEventListener('keydown',onKey);return()=>{if(timer)clearInterval(timer);document.body.style.overflow='';window.removeEventListener('keydown',onKey);};},[name,showcase.length,onClose]);
 const active=showcase[slide];
 return <div className="service-modal-overlay" onClick={onClose} role="presentation"><section className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={event=>event.stopPropagation()}><button className="service-modal-close" onClick={onClose} aria-label="Close service details"><X/></button><div className="service-modal-showcase"><ResponsiveImage asset={optimizedImage(active.image)} alt={active.title} sizes="(max-width: 760px) 100vw, 510px" priority/><div className="service-slide-copy"><small>PREVIOUS PROJECT</small><strong>{active.title}</strong>{active.description&&<p>{active.description}</p>}</div>{showcase.length>1&&<><button className="service-slide-arrow previous" onClick={()=>setSlide(current=>(current-1+showcase.length)%showcase.length)} aria-label="Previous project"><ChevronLeft/></button><button className="service-slide-arrow next" onClick={()=>setSlide(current=>(current+1)%showcase.length)} aria-label="Next project"><ChevronRight/></button><div className="service-slide-dots">{showcase.map((item,index)=><button key={item.title} className={index===slide?'active':''} onClick={()=>setSlide(index)} aria-label={`Show project ${index+1}`}/>)}</div></>}</div><div className="service-modal-content"><div className="service-modal-heading"><Icon/><div><small>OUR SERVICE</small><h2 id="service-modal-title">{name}</h2><p>{copy}</p></div></div><p className="service-modal-overview">{serviceDetails[name].overview}</p><h3>What we deliver</h3><div className="service-deliverables">{serviceDetails[name].deliverables.map(item=><span key={item}><Check/> {item}</span>)}</div><Button to="/contact">DISCUSS YOUR PROJECT</Button></div></section></div>;
}
const servicePages = [
  { slug: 'video-production', name: 'Video Production', project: { title: 'Guardians of the Sea', path: '/projects/guardians-of-the-sea' } },
  { slug: 'live-streaming', name: 'Live Streaming', project: { title: 'Corporate Live Stream', image: '/media/ibbm-corporate-live-stream.webp', description: 'Multi-camera coverage, live switching and audio for audiences in the room and online.' } },
  { slug: 'event-production', name: 'Events', project: { title: 'Bougainville Chocolate Festival 2025', path: '/projects/bougainville-chocolate-festival-2025' } },
];

export function ServiceDetailPage() {
  const site = useSiteContent();
  const { slug } = useParams();
  const service = servicePages.find(page => page.slug === slug);
  if (!service) return <NotFoundPage />;

  const name = service.name === 'Events' ? 'Event Production' : service.name;
  const { overview, deliverables } = serviceDetails[service.name];
  const project = service.project;

  return (
    <><PageBanner eyebrow="Our Services" title={name + ' in Papua New Guinea'}
      copy="Based in Port Moresby and available for projects across Papua New Guinea."
      image={project.image ?? '/media/image-34-1920.webp'}/>
    <div className="light-page photography-page project-overview">
      <Link className="public-back" to="/services">← All services</Link>
      <p>{overview}</p>
      <h2>What we deliver</h2>
      <ul className="list-disc pl-6">{deliverables.map(item => <li key={item}>{item}</li>)}</ul>
      <h2>Related work</h2>
      {project.path ? (
        <Link to={project.path}>{project.title} <span aria-hidden="true">→</span></Link>
      ) : (
        <figure>
          <img src={site.image('services:related') ?? project.image} alt={site.alt("services:related", "Corporate live streaming setup")} loading="lazy" decoding="async" />
          <figcaption><strong>{project.title}</strong> · {project.description}</figcaption>
        </figure>
      )}
      <div className="mt-6"><Button to="/booking">Request a quote</Button></div>
    </div></>
  );
}

export function ServicesPage() {
  const site = useSiteContent();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  return (
    <>
      <PageBanner eyebrow="OUR SERVICES" title={site.content.copy?.["services.hero"]?.trim() || <>Solutions that bring<br/>your vision to life.</>} copy="A full range of media production, marketing and events solutions tailored to exceed your expectations." image="/media/image-34-768.webp" animatedBackground/>
      <div className="light-page">
        <section className="services-intro"><SectionLabel>What We Do</SectionLabel><h2>Creative &amp; Production Services</h2><p>Fokal Solutions Limited delivers end-to-end creative and strategic services that empower brands, organisations, and communities to communicate effectively and make a meaningful impact. Our work spans media production, marketing, research, and live event execution, offering clients a one-stop partner for visual storytelling, audience engagement, insight-driven strategy, and memorable experiences. Every service we provide is tailored to our clients' goals, ensuring purposeful, professional, and grounded outcomes.</p></section>
        <section className="service-grid">
          {services.map(source => {
            const [name, Icon, defaultCopy, defaults] = source;
            const copy = site.copy(`service.${name}`, defaultCopy);
            const images = defaults.map((image, index) => site.image(`services:${name}:${index}`) ?? image);
            const service: Service = [name, Icon, copy, images];
            const page = servicePages.find(entry => entry.name === name);
            const content = (
              <>
                <div className="service-card-text">
                  <Icon aria-hidden="true" />
                  <h3>{name}</h3>
                  <p>{copy}</p>
                  {['Creative strategy', 'Professional production', 'Experienced team', 'Reliable delivery'].map(item => <span key={item}><Check /> {item}</span>)}
                  <b className="service-card-action">Explore service <ArrowRight /></b>
                </div>
                <ServiceThumbnail images={images} alt={name} />
              </>
            );
            return page ? (
              <Link className="service-card-interactive" key={name} to={`/services/${page.slug}`} aria-label={`Explore ${name}`}>{content}</Link>
            ) : (
              <article className="service-card-interactive" key={name} role="button" tabIndex={0} aria-label={`View ${name} service details`}
                onClick={() => setSelectedService(service)}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedService(service);
                  }
                }}>
                {content}
              </article>
            );
          })}
        </section>
        <section className="process" style={site.background('services:process')}><div><small>OUR PROCESS</small><h2>From Concept<br/>to Completion.</h2></div>{['Discover','Plan','Create','Deliver','Measure'].map((x,i)=><div key={x}><b>0{i+1}</b><strong>{x}</strong><span>Focused work that moves your vision forward.</span></div>)}</section>
      </div>
      <CTA />
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </>
  );
}

type WorkCard = Project & {
  key: number;
  link?: string | null;
  photos: { url: string; caption: string }[];
  videoAttachments?: { url: string; caption: string }[];
};

const workFilters = ['Video Production', 'Photography', 'Live Streaming', 'Events', 'Marketing', 'Staging & AV'];
const localWork: WorkCard[] = projects.slice(0, 6).map((project, index) => ({
  ...project,
  key: index + 1,
  link: projectSlugs[index] ? '/projects/' + projectSlugs[index] : index === 4 ? '/photography' : null,
  photos: index === 4 ? cupPhotos.map(photo => ({ url: photo.src, caption: photo.alt })) : [],
}));

function WorkCover({ project }: { project: WorkCard }) {
  const placeholder = useSiteContent().image('gallery:placeholder') ?? IMG.gallery;
  if (project.youtubeId) return <ProjectVideo id={project.youtubeId} title={project.title}/>;
  if (project.facebookUrl) return <FacebookProjectVideo url={project.facebookUrl} title={project.title}/>;
  return <img loading="lazy" decoding="async" src={project.image ? optimizedImage(project.image).fallback : placeholder} alt={project.title}/>;
}

const GALLERY_BATCH_SIZE = 6;

export function GalleryPage() {
  const site = useSiteContent();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const categories = useGalleryCategories();
  const gallery = useGalleryProjects('public');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeStatus, setStatus] = useState<'All' | ProjectStatus>('All');
  const [search, setSearch] = useState('');
  const [displayLimit, setDisplayLimit] = useState(GALLERY_BATCH_SIZE);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const nextProjectToFocus = useRef<number | null>(null);
  const categoryNames = new Map(categories.data?.map(category => [category.id, category.name]));
  const galleryProjects: WorkCard[] = isSupabaseConfigured ? (gallery.data ?? []).map(project => {
    const media = project.media.map(asset => ({ ...asset, url: gallery.imageUrl(asset.url) })).filter(asset => asset.url);
    return {
      key: project.id, title: project.title, category: categoryNames.get(project.category_id ?? '') ?? '',
      date: project.year, client: project.client, description: project.description, image: gallery.imageUrl(project.image_url),
      status: project.status, progress: project.progress, location: project.location,
      role: project.production_role, commissionedBy: project.commissioned_by, ...galleryVideo(project.video_url),
      link: project.project_link, photos: media.filter(asset => asset.type === 'image'),
      videoAttachments: media.filter(asset => asset.type === 'video'),
    };
  }) : localWork;
  const filters = ['All', ...new Set([...workFilters, ...galleryProjects.map(project => project.category).filter(Boolean)])];
  const statusFilters = ['All', ...projectStatuses] as const;
  const searchTerms = search.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matchingProjects = galleryProjects.filter(project =>
    (activeFilter === 'All' || project.category === activeFilter) &&
    (activeStatus === 'All' || project.status === activeStatus) &&
    searchTerms.every(term => [project.title, project.client, project.location].join(' ').toLocaleLowerCase().includes(term))
  );
  const visibleProjects = matchingProjects.slice(0, displayLimit);
  const hasMoreProjects = matchingProjects.length > visibleProjects.length;
  const directProjectKey = projectId && /^[1-9]\d*$/.test(projectId) ? Number(projectId) : null;
  const selected = galleryProjects.find(project => project.key === (projectId ? directProjectKey : selectedKey));
  const loading = isSupabaseConfigured && (gallery.isLoading || categories.isLoading);
  const failed = isSupabaseConfigured && (gallery.isError || categories.isError);
  const statusColor = (status: string) => status === 'Completed' ? 'st-complete' : status === 'In Progress' ? 'st-progress' : 'st-plan';

  return <>
    {projectId && <Helmet defer={false}>
      <title>{selected ? selected.title + ' | Fokal Solutions' : 'Our Work | Fokal Solutions'}</title>
      {selected && <meta name="description" content={selected.description}/>}
    </Helmet>}
    <PageBanner eyebrow="OUR WORK" title={site.content.copy?.["gallery.hero"]?.trim() || <>Projects that speak<br/>for <em>themselves.</em></>} copy="We partner with organisations across Papua New Guinea and beyond to create powerful content and memorable experiences." image={IMG.gallery} videoSrc={WORK_HERO_VIDEO}/>
    <div className="light-page">
      <div className="filter-bar">
        <label className="w-full max-w-lg text-sm font-semibold">
          Search projects
          <input className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900"
            type="search" value={search} placeholder="Project, client or location"
            onChange={event => { setSearch(event.target.value); setDisplayLimit(GALLERY_BATCH_SIZE); }}/>
        </label>
        <div className="filters"><span className="filter-label">Category</span>{filters.map(filter =>
          <button key={filter} className={activeFilter === filter ? 'active' : ''} aria-pressed={activeFilter === filter} onClick={() => {
            setActiveFilter(filter);
            setDisplayLimit(GALLERY_BATCH_SIZE);
          }}>{filter}</button>
        )}</div>
        <div className="filters status-filters"><span className="filter-label">Status</span>{statusFilters.map(status =>
          <button key={status} className={activeStatus === status ? 'active status-btn' : 'status-btn'} aria-pressed={activeStatus === status} onClick={() => {
            setStatus(status);
            setDisplayLimit(GALLERY_BATCH_SIZE);
          }}>{status}</button>
        )}</div>
      </div>
      {failed ? <p className="result-count" role="alert">Could not load projects. <button className="underline" onClick={() => { gallery.retry(); void categories.refetch(); }}>Try again</button></p>
        : loading ? <p className="result-count" role="status">Loading projects…</p>
        : !visibleProjects.length ? <p className="result-count" role="status">No projects match these filters.</p>
        : <p className="result-count" role="status">Showing {visibleProjects.length} of {matchingProjects.length} {matchingProjects.length === 1 ? 'project' : 'projects'}</p>}
      {projectId && !loading && !failed && !selected &&
        <p role="status">This project is unavailable. <Link className="underline" to="/gallery">Browse Our Work</Link></p>}
      <Dialog.Root open={Boolean(selected) && !loading && !failed} onOpenChange={open => {
        if (open) return;
        if (projectId) navigate('/gallery', { replace: true });
        else setSelectedKey(null);
      }}>
        {!loading && !failed && <section className="work-grid work-grid-detail">{visibleProjects.map(project =>
          <article key={project.key} className={project.youtubeId || project.facebookUrl ? 'project-card project-card-with-video' : 'project-card'}>
            <div className="project-img-wrap">
              {project.youtubeId || project.facebookUrl
                ? <div className="inline-project-video">
                  <ClickToPlay key={project.youtubeId || project.facebookUrl} title={project.title}
                    youtubeId={project.youtubeId} facebookUrl={project.facebookUrl}
                    poster={project.image ? optimizedImage(project.image).fallback : site.image('gallery:placeholder')}/>
                </div>
                : <ResponsiveImage asset={optimizedImage(project.image || site.image('gallery:placeholder') || IMG.gallery)} alt="" sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"/>}
              <span className={'project-status ' + statusColor(project.status)}>{project.status}</span>
            </div>
            <div className="project-body">
              <small>{project.category}</small>
              <h3><button type="button" aria-haspopup="dialog" ref={element => {
                if (element && nextProjectToFocus.current === project.key) {
                  nextProjectToFocus.current = null;
                  element.focus({ preventScroll: true });
                }
              }} onClick={event => {
                projectTrigger.current = event.currentTarget;
                setSelectedKey(project.key);
              }}>{project.title}<ArrowRight size={19} aria-hidden="true"/></button></h3>
              {project.client && <p>{project.client}</p>}
            </div>
          </article>
        )}</section>}
        {!loading && !failed && hasMoreProjects && (
          <div className="mt-8 flex justify-center">
            <button type="button" className="blue-btn" onClick={event => {
              if (event.detail === 0 || matchingProjects.length <= displayLimit + GALLERY_BATCH_SIZE) {
                nextProjectToFocus.current = matchingProjects[displayLimit].key;
              }
              setDisplayLimit(limit => limit + GALLERY_BATCH_SIZE);
            }}>Load more projects</button>
          </div>
        )}
        {selected && <Dialog.Portal>
          <Dialog.Overlay className="project-modal-overlay">
            <Dialog.Content className="project-modal" onCloseAutoFocus={event => {
              event.preventDefault();
              projectTrigger.current?.focus();
            }}>
              <Dialog.Close className="modal-close" aria-label="Close project">&times;</Dialog.Close>
              <WorkCover project={selected}/>
              <div className="modal-body">
                <span className={'project-status ' + statusColor(selected.status)}>{selected.status}</span>
                <Dialog.Title>{selected.title}</Dialog.Title>
                <small>{selected.category}</small>
                {selected.commissionedBy && <p>C/: {selected.commissionedBy}</p>}
                {selected.role && <p><b>Role:</b> {selected.role}</p>}
                <Dialog.Description>{selected.description}</Dialog.Description>
                <div className="modal-meta">
                  {selected.date && <div><CalendarDays/><b>Date</b><span>{selected.date}</span></div>}
                  {selected.client && <div><Users/><b>Client</b><span>{selected.client}</span></div>}
                  {selected.location && <div><MapPin/><b>Location</b><span>{selected.location}</span></div>}
                  <div><Target/><b>Progress</b><span>{selected.progress}%</span></div>
                </div>
                <div className="modal-progress"><div className="progress-track"><div className="progress-fill" style={{ width: selected.progress + '%' }}/></div><b>{selected.progress}% complete</b></div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {!projectId && <Link className="underline" to={'/work/' + selected.key}>Open shareable project page</Link>}
                  {selected.link && <Link className="underline" to={selected.link}>View full project</Link>}
                </div>
                {!!selected.photos.length && <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {selected.photos.map((photo, index) => <figure key={photo.url + ':' + index}>
                    <img loading="lazy" src={photo.url} alt={photo.caption || selected.title} className="!h-auto !rounded"/>
                    {photo.caption && <figcaption className="mt-1 text-sm">{photo.caption}</figcaption>}
                  </figure>)}
                </div>}
                {selected.videoAttachments?.map((video, index) => <figure key={video.url + ':' + index} className="mt-4">
                  <video controls preload="metadata" src={video.url} className="w-full" />
                  {video.caption && <figcaption>{video.caption}</figcaption>}
                </figure>)}
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>}
      </Dialog.Root>
      <Stats/>
    </div>
    <CTA/>
  </>;
}
export function ContactPage(){
 const site = useSiteContent();
 const {settings} = site;
 const [faqOpen,setFaqOpen]=useState<number|null>(0);
 const faqs = ([
  ['What services do you offer?','We offer video production, photography, live streaming, event production, marketing and staging & AV services. Whether you need a single video or a full multi-day event production, we can help.'],
  ['How do I get a quote?','Simply fill out the quote request form on our Get a Quote page with your project details, and we will prepare a tailored quote within 1-2 business days. You can also call or WhatsApp us directly.'],
  ['Do you work outside of Port Moresby?','Yes. We work with clients across all provinces of Papua New Guinea and have experience travelling to remote locations for projects. Travel and accommodation costs are included in your quote.'],
  ['Can you handle last-minute or urgent projects?','We do our best to accommodate urgent requests. Contact us directly by phone or WhatsApp for same-week bookings, and we will let you know our availability right away.'],
  ['Do you provide equipment hire only?','Yes, we offer equipment hire for cameras, lighting, sound and AV separately from our production services. Get in touch with your requirements and we will provide a hire quote.'],
  ['What formats do you deliver?','We deliver in any format you need - 4K, HD, social media cutdowns, broadcast specifications and more. Let us know your delivery requirements and we will handle the rest.'],
 ] as [string,string][]).map(([question, answer], index) => [site.copy(`faq.${index}.q`, question), site.copy(`faq.${index}.a`, answer)] as [string,string])
 const steps:[any,string,string][]=[
  [MessageCircle,'We Listen','Tell us about your project, goals and timeline. We ask the right questions to understand exactly what you need.'],
  [Target,'We Plan','We develop a tailored approach, recommend the right services and provide a clear quote with no hidden costs.'],
  [Video,'We Create','Our team gets to work - filming, designing, producing and delivering your project to the highest standard.'],
  [Check,'We Deliver','You receive your content on time and on budget, with revisions included until you are completely satisfied.'],
 ];
 const hours:[string,string,string][]=[
  ['Monday - Friday','8:00 AM - 5:00 PM','Standard business hours'],
  ['Saturday','9:00 AM - 1:00 PM','By appointment'],
  ['Sunday','Closed','Emergency enquiries via WhatsApp'],
  ['Public Holidays','Closed','Message us and we will respond next business day'],
 ];
 return <><PageBanner eyebrow="CONTACT US" title={<>Let's create something<br/><em>amazing</em> together.</>} copy="We'd love to hear about your project. Fill out the form or reach out using the details below." image={IMG.contact} videoSrc={CONTACT_HERO_VIDEO}/>
 <div className="light-page">
  <div className="contact-grid"><section><small>GET IN TOUCH</small><h2>{site.copy("contact.heading", "We're here to bring your ideas to life.")}</h2><p>Whether you have a project in mind, need more information about our services, or just want to say hello — we'd love to hear from you.</p><div className="contact-list"><span><Phone/> <b>{[settings.phone, settings.alternatePhone].filter(Boolean).join(' / ')}</b> Call or WhatsApp</span><span><Mail/><b>{settings.email}</b> Send us an email</span><span><MapPin/><b>{settings.location}</b></span></div></section><ContactForm/></div>

  <section className="location-section"><div className="contact-extra-head"><small>LOCATE US</small><h2>Visit Fokal Solutions.</h2><p>Find our Port Moresby office on Google Maps.</p></div><div className="location-map"><iframe src={CONTACT_MAP_EMBED} title="Fokal Solutions Ltd location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a className="blue-btn location-map-link" href={CONTACT_MAP_LINK} target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowRight/></a></div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>WHY REACH OUT</small><h2>What happens after you contact us?</h2><p>We make the process simple and transparent from the very first conversation.</p></div><div className="contact-steps">{steps.map(([Icon,t,d]:any)=><div key={t}><Icon/><b>{t}</b><span>{d}</span></div>)}</div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>OFFICE HOURS</small><h2>When you can reach us.</h2><p>We're available during the hours below. For urgent enquiries outside these hours, send us a WhatsApp message and we'll respond as soon as possible.</p></div><div className="hours-grid">{hours.map(([day,time,note])=><div key={day}><b>{day}</b><span>{time}</span><small>{note}</small></div>)}</div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>FAQ</small><h2>{site.copy("contact.faq", "Frequently asked questions.")}</h2><p>Got a question? Chances are we've answered it before. If not, send us a message and we'll get back to you.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div key={i} className={`faq-item ${faqOpen===i?'open':''}`}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)}><b>{q}</b><ChevronDown className="faq-chevron"/></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></section>
 </div></>}
const orgTypes=['Government','NGO','Private Sector','Community Organisation','Educational Institution','Religious Organisation','Other'];const serviceGroups:[string,string[]][]=[['1. Media Production',['Photography','Videography','Content Development','Post-Production (Editing, Motion Graphics, Colour Grading)']],['2. Marketing & Communications',['Brand Strategy','Campaign Planning & Execution','Social Media Management','Content Writing & Copywriting','Digital Marketing & Analytics']],['3. Live Events Planning & Management',['Event Planning & Management','Event Live-Streaming','AV & Technical Support','Stage Design & Show-running','On-site Photography & Video Coverage']],['4. Research & Insights',['Market Research & Analysis','Focus Groups & Community Consultations','Surveys & Data Analysis','Report Writing & Visualisation']]];
async function postNetlifyForm(data: FormData) {
  const body = new URLSearchParams();
  data.forEach((value, key) => body.append(key, String(value)));
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!response.ok) throw new Error('Submission failed');
}

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');
  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      setStatus('This is a local preview. Please send your message on the live website.');
      return;
    }

    const form = event.currentTarget;
    setSending(true);
    setStatus('');
    try {
      await postNetlifyForm(new FormData(form));
      form.reset();
      setStatus('Thank you. Your message has been sent.');
    } catch {
      setStatus('Your message could not be sent. Please try again or email info@fokalltd.com.');
    } finally {
      setSending(false);
    }
  }

  return <form name="contact" method="POST" className="fokal-form" onSubmit={submitContact}>
    <input type="hidden" name="form-name" value="contact" />
    <p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
    <small>SEND US A MESSAGE</small>
    <div className="two-col">
      <input name="name" aria-label="Your name" placeholder="Your Name *" autoComplete="name" required />
      <input name="email" aria-label="Email address" type="email" placeholder="Email Address *" autoComplete="email" required />
      <input name="phone" aria-label="Phone number" type="tel" placeholder="Phone Number" autoComplete="tel" />
      <select name="organisation-type" aria-label="Organisation type" defaultValue="">
        <option value="" disabled>Organisation Type</option>
        {orgTypes.map(type => <option key={type}>{type}</option>)}
      </select>
    </div>
    <select name="subject" aria-label="Service" defaultValue="">
      <option value="" disabled>Select a Service</option>
      {serviceGroups.map(([group, services]) => <optgroup key={group} label={group}>
        {services.map(service => <option key={service} value={group + ' — ' + service}>{service}</option>)}
      </optgroup>)}
    </select>
    <textarea name="message" aria-label="Your message" placeholder="Your Message *" rows={7} required />
    <label><input name="consent" value="yes" type="checkbox" required /> I agree to the privacy policy and terms of service.</label>
    <button className="blue-btn" disabled={sending}>{sending ? 'SENDING…' : 'SEND MESSAGE'} <ArrowRight /></button>
    <p role="status">{status}</p>
  </form>;
}
const bookingOptions: Record<string,string[]> = {
 'Photography':['Corporate portraits','Events & graduation','Sports coverage','Products & industrial documentation'],
 'Videography':['Corporate videos','Documentaries','Event highlights','Promotional videos'],
 'Content Development':['Concept development','Scriptwriting','Storyboarding'],
 'Post-Production (Editing, Motion Graphics, Colour Grading)':['Video editing','Motion graphics','Colour grading','Audio post-production'],
 'Brand Strategy':['Brand positioning','Visual identity','Brand guidelines'],
 'Campaign Planning & Execution':['Campaign strategy','Creative production','Campaign rollout'],
 'Social Media Management':['Content planning','Content creation','Community management'],
 'Content Writing & Copywriting':['Website copy','Articles & stories','Advertising copy'],
 'Digital Marketing & Analytics':['Digital campaigns','Performance reporting','Audience insights'],
 'Event Planning & Management':['Corporate events','Conferences','Community events'],
 'Event Live-Streaming':['Corporate live stream','Ceremonies & graduations','Multi-camera broadcast'],
 'AV & Technical Support':['Sound','Lighting','Screens & projection'],
 'Stage Design & Show-running':['Stage design','Show scheduling','On-site coordination'],
 'On-site Photography & Video Coverage':['Photography','Video coverage','Combined photo & video'],
 'Market Research & Analysis':['Audience research','Competitor research','Market analysis'],
 'Focus Groups & Community Consultations':['Focus groups','Stakeholder interviews','Community consultations'],
 'Surveys & Data Analysis':['Survey design','Data collection','Data analysis'],
 'Report Writing & Visualisation':['Research reports','Charts & infographics','Presentation of findings'],
};
export function BookingPage(){
 const site = useSiteContent();
 const [chosenServices,setChosenServices]=useState<string[]>([]);
 const [submission,setSubmission]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [error,setError]=useState('');
 async function submitQuote(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(!chosenServices.length){setError('Please select at least one service.');return;}
  if(['localhost','127.0.0.1'].includes(window.location.hostname)){setError('This is a local preview. Please submit your request on the live website.');return;}
  const form=event.currentTarget;
  const data=new FormData(form);
  data.set('services',chosenServices.join('; '));
  setSubmission('sending');setError('');
  try{
   await postNetlifyForm(data);
   setSubmission('success');form.reset();setChosenServices([]);
  }catch{setSubmission('error');setError('Your request could not be sent. Please try again or email info@fokalltd.com.');}
 }
 return <><PageBanner eyebrow="GET A QUOTE" title={<>Let's bring your<br/>vision to <em>life.</em></>} copy="Tell us about your project and we'll prepare a tailored quote that fits your needs." animatedBackground image={'/media/image-55-768.webp'}/><div className="light-page quote-layout"><aside><small>HOW IT WORKS</small><h2>Simple. Fast. Effective.</h2>{['Tell Us About Your Project','We Review Your Requirements','Receive Your Quote'].map((x,i)=><div className="quote-step" key={x}><b>{i+1}</b><span><strong>{x}</strong>We'll guide you through each simple step.</span></div>)}</aside>
 <form name="booking" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="fokal-form" onSubmit={submitQuote}>
 <input type="hidden" name="form-name" value="booking"/><input type="hidden" name="services" value={chosenServices.join('; ')}/><p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
 <small>REQUEST A QUOTE</small><h2>{site.copy("booking.heading", "Project Details")}</h2><Link className="underline" to="/project-brief">What to prepare before requesting a quote</Link><div className="two-col"><input name="name" aria-label="Full Name" placeholder="Full Name *" required autoComplete="name"/><input name="organisation" aria-label="Company / Organisation" placeholder="Company / Organisation" autoComplete="organization"/><input name="email" aria-label="Email Address" type="email" placeholder="Email Address *" required autoComplete="email"/><input name="phone" aria-label="Phone Number" type="tel" placeholder="Phone Number *" required autoComplete="tel"/></div>
 <select name="organisation-type" aria-label="Organisation Type" required defaultValue=""><option value="" disabled>Organisation Type *</option>{['Private / Personal','Corporation','NGO','Government'].map(x=><option key={x}>{x}</option>)}</select>
 <fieldset className="booking-services"><legend>Services Required *</legend><p>Open a category, then a service to select the options you need.</p>{serviceGroups.map(([group,subs])=>{
 const count=chosenServices.filter(value=>subs.some(service=>value.startsWith(`${service} — `))).length;
 return <details className="booking-category" key={group}><summary>{group}{count>0&&<span>{count} selected</span>}</summary><div className="booking-category-content">{subs.map(service=>{
 const selected=chosenServices.filter(value=>value.startsWith(`${service} — `)).length;
 return <details className="booking-subcategory" key={service}><summary>{service}{selected>0&&<span>{selected} selected</span>}</summary><div className="booking-options">{[...bookingOptions[service],'Not sure — please advise'].map(option=>{
 const value=`${service} — ${option}`;
 return <label key={value}><input type="checkbox" checked={chosenServices.includes(value)} onChange={e=>{setChosenServices(current=>e.target.checked?[...current,value]:current.filter(x=>x!==value));setError('');}}/>{option}</label>;
 })}</div></details>;
 })}</div></details>;
 })}<p role="status">{chosenServices.length?`${chosenServices.length} option${chosenServices.length===1?'':'s'} selected`:'No services selected yet.'}</p></fieldset>
 <textarea name="message" aria-label="Project details" required rows={6} placeholder="Tell us about your project, goals, audience and important details..."/><label><input name="consent" value="yes" type="checkbox" required/> I agree to the privacy policy and terms of service.</label>
 {error&&<p role="alert">{error}</p>}{submission==='success'&&<p role="status">Thank you. Your quote request has been submitted.</p>}
 <button type="submit" className="blue-btn" disabled={submission==='sending'}>{submission==='sending'?'SENDING…':'SUBMIT QUOTE REQUEST'} <ArrowRight/></button></form></div></>;
}
