import { supabase } from './supabase';

export const siteImageBucket = 'site-images';
export const fontOptions = ['Inter', 'Arial', 'Georgia', 'Trebuchet MS', 'Verdana', 'Times New Roman'] as const;
export const themeDefaults = {
  primary: '#075cda', accent: '#26adff', background: '#ffffff', text: '#101b2b',
  headingFont: 'Inter', bodyFont: 'Inter',
};
export type Theme = typeof themeDefaults;
export type TeamProfile = {
  id: string; name: string; role: string; bio: string; photo: string; hidden: boolean;
  socials: Partial<Record<'Facebook' | 'LinkedIn' | 'Instagram' | 'TikTok', string>>;
};
export const defaultTeam: TeamProfile[] = [
  {
    id: 'patrick-turbarat', name: 'Patrick Turbarat', role: 'Director / Creative Manager',
    bio: 'Guides creative strategy and production quality, shaping ideas into compelling stories and memorable audience experiences.',
    photo: '', hidden: false, socials: {
      Facebook: 'https://www.facebook.com/search/top?q=patrick%20turbarat',
      LinkedIn: 'https://www.linkedin.com/in/patrick-turbarat-083399211/',
      Instagram: 'https://www.instagram.com/itz_pats675/',
    },
  },
  {
    id: 'shannon-ambu', name: 'Shannon Ambu', role: 'Managing Director',
    bio: 'Leads Fokal Solutions with a focus on purposeful growth, strong client partnerships and reliable delivery across every production.',
    photo: '', hidden: false, socials: {
      Facebook: 'https://www.facebook.com/ambu.shannon',
      LinkedIn: 'https://www.linkedin.com/in/shannon-ambu-271077163/',
      Instagram: 'https://www.instagram.com/specsman_ambu/',
      TikTok: 'https://www.tiktok.com/@nox_thefixer',
    },
  },
];

export async function readDefaultTeam() {
  const {data} = await supabase.from('team_members').select('name,bio');
  return defaultTeam.map(member => ({
    ...member,
    bio: data?.find(entry => entry.name.trim().toUpperCase() === member.name.toUpperCase())?.bio || member.bio,
  }));
}

