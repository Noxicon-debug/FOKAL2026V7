import { Link } from 'react-router-dom';

const checklists: [string, string[]][] = [
  ['Photography or video shoot', [
    'List the people, locations, and moments you want captured.',
    'Share any permits, access restrictions, release requirements, and brand guidelines.',
    'Specify final formats, intended channels, and delivery deadlines.',
  ]],
  ['Live stream', [
    'Share the run sheet, venue, time zone, and expected audience size.',
    'Name the platform and confirm who controls the account, venue internet, and audio feed.',
    'Note any remote speakers, captions, graphics, and recording requirements.',
  ]],
  ['Event production', [
    'Share the venue, run sheet, guest count, and setup and pack-down times.',
    'List stage, lighting, sound, screen, photography, and accessibility requirements.',
    'Identify venue contacts, suppliers already booked, and any approval deadlines.',
  ]],
];

export default function ProjectBriefPage() {
  return <main className="light-page pt-32">
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">What to prepare for your project</h1>
        <p>Start with your goal, preferred date, location, audience, and any budget or delivery deadlines you already know.</p>
      </div>
      {checklists.map(([title, items]) => <section key={title} className="glass-card space-y-3 p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <ul className="list-disc space-y-2 pl-5">
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>)}
      <Link className="blue-btn" to="/booking">Request a quote</Link>
    </div>
  </main>;
}
