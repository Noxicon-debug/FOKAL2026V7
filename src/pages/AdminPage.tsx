import { useCmsRole } from '../lib/hooks/useCmsRole';
import { CmsUsers, CmsEnquiries, CmsHistory } from './CmsOperations';
import SiteContentEditor, { type SiteEditorSection } from './SiteContentEditor';
import { Image, Palette, Users, Briefcase, Settings } from 'lucide-react';
import './cms-layout.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { galleryVideo, uploadGalleryImage } from '../lib/gallery-media';
import ClickToPlay from '../components/media/ClickToPlay';
import { useAdminMutations } from '../lib/hooks/useAdmin';
import { useAuth } from '../lib/hooks/useAuth';
import { useGalleryCategories, useGalleryProjects } from '../lib/hooks/useGallery';
import { GalleryAsset, GalleryProject, GalleryProjectFields, PublicationState, projectStatuses } from '../types/gallery';

type ProjectForm = GalleryProjectFields & {
  id?: number;
  revision?: number;
  media: GalleryAsset[];
};

const newProject: ProjectForm = {
  title: '', category_id: null, client: '', year: '', description: '', image_url: '',
  order_index: 100, status: 'Completed', progress: 100, location: '', production_role: '',
  commissioned_by: '', video_url: '', publication_state: 'draft', media: [],
};

const textFields = [
  ['title', 'Project title'], ['client', 'Client'], ['year', 'Project date'],
  ['location', 'Location'], ['production_role', 'Production role'],
  ['commissioned_by', 'Commissioning organisation'], ['video_url', 'YouTube or Facebook video URL'],
] as const;

const photoTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const fieldClass = 'bg-dark-800 border-dark-700 text-white';
const errorMessage = (error: unknown, fallback: string) =>
  error && typeof error === 'object' && 'message' in error ? String(error.message) : fallback;