export const settingFields = {
  email: 'Public contact email',
  phone: 'Primary phone number',
  alternatePhone: 'Alternate phone number',
  location: 'Office location',
  quoteLabel: 'Header quote button label',
  tagline: 'Footer tagline',
  youtube: 'YouTube URL',
  facebook: 'Facebook URL',
  linkedin: 'LinkedIn URL',
  instagram: 'Instagram URL',
  tiktok: 'TikTok URL',
  whatsapp: 'WhatsApp URL',
} as const;
export const settingDefaults: Record<keyof typeof settingFields, string> = {
  email: 'info@fokalltd.com', phone: '+675 7295 5054', alternatePhone: '8478 2028',
  location: 'Port Moresby, Papua New Guinea', quoteLabel: 'Request a Quote',
  tagline: 'Driven by Creativity,\nBacked by Experience,\nInspired by You.',
  youtube: 'https://www.youtube.com/@FOKALSOLUTIONS',
  facebook: 'https://www.facebook.com/fokalsolutionslimited/',
  linkedin: 'https://www.linkedin.com/company/fokalltd/',
  instagram: 'https://www.instagram.com/fokalltd/',
  tiktok: 'https://www.tiktok.com/@fokalsolutions',
  whatsapp: 'https://wa.me/67572955054',
};
export type SiteSettings = typeof settingDefaults;
export const socialSettingKeys = ['youtube','facebook','linkedin','instagram','tiktok','whatsapp'] as const;
export const validEmail = (value: string) => /^[a-z0-9.!#$%&'*+/=_~^-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);
export const validPhone = (value: string) => /^\+?[0-9 ()-]{7,25}$/.test(value) && value.replace(/\D/g, '').length >= 7;

export function getSiteSettings(overrides?: Partial<SiteSettings>): SiteSettings {
  const settings = {...settingDefaults};
  for (const key of Object.keys(settingDefaults) as (keyof SiteSettings)[]) {
    const input = overrides?.[key];
    if (typeof input !== 'string') continue;
    const value = input.trim();
    if (socialSettingKeys.some(social => social === key)) {
      if (!value || validSocial(value)) settings[key] = value;
    } else if (key === 'email' ? validEmail(value) : key === 'phone' ? validPhone(value) :
      key === 'alternatePhone' ? !value || validPhone(value) : value || key === 'tagline') {
      settings[key] = value;
    }
  }
  return settings;
}

export type SiteContent = { images: Record<string, string>; team: TeamProfile[] | null; theme: Partial<Theme>; settings?: Partial<SiteSettings>; copy?: Record<string, string>; metadata?: Record<string, {title?: string; description?: string}>; imageAlt?: Record<string,string> };
export const emptyContent: SiteContent = {images: {}, team: null, theme: {}};
export const photoNumbers = [18,29,4,23,36,33,25,14,20,27,37];
export const serviceImageCounts = [
  ['Video Production', 1], ['Photography', 1], ['Live Streaming', 3], ['Events', 3],
  ['Marketing', 4], ['Branding', 3], ['Staging & AV', 4],
] as const;
export const heroPages = [
  ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/gallery', 'Our Work'],
  ['/contact', 'Contact'], ['/booking', 'Request a Quote'], ['/photography', 'Photography'],
  ['/project-brief', 'Project Brief'], ['/404', 'Page Not Found'],
  ['/services/video-production', 'Video Production'], ['/services/live-streaming', 'Live Streaming'],
  ['/services/event-production', 'Event Production'], ['/projects/guardians-of-the-sea', 'Guardians of the Sea'],
  ['/projects/governor-allan-bird-cocoa-training', 'Cocoa Fertilizer Training'],
  ['/projects/bougainville-chocolate-festival-2025', 'Bougainville Chocolate Festival'],
] as const;
export const siteImageGroups = [
  ['Page heroes', heroPages.map(([path, label]) => [`hero:${path}`, label, path === '/404' ? '/missing-page' : path])],
  ['Home', [
    ['home:showreel', 'Showreel thumbnail'], ['home:trust', 'Why Choose Fokal background'],
    ['home:contact', 'Project enquiry background'], ...[0,1,2,3].map((index) => [`home:project:${index}`, `Featured project ${index + 1}`]),
    ...['NiuPower','UNFPA','TWM Group','BSP','SLMP','APTC','UNCDF'].map((name) => [`home:client:${name}`, name + ' logo']),
  ]],
  ['About', [['about:story', 'Company story photo'], ['about:journey', 'Journey background']]],
  ['Services', [
    ['services:process', 'Our Process background'], ['services:related', 'Live Streaming related work photo'],
    ...serviceImageCounts.flatMap(([name, count]) => Array.from({length: count}, (_, i) => [`services:${name}:${i}`, `${name} photo ${i + 1}`])),
  ]],
  ['Our Work', [['gallery:placeholder', 'Project image placeholder'], ['site:cta', 'Services and Our Work enquiry background']]],
  ['Photography', photoNumbers.map(number => [`photography:${number}`, `Commanders Cup photo ${number}`])],
  ['Site branding', [['site:logo', 'Header and footer logo']]],
] as const;

const heroDefaults: Record<string, string> = {
  'hero:/services': '/media/image-34-768.webp',
  'hero:/gallery': '/media/work-poster.webp',
  'hero:/contact': '/media/contact-poster.webp',
  'hero:/booking': '/media/image-55-768.webp',
  'hero:/photography': '/media/commanders-cup-18-640.webp',
  'hero:/services/video-production': '/media/image-34-768.webp',
  'hero:/services/live-streaming': '/media/ibbm-corporate-live-stream.webp',
  'hero:/services/event-production': '/media/image-34-768.webp',
  'hero:/projects/guardians-of-the-sea': '/media/image-32-768.webp',
  'hero:/projects/governor-allan-bird-cocoa-training': '/media/image-15-768.webp',
  'hero:/projects/bougainville-chocolate-festival-2025': '/media/image-13-768.webp',
};
const sectionDefaults: Record<string, string> = {
  'home:showreel': '/media/image-55-768.webp',
  'home:project:0': '/media/image-32-768.webp',
  'home:project:1': '/media/commanders-cup-18-640.webp',
  'home:project:2': '/media/image-15-768.webp',
  'home:project:3': '/media/image-13-768.webp',
  'gallery:placeholder': '/media/work-poster.webp',
  'services:related': '/media/ibbm-corporate-live-stream.webp',
};
const serviceDefaults: Record<string, string[]> = {
  'Video Production': ['work-poster.webp'],
  Photography: ['local-photo1-768.webp'],
  'Live Streaming': ['local-LIV_1-768.webp','local-live2-768.webp','image-15-768.webp'],
  Events: ['image-16-768.webp','image-17-768.webp','image-18-768.webp'],
  Marketing: ['image-13-768.webp','image-32-768.webp','image-11-768.webp','image-15-768.webp'],
  Branding: ['image-22-768.webp','image-23-768.webp','image-24-768.webp'],
  'Staging & AV': ['image-25-768.webp','image-26-768.webp','image-27-768.webp','image-28-768.webp'],
};
const defaultAssets = {
  ...heroDefaults, ...sectionDefaults,
  ...Object.fromEntries(['home:trust','home:contact','about:story','about:journey','services:process','site:cta']
    .map(slot => [slot, '/media/home-768.webp'])),
  ...Object.fromEntries(['NiuPower','UNFPA','TWM Group','BSP','SLMP','APTC','UNCDF']
    .map((name, index) => [`home:client:${name}`, `/media/image-${[0,1,2,3,4,6,7][index]}-480.webp`])),
  ...Object.fromEntries(photoNumbers.map(number => [`photography:${number}`, `/media/commanders-cup-${number}-640.webp`])),
  ...Object.fromEntries(Object.entries(serviceDefaults).flatMap(([name, images]) => images.map((image, index) =>
    [`services:${name}:${index}`, '/media/' + image]))),
} as Record<string, string>;
export function siteDefaultImage(slot: string) {
  return defaultAssets[slot] ?? (slot.startsWith('hero:') ? '/media/image-9-768.webp' : undefined);
}

export function normalizeSiteContent(value: Partial<SiteContent> | null): SiteContent {
  return {...emptyContent, ...value};
}

export async function readSiteStage(stage: 'draft' | 'live') {
  const {data, error} = await supabase.from('site_content').select('content, revision').eq('stage', stage).single();
  if (error) throw error;
  return {content: normalizeSiteContent(data.content), revision: data.revision as number};
}

export async function siteImageUrls(content: SiteContent, includeHidden = false) {
  const paths = [...new Set([...Object.values(content.images), ...(content.team ?? [])
    .filter(member => includeHidden || !member.hidden).map(member => member.photo)].filter(Boolean))];
  const urls: Record<string, string> = {};
  for (let offset = 0; offset < paths.length; offset += 100) {
    const {data, error} = await supabase.storage.from(siteImageBucket).createSignedUrls(paths.slice(offset, offset + 100), 300);
    if (error) throw error;
    for (const image of data) if (image.path && image.signedUrl) urls[image.path] = image.signedUrl;
  }
  return urls;
}

export async function uploadSiteImage(file: File) {
  if (!['image/jpeg','image/png','image/webp','image/gif','image/avif'].includes(file.type) || file.size > 10 * 1024 * 1024 || !file.size) {
    throw new Error('Choose a JPEG, PNG, WebP, GIF or AVIF image under 10 MB.');
  }
  const path = 'photos/' + crypto.randomUUID();
  const {error} = await supabase.storage.from(siteImageBucket).upload(path, file, {contentType: file.type});
  if (error) throw error;
  const record = await supabase.from('cms_media').insert({path, filename: file.name.slice(0,255) || 'Image'});
  if (record.error) throw record.error;
  const result = await supabase.storage.from(siteImageBucket).createSignedUrl(path, 300);
  if (result.error) throw result.error;
  return {path, url: result.data.signedUrl};
}

export function validSocial(value: string) {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

function luminance(color: string) {
  const rgb = color.slice(1).match(/../g) ?? [];
  return rgb.reduce((total, hex, index) => {
    const value = parseInt(hex, 16) / 255;
    return total + [.2126,.7152,.0722][index] * (value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  }, 0);
}
export function themeIssues(theme: Theme) {
  const ratio = (a: string, b: string) => {
    const colors = [luminance(a),luminance(b)];
    return (Math.max(...colors) + .05) / (Math.min(...colors) + .05);
  };
  return [
    ratio(theme.text, theme.background) < 4.5 && 'Text and background colours need more contrast.',
    ratio('#ffffff', theme.primary) < 4.5 && 'Primary colour needs more contrast with white button text.',
    ratio(theme.primary, theme.background) < 4.5 && 'Primary links need more contrast with the page background.',
    ratio(theme.accent, '#071826') < 3 && 'Accent colour needs more contrast with the dark hero.',
  ].filter(Boolean);
}

export type MediaItem = {path:string;filename:string;alt:string};
export async function listSiteMedia(): Promise<MediaItem[]> {
  const {data,error} = await supabase.from('cms_media').select('path,filename,alt').order('created_at',{ascending:false});
  if (error) throw error;
  return data;
}

export const pageCopyFields = [
  [
    "Home",
    [
      [
        "home.intro",
        "Company introduction",
        "We are a Papua New Guinean creative production, marketing and events company. We bring together creative storytelling, technical expertise and strategic communications to help organisations share their stories, engage audiences and deliver meaningful experiences."
      ],
      [
        "home.work",
        "Featured projects heading",
        "Our Work in Action"
      ],
      [
        "home.hero",
        "Hero headline",
        "Creative Storytelling.\nProfessional Production.\nMeaningful Impact."
      ]
    ]
  ],
  [
    "About",
    [
      [
        "about.story",
        "Company story",
        "Fokal Solutions Limited is a Papua New Guinea-based creative production, marketing and events company. We combine creative storytelling, technical expertise and strategic communications to help organisations share their stories, engage audiences and deliver meaningful impact."
      ],
      [
        "about.mission",
        "Mission",
        "To deliver creative, reliable media, marketing and event solutions that connect people and create positive change."
      ],
      [
        "about.vision",
        "Vision",
        "To be Papua New Guinea’s leading creative production and communications partner, recognised for quality, innovation and impact."
      ],
      [
        "about.hero",
        "Hero headline",
        "A Papua New Guinean Creative Production Company"
      ]
    ]
  ],
  [
    "Shared",
    [
      [
        "site.cta",
        "Enquiry heading",
        "Have a Project in Mind?"
      ],
      [
        "site.ctaLabel",
        "Enquiry button label",
        "Request a Quote"
      ]
    ]
  ],
  [
    "Contact",
    [
      [
        "contact.heading",
        "Contact heading",
        "We're here to bring your ideas to life."
      ],
      [
        "contact.faq",
        "FAQs heading",
        "Frequently asked questions."
      ]
    ]
  ],
  [
    "Request a Quote",
    [
      [
        "booking.heading",
        "Quote form heading",
        "Project Details"
      ]
    ]
  ],
  [
    "Services",
    [
      [
        "services.hero",
        "Hero headline",
        "Solutions that bring your vision to life."
      ],
      [
        "service.Video Production",
        "Video Production",
        "Documentaries, campaign films and event coverage from planning to final edits."
      ],
      [
        "service.Photography",
        "Photography",
        "Capturing moments that tell your story with clarity and impact."
      ],
      [
        "service.Live Streaming",
        "Live Streaming",
        "Professional live streaming solutions for events of any scale."
      ],
      [
        "service.Events",
        "Events",
        "End-to-end event production and management."
      ],
      [
        "service.Marketing",
        "Marketing",
        "Creative strategies that build brands and drive results."
      ],
      [
        "service.Branding",
        "Branding",
        "Distinctive brand identities that make a lasting impression."
      ],
      [
        "service.Staging & AV",
        "Staging & AV",
        "Stage, lighting, sound and AV solutions for unforgettable events."
      ]
    ]
  ],
  [
    "Contact FAQs",
    [
      [
        "faq.0.q",
        "FAQ 1 question",
        "What services do you offer?"
      ],
      [
        "faq.0.a",
        "FAQ 1 answer",
        "We offer video production, photography, live streaming, event production, marketing and staging & AV services. Whether you need a single video or a full multi-day event production, we can help."
      ],
      [
        "faq.1.q",
        "FAQ 2 question",
        "How do I get a quote?"
      ],
      [
        "faq.1.a",
        "FAQ 2 answer",
        "Simply fill out the quote request form on our Get a Quote page with your project details, and we will prepare a tailored quote within 1-2 business days. You can also call or WhatsApp us directly."
      ],
      [
        "faq.2.q",
        "FAQ 3 question",
        "Do you work outside of Port Moresby?"
      ],
      [
        "faq.2.a",
        "FAQ 3 answer",
        "Yes. We work with clients across all provinces of Papua New Guinea and have experience travelling to remote locations for projects. Travel and accommodation costs are included in your quote."
      ],
      [
        "faq.3.q",
        "FAQ 4 question",
        "Can you handle last-minute or urgent projects?"
      ],
      [
        "faq.3.a",
        "FAQ 4 answer",
        "We do our best to accommodate urgent requests. Contact us directly by phone or WhatsApp for same-week bookings, and we will let you know our availability right away."
      ],
      [
        "faq.4.q",
        "FAQ 5 question",
        "Do you provide equipment hire only?"
      ],
      [
        "faq.4.a",
        "FAQ 5 answer",
        "Yes, we offer equipment hire for cameras, lighting, sound and AV separately from our production services. Get in touch with your requirements and we will provide a hire quote."
      ],
      [
        "faq.5.q",
        "FAQ 6 question",
        "What formats do you deliver?"
      ],
      [
        "faq.5.a",
        "FAQ 6 answer",
        "We deliver in any format you need - 4K, HD, social media cutdowns, broadcast specifications and more. Let us know your delivery requirements and we will handle the rest."
      ]
    ]
  ],
  [
    "Our Work",
    [
      [
        "gallery.hero",
        "Hero headline",
        "Projects that speak for themselves."
      ]
    ]
  ]
] as const;
