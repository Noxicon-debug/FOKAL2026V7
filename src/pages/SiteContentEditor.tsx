import publicPages from '../lib/public-pages.json';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import {
  fontOptions, listSiteMedia, pageCopyFields, siteImageBucket, readDefaultTeam, readSiteStage, siteDefaultImage, siteImageGroups, siteImageUrls, themeDefaults,
  themeIssues, uploadSiteImage, validSocial, settingFields, settingDefaults, socialSettingKeys, validEmail, validPhone, type SiteContent, type TeamProfile, type Theme,
} from '../lib/site-content';

const colors = {primary: 'Primary', accent: 'Accent', background: 'Background', text: 'Text'} as const;
const socials = ['Facebook', 'LinkedIn', 'Instagram', 'TikTok'] as const;
const photoDefaults: Record<string, string> = {'patrick-turbarat': '/media/image-30-768.webp', 'shannon-ambu': '/media/image-29-768.webp'};
export type SiteEditorSection = 'Page Images' | 'Team' | 'Theme' | 'Site Settings' | 'Page Content' | 'Search & Sharing' | 'Media Library';

export default function SiteContentEditor({editorId, tab, canPublish, onDirty}: {editorId: string; tab: SiteEditorSection; canPublish: boolean; onDirty: (dirty:boolean)=>void}) {
  const client = useQueryClient();
  const draft = useQuery({
    queryKey: ['site-editor-draft', editorId],
    queryFn: async () => {
      const result = await readSiteStage('draft');
      const [urls, defaults] = await Promise.all([siteImageUrls(result.content, true), readDefaultTeam()]);
      return {...result, urls, defaults};
    }, retry: false, refetchOnWindowFocus: false, refetchOnReconnect: false,
  });
  const mediaKey = ['cms-media',editorId];
  const media = useQuery({queryKey:mediaKey,queryFn:listSiteMedia,retry:false});
  const mediaUrls = useQuery({
    queryKey:['cms-media-urls',editorId,media.data?.map(item => item.path)],
    enabled:Boolean(media.data?.length),
    queryFn:() => siteImageUrls({images:Object.fromEntries((media.data ?? []).map(item => [item.path,item.path])),team:null,theme:{}}),
    staleTime:240_000,refetchInterval:240_000,retry:false,
  });
  const [mediaSearch, setMediaSearch] = useState('');
  const previous = useQuery({
    queryKey: ['site-editor-previous', editorId],
    queryFn: async () => {
      const {data, error} = await supabase.from('site_content').select('stage').eq('stage', 'previous').maybeSingle();
      if (error) throw error;
      return Boolean(data);
    }, retry: false,
  });
  const [content, setContent] = useState<SiteContent>();
  const [draftUrls, setUrls] = useState<Record<string, string>>({});
  const urls = {...draftUrls,...mediaUrls.data};
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { onDirty(dirty); }, [dirty, onDirty]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!draft.data) return;
    setContent(draft.data.content);
    setRevision(draft.data.revision);
    setUrls(draft.data.urls);
    setDirty(false);
  }, [draft.data]);

  const update = (next: SiteContent) => {
    setContent(next);
    setDirty(true);
    setMessage('');
    setError('');
  };
  const report = (failure: unknown) => setError(failure && typeof failure === 'object' && 'message' in failure
    ? String(failure.message) : 'The site change could not be completed.');

  async function upload(file: File | undefined, onUploaded: (path: string) => void) {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const {path, url} = await uploadSiteImage(file);
      setUrls(previousUrls => ({...previousUrls, [path]: url}));
      onUploaded(path);
      void client.invalidateQueries({queryKey:mediaKey});
    } catch (failure) { report(failure); }
    finally { setBusy(false); }
  }

  async function change(action: 'save' | 'publish' | 'restore') {
    if (!content) return;
    if (action === 'save' && content.team?.some(member => !member.hidden && (
      !member.name.trim() || !member.role.trim() || Object.values(member.socials).some(url => url && !validSocial(url))
    ))) {
      setError('Visible profiles need a name and role. Social links must start with https://.');
      return;
    }
    if (action === 'save' && content.settings) {
      const settings = {...settingDefaults, ...content.settings};
      if (!validEmail(settings.email.trim()) || !validPhone(settings.phone.trim()) ||
        (settings.alternatePhone.trim() && !validPhone(settings.alternatePhone.trim())) ||
        !settings.location.trim() || !settings.quoteLabel.trim() ||
        socialSettingKeys.some(key => settings[key].trim() && !validSocial(settings[key].trim()))) {
        setError('Enter a valid contact email and phone, an office location and a quote label. Social links must use HTTPS.');
        return;
      }
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const {data, error: failure} = await supabase.rpc('change_site_content', {
        action, expected_revision: revision, replacement: action === 'save' ? content : null,
      });
      if (failure) throw failure;
      setRevision(data);
      setDirty(false);
      setMessage({save: 'Draft saved.', publish: 'The site changes are live.', restore: 'The previous version is live.'}[action]);
      await Promise.all([
        client.invalidateQueries({queryKey: ['site-content']}),
        client.invalidateQueries({queryKey: ['cms-history', editorId]}),
        client.invalidateQueries({queryKey: ['site-editor-previous', editorId]}),
      ]);
    } catch (failure) { report(failure); }
    finally { setBusy(false); }
  }

  if (draft.isError) return <div role="alert">Could not load the site draft. <button type="button" onClick={() => void draft.refetch()}>Retry</button></div>;
  if (!content) return <p role="status">Loading site draft…</p>;

  const theme = {...themeDefaults, ...content.theme};
  const issues = themeIssues(theme);
  const team = content.team ?? draft.data?.defaults ?? [];
  const changeTeam = (id: string, patch: Partial<TeamProfile>) => update({
    ...content, team: team.map(member => member.id === id ? {...member, ...patch} : member),
  });
  const move = (index: number, direction: number) => {
    const reordered = [...team];
    [reordered[index], reordered[index + direction]] = [reordered[index + direction], reordered[index]];
    update({...content, team: reordered});
  };
  const setTheme = (key: keyof Theme, value: string) => update({...content, theme: {...content.theme, [key]: value}});
  const chooseAsset = (slot: string, path: string) => {
    const images = {...content.images};
    if (path) images[slot] = path;
    else delete images[slot];
    const libraryAlt = media.data?.find(item => item.path === path)?.alt;
    const imageAlt = {...content.imageAlt};
    if (libraryAlt) imageAlt[slot] = libraryAlt;
    else delete imageAlt[slot];
    update({...content, images, imageAlt});
  };
  const libraryOptions = (current?: string) => <>
    <option value="">Use site default</option>
    {current && !media.data?.some(item => item.path === current) && <option value={current}>Current upload</option>}
    {media.data?.map(item => <option key={item.path} value={item.path}>{item.filename}</option>)}
  </>;
  const changeMedia = async (path: string, alt?: string) => {
    setBusy(true); setError('');
    try {
      if (alt === undefined) {
        if (Object.values(content.images).includes(path) || content.team?.some(profile => profile.photo === path)) {
          throw new Error('This image is in use by the current draft.');
        }
        const {data,error} = await supabase.storage.from(siteImageBucket).remove([path]);
        if (error || !data?.length) throw error ?? new Error('This image is referenced by a saved or restorable version.');
        const {error: recordError} = await supabase.from('cms_media').delete().eq('path',path);
        if (recordError) throw recordError;
      } else {
        const {error} = await supabase.from('cms_media').update({alt}).eq('path',path);
        if (error) throw error;
      }
      await client.invalidateQueries({queryKey:mediaKey});
    } catch (failure) { report(failure); }
    finally { setBusy(false); }
  };
  const actions = <div className="site-editor-actions">
    <button type="button" disabled={!dirty || busy} onClick={() => void change('save')}>Save Draft</button>
    {dirty || busy ? <button type="button" disabled>Preview Draft</button> :
      <a href="/?cms-preview=1" target="_blank" rel="noopener noreferrer">Preview Draft</a>}
    {canPublish && <><button type="button" disabled={dirty || busy || issues.length > 0}
      onClick={() => { if (window.confirm('Publish the saved draft to the live site?')) void change('publish'); }}>Publish</button>
    <button type="button" disabled={!previous.data || dirty || busy}
      onClick={() => { if (window.confirm('Restore the previous live version? The saved draft will stay available.')) void change('restore'); }}>Restore Previous</button></>}
  </div>;

  return <section className="site-editor">
    <header className="cms-editor-header"><h2>{tab}</h2>{actions}</header>
    <fieldset disabled={busy} className="site-editor-fields">
      {tab === 'Page Content' && pageCopyFields.map(([page, fields]) => <details key={page} className="site-editor-section" open={page === 'Home'}>
        <summary>{page}</summary>
        <div className="site-editor-grid">{fields.map(([key,label,defaultValue]) => <label className="site-editor-tile" key={key}>{label}
          <textarea rows={3} maxLength={1200} value={content.copy?.[key] ?? defaultValue}
            onChange={event => update({...content,copy:{...content.copy,[key]:event.target.value}})}/>
        </label>)}</div>
      </details>)}
      {tab === 'Search & Sharing' && Object.entries(publicPages).map(([path, defaults]) => {
        const current = content.metadata?.[path] ?? {};
        const slot = 'share:' + path;
        return <details key={path} className="site-editor-section" open={path === '/'}>
          <summary>{path === '/' ? 'Home' : path}</summary>
          <div className="site-editor-grid">
            {(['title','description'] as const).map(key => <label key={key}>{key === 'title' ? 'Search title' : 'Search description'}
              <input value={current[key] ?? defaults[key]} maxLength={key === 'title' ? 120 : 300}
                onChange={event => update({...content,metadata:{...content.metadata,[path]:{...current,[key]:event.target.value}}})}/>
            </label>)}
            <label>Sharing image<select value={content.images[slot] ?? ''} onChange={event => chooseAsset(slot,event.target.value)}>{libraryOptions(content.images[slot])}</select></label>
            <label>Upload sharing image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={event => {
              void upload(event.currentTarget.files?.[0], path => chooseAsset(slot,path)); event.currentTarget.value = '';
            }}/></label>
          </div>
        </details>;
      })}
      {tab === 'Media Library' && <>
        <label>Upload an image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={event => {
          void upload(event.currentTarget.files?.[0], () => {}); event.currentTarget.value = '';
        }}/></label>
        <label>Search images<input type="search" value={mediaSearch} onChange={event => setMediaSearch(event.target.value)}/></label>
        {media.error && <p role="alert">Could not load the media library.</p>}
        {!media.isPending && media.data?.length === 0 && <p>No uploaded images yet.</p>}
        <div className="site-editor-grid">{media.data?.filter(item => (item.filename + ' ' + item.alt).toLowerCase().includes(mediaSearch.toLowerCase())).map(item => {
          const uses = [...Object.entries(content.images).filter(([, path]) => path === item.path).map(([slot]) => slot),
            ...(content.team ?? []).filter(profile => profile.photo === item.path).map(profile => profile.name)];
          return <form className="site-editor-tile" key={item.path} onSubmit={event => {
            event.preventDefault();
            void changeMedia(item.path,String(new FormData(event.currentTarget).get('alt')).trim());
          }}>
            <strong>{item.filename}</strong>
            {urls[item.path] && <img src={urls[item.path]} alt={item.alt} loading="lazy"/>}
            <p>{uses.length ? 'Current draft: ' + uses.join(', ') : 'Unused in current draft'}</p>
            <label>Default alt text<input name="alt" maxLength={300} defaultValue={item.alt}/></label>
            <button>Save alt text</button>
            {canPublish && <button type="button" disabled={uses.length > 0} onClick={() => {
              if (window.confirm('Remove this image from the media library?')) void changeMedia(item.path);
            }}>Remove unused image</button>}
          </form>;
        })}</div>
      </>}
      {tab === 'Page Images' && siteImageGroups.map(([group, slots]) => <details key={group} className="site-editor-section" open={group === 'Page heroes'}>
        <summary>{group}</summary>
        <div className="site-editor-grid">
          {slots.map(([key, label, page]) => <div key={key} className="site-editor-tile">
            <strong>{label}</strong>
            {(urls[content.images[key]] || siteDefaultImage(key)) &&
              <img src={urls[content.images[key]] || siteDefaultImage(key)} alt="" loading="lazy"/>}
            {!content.images[key] && <p>Using the site default{page ? <> · <a href={page} target="_blank" rel="noopener noreferrer">View page</a></> : null}</p>}
            <label>Replace {label}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={event => { void upload(event.currentTarget.files?.[0], path => update({...content, images: {...content.images, [key]: path}})); event.currentTarget.value = ''; }}/></label>
            <label>Reuse uploaded image<select value={content.images[key] ?? ''} onChange={event => chooseAsset(key,event.target.value)}>{libraryOptions(content.images[key])}</select></label>
            {content.images[key] && <label>Placement alt text<input maxLength={300} value={content.imageAlt?.[key] ?? ''}
              onChange={event => update({...content,imageAlt:{...content.imageAlt,[key]:event.target.value}})}/></label>}
            <button type="button" disabled={!content.images[key]} onClick={() => {
              const images = {...content.images};
              delete images[key];
              const imageAlt = {...content.imageAlt};
              delete imageAlt[key];
              update({...content, images, imageAlt});
            }}>Restore default</button>
          </div>)}
        </div>
      </details>)}
      {tab === 'Team' && <div className="site-editor-grid">
        {team.map((member, index) => <div className="site-editor-tile" key={member.id}>
          <strong>{member.name || 'New profile'}</strong>
          {(urls[member.photo] || photoDefaults[member.id]) && <img src={urls[member.photo] || photoDefaults[member.id]} alt=""/>}
          <label>Name<input value={member.name} onChange={event => changeTeam(member.id, {name: event.target.value})}/></label>
          <label>Role<input value={member.role} onChange={event => changeTeam(member.id, {role: event.target.value})}/></label>
          <label>Bio<textarea rows={4} value={member.bio} onChange={event => changeTeam(member.id, {bio: event.target.value})}/></label>
          <label>Portrait<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={event => { void upload(event.currentTarget.files?.[0], photo => changeTeam(member.id, {photo})); event.currentTarget.value = ''; }}/></label>
          <label>Reuse uploaded portrait<select value={member.photo} onChange={event => changeTeam(member.id,{photo:event.target.value})}>{libraryOptions(member.photo)}</select></label>
          {member.photo && <button type="button" onClick={() => changeTeam(member.id, {photo: ''})}>Clear portrait replacement</button>}
          {socials.map(name => <label key={name}>{name}<input type="url" value={member.socials[name] ?? ''}
            onChange={event => changeTeam(member.id, {socials: {...member.socials, [name]: event.target.value}})}/></label>)}
          <label><input type="checkbox" checked={member.hidden} onChange={event => changeTeam(member.id, {hidden: event.target.checked})}/> Hide profile</label>
          <div className="site-editor-actions">
            <button type="button" disabled={index === 0} onClick={() => move(index, -1)}>Move up</button>
            <button type="button" disabled={index === team.length - 1} onClick={() => move(index, 1)}>Move down</button>
          </div>
        </div>)}
        <button type="button" onClick={() => update({...content, team: [...team, {
          id: crypto.randomUUID(), name: '', role: '', bio: '', photo: '', hidden: true, socials: {},
        }]})}>Add profile</button>
      </div>}
      {tab === 'Theme' && <div className="site-editor-theme">
        {Object.entries(colors).map(([key, label]) => <label key={key}>{label}
          <input type="color" value={theme[key as keyof typeof colors]} onChange={event => setTheme(key as keyof Theme, event.target.value)}/>
        </label>)}
        {(['headingFont','bodyFont'] as const).map(key => <label key={key}>{key === 'headingFont' ? 'Heading font' : 'Body font'}
          <select value={theme[key]} onChange={event => setTheme(key, event.target.value)}>
            {fontOptions.map(font => <option key={font}>{font}</option>)}
          </select>
        </label>)}
        <button type="button" onClick={() => update({...content, theme: {}})}>Restore theme defaults</button>
      </div>}
      {tab === 'Site Settings' && <div className="site-editor-grid">
        {([
          ['Contact details', ['email', 'phone', 'alternatePhone', 'location']],
          ['Header and footer', ['quoteLabel', 'tagline']],
          ['Social links', socialSettingKeys],
        ] as const).map(([group, keys]) => <section key={group} className="site-editor-tile">
          <h3>{group}</h3>
          {keys.map(key => {
            const value = content.settings?.[key] ?? settingDefaults[key];
            const onChange = (value: string) => update({...content, settings: {...content.settings, [key]: value}});
            return <label key={key}>{settingFields[key]}
              {key === 'tagline' ? <textarea rows={3} maxLength={250} value={value} onChange={event => onChange(event.target.value)}/> :
                <input type={key === 'email' ? 'email' : key.endsWith('hone') ? 'tel' : group === 'Social links' ? 'url' : 'text'}
                  maxLength={key === 'quoteLabel' ? 24 : 300} value={value} onChange={event => onChange(event.target.value)}/>}
            </label>;
          })}
        </section>)}
        <div><button type="button" onClick={() => update({...content, settings: {}})}>Restore settings defaults</button></div>
      </div>}
    </fieldset>
    {issues.length > 0 && <ul className="site-editor-issues">{issues.map(issue => <li key={String(issue)}>{issue}</li>)}</ul>}
    {dirty && <p>Save the draft before previewing or publishing.</p>}
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
  </section>;
}
