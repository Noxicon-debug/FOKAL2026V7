export interface GalleryCategory {
  id: string;
  name: string;
}

export const projectStatuses = ['Completed', 'In Progress', 'Planning'] as const;
export type ProjectStatus = typeof projectStatuses[number];
export type PublicationState = 'draft' | 'published';

export interface GalleryAsset {
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string | null;
  caption: string;
  order_index: number;
}

export interface GalleryProjectFields {
  title: string;
  category_id: string | null;
  client: string;
  year: string;
  description: string;
  image_url: string;
  order_index: number;
  status: ProjectStatus;
  progress: number;
  location: string;
  production_role: string;
  commissioned_by: string;
  video_url: string;
  publication_state: PublicationState;
}

export interface GalleryProject extends GalleryProjectFields {
  id: number;
  revision: number;
  project_link: string | null;
  media: GalleryAsset[];
}