export default function AdminPage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const membership = useCmsRole(user?.id);
  const role = membership.data;
  const editorId = role ? user?.id : undefined;
  const canPublish = role === 'editor' || role === 'administrator';
  const categories = useGalleryCategories();
  const projects = useGalleryProjects('editor', editorId);
  const { saveProject, deleteProject } = useAdminMutations();
  type Operation = 'Users' | 'Enquiries' | 'Publishing History';
  const [section, setSection] = useState<SiteEditorSection | Operation | 'Our Work'>('Our Work');
  const [siteDirty, setSiteDirty] = useState(false);
  const [siteSection, setSiteSection] = useState<SiteEditorSection>();
  const [form, setForm] = useState<ProjectForm | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPreviews, setUploadPreviews] = useState<Record<string, string>>({});
  const busy = uploading || saveProject.isPending || deleteProject.isPending;

  function closeEditor() {
    Object.values(uploadPreviews).forEach(url => URL.revokeObjectURL(url));
    setUploadPreviews({});
    setForm(null);
  }

  function setField<K extends keyof ProjectForm>(field: K, value: ProjectForm[K]) {
    setForm(current => current && { ...current, [field]: value });
  }

  async function save(publication_state: PublicationState) {
    if (!form || busy) return;
    const { media, ...fields } = form;
    const project = { ...fields, title: fields.title.trim(), description: (fields.description ?? '').trim(), video_url: fields.video_url.trim(), publication_state };
    if (!canPublish && publication_state !== 'draft') return;
    if (publication_state === 'published' && (!project.title || !project.category_id || !project.description || !project.image_url)) {
      toast.error('Add a title, category, description, and cover image to publish.');
      return;
    }
    if (project.video_url && !galleryVideo(project.video_url)) {
      toast.error('Enter an HTTPS YouTube or Facebook video link.');
      return;
    }
    try {
      await saveProject.mutateAsync({
        project,
        assets: media.map((asset, index) => ({
          type: asset.type, url: asset.url, caption: asset.caption,
          thumbnail_url: asset.thumbnail_url, order_index: index,
        })),
      });
      toast.success(publication_state === 'published' ? 'Project published' : 'Draft saved');
      closeEditor();
    } catch (error) {
      toast.error(errorMessage(error, 'Could not save the project.'));
    }
  }

  async function upload(file: File | undefined, cover: boolean) {
    if (!file || busy) return;
    if (!photoTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
      toast.error('Choose a JPEG, PNG, WebP, GIF, or AVIF image up to 10 MB.');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadGalleryImage(file);
      setUploadPreviews(current => ({ ...current, [url]: URL.createObjectURL(file) }));
      setForm(current => {
        if (!current) return current;
        if (cover) return { ...current, image_url: url };
        const asset: GalleryAsset = {
          type: 'image', url, caption: '', thumbnail_url: null, order_index: current.media.length,
        };
        return { ...current, media: [...current.media, asset] };
      });
    } catch (error) {
      toast.error(errorMessage(error, 'Could not upload the photo.'));
    } finally {
      setUploading(false);
    }
  }

  function moveAsset(index: number, offset: number) {
    if (!form) return;
    const assets = [...form.media];
    const target = index + offset;
    [assets[index], assets[target]] = [assets[target], assets[index]];
    setField('media', assets);
  }

  async function remove(project: GalleryProject) {
    if (!window.confirm('Permanently delete this project?')) return;
    try {
      await deleteProject.mutateAsync(project);
      toast.success('Project deleted');
    } catch (error) {
      toast.error(errorMessage(error, 'Could not delete the project.'));
    }
  }

  const preview = (reference: string) => uploadPreviews[reference] ?? projects.imageUrl(reference);
  const selectPhoto = (cover: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    void upload(file, cover);
  };

  return (
    <main className="cms-shell min-h-screen text-white">
      <div className="cms-frame">
        <header className="cms-header">
          <h1 className="text-3xl font-bold">Fokal CMS</h1>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className={fieldClass} asChild><Link to="/gallery">View Our Work</Link></Button>
            <Button variant="outline" className={fieldClass} onClick={async () => {
              try {
                await signOut();
                navigate('/login');
              } catch {
                toast.error('Could not sign out.');
              }
            }}>Sign out</Button>
          </div>
        </header>
        <div className="cms-layout">
          {editorId && <aside className="cms-sidebar">
            <nav aria-label="CMS sections">
              {([
                ['Our Work', Briefcase], ['Page Content', Briefcase], ['Page Images', Image], ['Media Library', Image],
                ['Search & Sharing', Settings], ['Team', Users], ['Theme', Palette], ['Site Settings', Settings],
                ...(canPublish ? [['Enquiries', Briefcase], ['Publishing History', Briefcase]] as const : []),
                ...(role === 'administrator' ? [['Users', Users]] as const : []),
              ] as const).map(([name, Icon]) => (
                <button type="button" aria-current={section === name ? 'page' : undefined} key={name} onClick={() => {
                  setSection(name);
                  if (name !== 'Our Work' && name !== 'Users' && name !== 'Enquiries' && name !== 'Publishing History') setSiteSection(name);
                }}><Icon size={19} aria-hidden="true"/>{name}</button>
              ))}
            </nav>
          </aside>}
          <div className="cms-workspace">
          {editorId && siteSection && <div hidden={section !== siteSection}>
            <SiteContentEditor editorId={editorId} tab={siteSection} canPublish={canPublish} onDirty={setSiteDirty}/>
          </div>}
          {editorId && section === 'Users' && role === 'administrator' && <CmsUsers userId={editorId}/>}
          {editorId && section === 'Enquiries' && canPublish && <CmsEnquiries userId={editorId}/>}
          {editorId && section === 'Publishing History' && canPublish && <CmsHistory userId={editorId} dirty={siteDirty}/>}
          {(section === 'Our Work' || !editorId) && <div className="cms-projects">
            <h2>Our Work</h2>
        {loading || (user && membership.isPending) ? <p role="status">Checking access…</p> : !editorId ? (
          <p role="alert">This account needs Our Work editor access. Contact your Supabase administrator.</p>
        ) : form ? (
          <form onSubmit={event => { event.preventDefault(); void save(form.publication_state); }}>
            <fieldset disabled={busy} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-dark-800 bg-dark-900 text-white">
                  <CardHeader><CardTitle>{form.id ? 'Edit project' : 'New project'}</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {textFields.map(([field, label]) => (
                      <Label key={field} className="space-y-2">
                        <span>{label}</span>
                        <Input className={fieldClass} value={form[field] ?? ''} onChange={event => setField(field, event.target.value)} />
                      </Label>
                    ))}
                    <div className="space-y-2">
                      <Label htmlFor="work-category">Category</Label>
                      <select id="work-category" className={fieldClass + ' h-10 w-full rounded-md border px-3'} value={form.category_id ?? ''} onChange={event => setField('category_id', event.target.value || null)}>
                        <option value="">Select a category</option>
                        {categories.data?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work-status">Project status</Label>
                      <select id="work-status" className={fieldClass + ' h-10 w-full rounded-md border px-3'} value={form.status} onChange={event => setField('status', event.target.value as ProjectForm['status'])}>
                        {projectStatuses.map(status => <option key={status}>{status}</option>)}
                      </select>
                    </div>
                    <Label className="space-y-2">
                      <span>Progress (%)</span>
                      <Input className={fieldClass} type="number" min="0" max="100" required value={Number.isNaN(form.progress) ? '' : form.progress} onChange={event => setField('progress', event.target.valueAsNumber)} />
                    </Label>
                    <Label className="space-y-2">
                      <span>Display order</span>
                      <Input className={fieldClass} type="number" required value={Number.isNaN(form.order_index) ? '' : form.order_index} onChange={event => setField('order_index', event.target.valueAsNumber)} />
                    </Label>
                    <Label className="space-y-2 sm:col-span-2">
                      <span>Description</span>
                      <Textarea className={fieldClass} rows={6} value={form.description ?? ''} onChange={event => setField('description', event.target.value)} />
                    </Label>
                  </CardContent>
                </Card>

                <Card className="border-dark-800 bg-dark-900 text-white">
                  <CardHeader><CardTitle>Project media</CardTitle></CardHeader>
                  <CardContent className="space-y-5">
                    {preview(form.image_url) && <img src={preview(form.image_url)} alt="Project cover" className="max-h-56 rounded object-contain" />}
                    <Label className="block space-y-2">
                      <span>{form.image_url ? 'Replace cover photo' : 'Upload cover photo'}</span>
                      <Input className={fieldClass} type="file" accept={photoTypes.join(',')} onChange={selectPhoto(true)} />
                    </Label>
                    {form.image_url && <Button type="button" variant="outline" className={fieldClass} onClick={() => setField('image_url', '')}>Remove cover</Button>}
                    <Label className="block space-y-2">
                      <span>Add a gallery photo</span>
                      <Input className={fieldClass} type="file" accept={photoTypes.join(',')} onChange={selectPhoto(false)} />
                    </Label>
                    <ol className="space-y-4">
                      {form.media.map((asset, index) => (
                        <li key={asset.url + ':' + index} className="space-y-2 rounded border border-dark-700 p-3">
                          {asset.type === 'image' && preview(asset.url) && <img src={preview(asset.url)} alt={asset.caption || 'Gallery photo'} className="max-h-36 rounded object-contain" />}
                          {asset.type === 'video' && <p>Video attachment</p>}
                          <Label className="block space-y-2">
                            <span>Caption</span>
                            <Input className={fieldClass} value={asset.caption ?? ''} onChange={event => setField('media', form.media.map((item, position) => position === index ? { ...item, caption: event.target.value } : item))} />
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            <Button type="button" size="sm" className={fieldClass} disabled={index === 0} onClick={() => moveAsset(index, -1)}>Move up</Button>
                            <Button type="button" size="sm" className={fieldClass} disabled={index === form.media.length - 1} onClick={() => moveAsset(index, 1)}>Move down</Button>
                            <Button type="button" size="sm" variant="destructive" onClick={() => setField('media', form.media.filter((_, position) => position !== index))}>Remove</Button>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="bg-accent-500 text-dark-950">{form.publication_state === 'published' ? 'Save changes' : 'Save draft'}</Button>
                {canPublish && (form.publication_state === 'draft'
                  ? <Button type="button" variant="outline" className={fieldClass} onClick={event => { if (event.currentTarget.form?.reportValidity()) void save('published'); }}>Publish</Button>
                  : <Button type="button" variant="outline" className={fieldClass} onClick={event => { if (event.currentTarget.form?.reportValidity()) void save('draft'); }}>Unpublish</Button>)}
                <Button type="button" variant="outline" className={fieldClass} onClick={closeEditor}>Cancel</Button>
              </div>
            </fieldset>
            {busy && <p className="mt-4" role="status">{uploading ? 'Uploading photo…' : 'Saving project…'}</p>}
          </form>
        ) : (
          <>
            <Button className="bg-accent-500 text-dark-950" disabled={categories.isLoading || categories.isError} onClick={() => setForm({ ...newProject })}>Add project</Button>
            {(projects.isLoading || categories.isLoading) && <p role="status">Loading projects…</p>}
            {(projects.isError || categories.isError) && <p role="alert">Could not load the portfolio. <button className="underline" onClick={() => { projects.retry(); void categories.refetch(); }}>Try again</button></p>}
            {projects.isSuccess && !projects.data.length && <p>No projects yet.</p>}
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.data?.map(project => {
                const video = galleryVideo(project.video_url);
                const cover = preview(project.image_url);
                return (
                <li key={project.id}>
                  <Card className="overflow-hidden border-dark-800 bg-dark-900 text-white">
                    {video ? <ClickToPlay key={project.video_url} title={project.title} {...video} poster={cover || undefined} />
                      : cover && <img loading="lazy" className="aspect-[4/3] w-full object-cover" src={cover} alt="" />}
                    <CardHeader>
                      <CardTitle>{project.title || 'Untitled project'}</CardTitle>
                      <p>{project.publication_state === 'published' ? 'Published' : 'Draft'}</p>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button className={fieldClass} variant="outline" disabled={busy || categories.isError || (!canPublish && project.publication_state === 'published')} onClick={() => setForm(project)}>Edit</Button>
                      {canPublish && <Button variant="destructive" disabled={busy} onClick={() => void remove(project)}>Delete</Button>}
                    </CardContent>
                  </Card>
                </li>
                );
              })}
            </ul>
          </>
        )}
          </div>}
          </div>
        </div>
      </div>
    </main>
  );
}
