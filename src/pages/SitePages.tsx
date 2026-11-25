const homeClients = [
  { name: 'NiuPower', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/NUI%20POWER.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9OVUkgUE9XRVIuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1MjUxNywiZXhwIjoxODIwNDg4NTE3fQ.OZQwLNhsO4gsfojML5iD5pRu6BqMsTjkSdHYsVj2NOk' },
  { name: 'UNFPA', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/UNFPA.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9VTkZQQS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUyNTM2LCJleHAiOjE4MjA0ODg1MzZ9.CA0Ndr5jQLacipXMO-ENEfUFaiTYb8Ydq3JNolpGG4w' },
  { name: 'TWM Group', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/TWM-Group.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9UV00tR3JvdXAucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1MjU0OCwiZXhwIjoxODIwNDg4NTQ4fQ.QtS1MswGKxB89UK-o7QF2VluVa1yFYqimq1KNBXDA2I' },
  { name: 'BSP', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/BSP-logo.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9CU1AtbG9nby5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUyNTc2LCJleHAiOjE4MjA0ODg1NzZ9.cipDpIftgw_QzKvsBMdWy4MkbnKn1A7F1ym6kbl4EL4' },
  { name: 'SLMP', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/SLMP.jpeg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9TTE1QLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUyNjA2LCJleHAiOjE4MjA0ODg2MDZ9.8z4pe-LfTVo4PujJNT97W0Q-trSSQjW1WT2OvkYcN74' },
  { name: 'TWM Group', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/TWM-Group.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9UV00tR3JvdXAucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1MjYxOSwiZXhwIjoxODIwNDg4NjE5fQ.TjM85aF5XSK74ZaVRx1bE2WHM-_pqmnzo2rjOG8vOC4' },
  { name: 'APTC', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/APTC.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9BUFRDLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTI2MzUsImV4cCI6MTgyMDQ4ODYzNX0.pmbFzVm3LxKJ5yKeVBv_AHtRekwM0NDB7zgAZ4TOjP4' },
  { name: 'UNCDF', image: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/UNCDF.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9VTkNERi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUyNjU0LCJleHAiOjE4MjA0ODg2NTR9.ILEEqS0bEiT7RJy-h-v-UBr_dK86Xu8I6v5_NSmcO-Q' },
];
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CalendarDays, Camera, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Facebook, Heart, Instagram, Lightbulb, Linkedin, Mail, MapPin, Megaphone, MessageCircle, Music2, Phone, Radio, ShieldCheck, Star, Target, Users, Video, Award, Zap, Eye, X } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { galleryVideo } from '../lib/gallery-media';
import { useGalleryCategories, useGalleryProjects } from '../lib/hooks/useGallery';
import { projectStatuses, type ProjectStatus } from '../types/gallery';
import * as Dialog from '@radix-ui/react-dialog';
import { getPublicImageUrl } from '../lib/media';
import { responsiveImage } from '../lib/media-assets';
import ResponsiveImage from '../components/media/ResponsiveImage';
import BackgroundVideo from '../components/media/BackgroundVideo';
import ClickToPlay from '../components/media/ClickToPlay';
import {cupTitle,cupIntro,cupDescription,cupPhotos} from '../components/media/CommandersCup';
import { optimizedImage } from '../lib/media-assets';


const IMG = {
  hero: '/images/AG8A5146_fullres.jpg',
  team: '/images/273A1336.JPG',
  work: '/images/6H8A9956.jpg',
  beach: '/images/AG8A4662_fullres.jpg',
  event: '/images/273A1438.JPG',
  about: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/BTS%202.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9CVFMgMi5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NTk5ODg0LCJleHAiOjE4MjAxMzU4ODR9.QWhB4mllhy70keeCH3iQHEJ_29QBDX7yuKFO6unyc5g',
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
const CONTACT_HERO_VIDEO = 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/videos/BTS%20Slide%20reel.mov?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvQlRTIFNsaWRlIHJlZWwubW92Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODc5NTg0NiwiZXhwIjoxODIwMzMxODQ2fQ.uX5CRiIkZHseAFjwIuOrZ_DQrAF6sg84RA8DmP1hNLo';
const CONTACT_MAP_EMBED = 'https://www.google.com/maps?q=-9.4554272,147.1855726&z=16&output=embed';
const CONTACT_MAP_LINK = 'https://www.google.com/maps/place/FOKAL+SOLUTIONS+LTD/@-9.4554219,147.1829977,1112m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6902313e709e52ed:0xc9ca5de553e7313d!8m2!3d-9.4554272!4d147.1855726!16s%2Fg%2F11zf333mjb?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';
const HOME_HERO_IMAGE = {fallback:'/media/home-1920.webp',webp:Object.fromEntries([480,768,1280,1920].map(w=>[w,`/media/home-${w}.webp`]))};
const HOME_HERO_VIDEO = {poster:HOME_HERO_IMAGE,mobile:'/media/home-mobile.mp4',desktop:'/media/home-desktop.mp4'};
const SUPABASE_ASSETS = {
  team: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/work.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC93b3JrLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg1NzExODEsImV4cCI6MTgyMDEwNzE4MX0.OL4bt1rqmJtExTE2W6cR_hyUZySiRsXZ8dQfQ1eFRFU',
  corporate: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Corporate%20Event2.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9Db3Jwb3JhdGUgRXZlbnQyLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg1NzE2MDQsImV4cCI6MTgyMDEwNzYwNH0.yPgEU5tltsHQ4TXrVobJA8Tb7X-tamhK7N1db_VtP_I',
  documentary: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/docu.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9kb2N1LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg1NzE2MjcsImV4cCI6MTgyMDEwNzYyN30.TElM8_WTcEgbYUxh-Fh8s8CVYH954JLssj9zZYMdjWE',
  liveEvent: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Live%20Ev.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9MaXZlIEV2LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg1NzE2NDEsImV4cCI6MTgyMDEwNzY0MX0.TOHnf91x2dIX59EwUiQ_NSJYEWcxXkZ6U3qjHlakp_4',
  brand: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Brand.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9CcmFuZC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NTcxNjY0LCJleHAiOjE4MjAxMDc2NjR9.weIDQs97yVc59H15nXodwllShB0j98ur9UkHf280fO4',
  aboutBts: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/BTS1.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9CVFMxLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg1ODU5NTksImV4cCI6MTgyMDEyMTk1OX0.Wf-rXsT7Nyl92NDWZNIt5zjO7SX6EkLdv3E3In_XcIs',
  aboutHeroVideo: 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/videos/2026/FOKAL%20EVENT%20COVERAGE.mov?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvMjAyNi9GT0tBTCBFVkVOVCBDT1ZFUkFHRS5tb3YiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NTg2MDQ2LCJleHAiOjE4MjAxMjIwNDZ9.KBgtYOXWdTjfDGzMRZUrmWrs4aXOtYtshO53woTTmSw',
} as const;
const HOME_TEAM_IMAGE = responsiveImage('home/team', SUPABASE_ASSETS.team, 1280, 900);
const ABOUT_BTS_IMAGE = responsiveImage('about/behind-the-scenes', SUPABASE_ASSETS.aboutBts, 1280, 900);
const services: [string, any, string, string[]][] = [
  ['Photography', Camera, 'Capturing moments that tell your story with clarity and impact.', ['/images/photo1.jpg']],
  ['Live Streaming', Radio, 'Professional live streaming solutions for events of any scale.', ['/images/LIV_1.jpg', '/images/live2.jpg', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Live%20Ev.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9MaXZlIEV2LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTIxODIsImV4cCI6MTgyMDQ4ODE4Mn0.dcerR3n-bErPM-r7df_cModdn_1sNBw5nCxXuUITlzQ']],
  ['Events', CalendarDays, 'End-to-end event production and management.', ['https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/EVNT%202.jpeg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9FVk5UIDIuanBlZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTE4MzgsImV4cCI6MTgyMDQ4NzgzOH0._HBlZAjovTJZkeib1pKh7i_HGJOMtbznNyVL0lOt7l8', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/EVNT1.jpeg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9FVk5UMS5qcGVnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1MTg1MCwiZXhwIjoxODIwNDg3ODUwfQ.-w69gsXNMp-F4TBedLSLQuW2IICzzSHMer2ljYnK4Mw', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/EVNT3.jpeg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9FVk5UMy5qcGVnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1MTg2MywiZXhwIjoxODIwNDg3ODYzfQ.Ro59TkRwaD8G8zpjrNgMAmQ8YqhWbUVUl5CKwXRzpOs']],
  ['Marketing', Megaphone, 'Creative strategies that build brands and drive results.', [SUPABASE_ASSETS.brand, SUPABASE_ASSETS.corporate, SUPABASE_ASSETS.documentary, SUPABASE_ASSETS.liveEvent]],
  ['Branding', Award, 'Distinctive brand identities that make a lasting impression.', ['https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Hi%20PNG%20LOGO.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9IaSBQTkcgTE9HTy5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUwOTk3LCJleHAiOjE4MjA0ODY5OTd9._mopSOwhUx6GHw26Bcg5Vetk0QsIjd-eXUQS0WTpnaM', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Hi%20PNG%201.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9IaSBQTkcgMS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUxMDM2LCJleHAiOjE4MjA0ODcwMzZ9.ACmXI2HOuOLIEGNOmRd3hj1JMFlVZm2Q_10Ms8FCZUo', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/HI%20PNG%20Concept.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9ISSBQTkcgQ29uY2VwdC5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUxMDU0LCJleHAiOjE4MjA0ODcwNTR9.RDEWVgH0oDi57uxf4T837cjLXP7sBEkEm8jotFTuqE4']],
  ['Staging & AV', Lightbulb, 'Stage, lighting, sound and AV solutions for unforgettable events.', ['https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/STG1.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9TVEcxLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTIwNDAsImV4cCI6MTgyMDQ4ODA0MH0.Mo-sMrKyUiIYBY8nqnaLapkgOdPNrA_p3lQP_TbXoq8', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/stg2.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9zdGcyLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTIwNTgsImV4cCI6MTgyMDQ4ODA1OH0.npymI9u6X81gryjY5ofG3kmQykE2HWqdXSvqxT6KUls', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/stg3.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9zdGczLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTIwNzMsImV4cCI6MTgyMDQ4ODA3M30.EusymCJe59x5Bc-8HcBAPv3qnN4FR4cr4tkzm460vN4', 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/stg4.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9zdGc0LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTIwODYsImV4cCI6MTgyMDQ4ODA4Nn0.P-NMqHzEXr43SsMPDhKmjYQN6qE-tBriv9-Ooc5627s']],
];
const serviceDetails: Record<string, { overview: string; deliverables: string[] }> = {
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
const HIDDEN_TEAM_MEMBERS = new Set(['OSWALD NICHOLAS']);
const TEAM_ORDER_OVERRIDES = new Map([
  ['SHANNON AMBU', 1],
  ['PATRICK TURBARAT', 2],
]);
const TEAM_ROLE_OVERRIDES = new Map([
  ['SHANNON AMBU', 'Managing Director'],
  ['PATRICK TURBARAT', 'Director / Creative Manager'],
]);
const TEAM_IMAGE_OVERRIDES = new Map([
 ['SHANNON AMBU','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/NOX.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9OT1guanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODgwNDAyNCwiZXhwIjoxODIwMzQwMDI0fQ.uQucpps6AKBjlqjgl2tFbVFfww7DLdzE0AQpfO_vAAY'],
 ['PATRICK TURBARAT','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/Patz.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9QYXR6LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MDQwNDQsImV4cCI6MTgyMDM0MDA0NH0.M4yXaX7wmK5ZPkyhip_XvdvBhc6Frn35uKnCGoJUhFA'],
]);
const DIRECTOR_FALLBACKS:TeamMember[] = [
 {id:'shannon-ambu',name:'Shannon Ambu',role:'Managing Director',bio:'Leads Fokal Solutions with a focus on purposeful growth, strong client partnerships and reliable delivery across every production.',image_url:TEAM_IMAGE_OVERRIDES.get('SHANNON AMBU')!,display_order:1},
 {id:'patrick-turbarat',name:'Patrick Turbarat',role:'Director / Creative Manager',bio:'Guides creative strategy and production quality, shaping ideas into compelling stories and memorable audience experiences.',image_url:TEAM_IMAGE_OVERRIDES.get('PATRICK TURBARAT')!,display_order:2},
];
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
 if(!entry)return <main className="light-page photography-page"><h1>Project not found</h1><Link to="/gallery">Browse our projects</Link></main>;
 const index=Number(entry[0]);
 const project=projects[index];
 const content=homeProjectUpdates[index];
 return <main className="light-page photography-page project-overview">
  <Link to="/gallery">← All projects</Link><p>{project.category} · {project.date}</p><h1>{content.title}</h1>
  <ClickToPlay key={slug} youtubeId={content.youtubeId} title={content.title}/>
  <h2>Project overview</h2>{content.description.split('\n\n').map((paragraph,i)=><p key={i}>{paragraph}</p>)}
  <dl><dt>Client / Organisation</dt><dd>{project.client}</dd>{project.role&&<><dt>Our role</dt><dd>{project.role}</dd></>}{project.location&&<><dt>Location</dt><dd>{project.location}</dd></>}</dl>
  <Button to="/booking">DISCUSS A SIMILAR PROJECT</Button>
 </main>;
}
function Button({to='/contact', children}:{to?:string,children:React.ReactNode}) { return <Link className="blue-btn" to={to}>{children}<ArrowRight size={17}/></Link>; }
function Stats() { return <div className="stats">{[[Users,'150+','Projects Completed'],[Heart,'100+','Happy Clients'],[CalendarDays,'10+','Years Experience'],[MapPin,'Across PNG','Serving Nationwide']].map(([Icon,n,l]:any)=><div key={l}><Icon/><b>{n}</b><span>{l}</span></div>)}</div>; }
function PageHero({eyebrow,title,copy,image=IMG.hero,videoSrc,animatedBackground=false}:{eyebrow:string,title:React.ReactNode,copy:string,image?:string,videoSrc?:string,animatedBackground?:boolean}) {
 const resolvedVideoSrc = videoSrc || (eyebrow === 'OUR WORK' ? 'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/videos/RWF%20BCFW%20Highlight.mp4?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvUldGIEJDRlcgSGlnaGxpZ2h0Lm1wNCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2MDAzODksImV4cCI6MTgyMDEzNjM4OX0.ycC9I6Ip4z2q51mMlwhsLoXmu4jTL88GIoFISDBZA-g' : undefined);
 return <section className={`page-hero${animatedBackground ? ' page-hero--animated' : ''}`}><BackgroundVideo asset={{poster:optimizedImage(image),desktop:resolvedVideoSrc || ""}} className={animatedBackground ? "page-hero-video page-hero--animated" : "page-hero-video"} priority/><div><small>// {eyebrow}</small><h1>{title}</h1><p>{copy}</p></div><i/></section>;
}
function CTA(){return <section className="strip-cta"><div><b>Let's Work Together</b><span>We'd love to hear about your next project.</span></div><Button>GET IN TOUCH</Button><a href="mailto:info@fokalltd.com" aria-label="Email Fokal Solutions"><Mail/> info@fokalltd.com</a></section>}

export function HomePage() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [showreelFailed, setShowreelFailed] = useState(false);
  const clients = [...new Map(homeClients.map(client => [client.name, client])).values()];

  return <div className="cinematic-home">
    <section className="home-hero">
      <BackgroundVideo asset={HOME_HERO_VIDEO} className="hero-video" priority paused={showreelOpen}/>
      <div className="hero-copy">
        <h1>DRIVEN BY <strong>CREATIVITY</strong><br/>BACKED BY <strong>EXPERIENCE</strong>,<br/>INSPIRED BY <strong>YOU</strong>.</h1>
        <p>Media production, marketing and events across Papua New Guinea.</p>
        <div className="hero-actions">
          <Dialog.Root open={showreelOpen} onOpenChange={open => {
            setShowreelFailed(false);
            setShowreelOpen(open);
          }}>
            <Dialog.Trigger className="blue-btn">Watch Showreel <Video size={18} aria-hidden="true"/></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="showreel-overlay"/>
              <Dialog.Content className="showreel-dialog" aria-describedby={undefined}>
                <div className="showreel-heading">
                  <Dialog.Title>FOKAL Showreel</Dialog.Title>
                  <Dialog.Close aria-label="Close showreel">&times;</Dialog.Close>
                </div>
                {showreelOpen && (showreelFailed ? (
                  <p role="alert">The showreel couldn’t play. <a href={HERO_VIDEO_URL}>Open the video directly</a>.</p>
                ) : (
                  <video src={HERO_VIDEO_URL} poster={HOME_HERO_IMAGE.fallback} controls autoPlay playsInline preload="none"
                    crossOrigin={SHOWREEL_CAPTIONS ? 'anonymous' : undefined} onError={() => setShowreelFailed(true)}>
                    {SHOWREEL_CAPTIONS && <track kind="captions" src={SHOWREEL_CAPTIONS} srcLang="en" label="English" default/>}
                  </video>
                ))}
                <details className="px-4 py-3 text-white">
                  <summary>Read about the showreel</summary>
                  <p className="mt-2">FOKAL’s production portfolio spans photography, video, live streaming and event coverage across Papua New Guinea. Explore the Our Work gallery for project descriptions and selected photos.</p>
                  <Link className="underline" to="/gallery">Explore Our Work</Link>
                  {SHOWREEL_TRANSCRIPT && <a className="ml-4 underline" href={SHOWREEL_TRANSCRIPT}>Read the showreel transcript</a>}
                </details>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Link className="outline-btn" to="/gallery">View Our Work <ArrowRight size={17}/></Link>
        </div>
      </div>
    </section>

    <section className="home-section home-work" aria-labelledby="selected-work">
      <div className="home-shell">
        <div className="editorial-section-heading">
          <h2 id="selected-work">Selected work</h2>
          <Link className="editorial-text-link" to="/gallery">All projects <ArrowRight size={17}/></Link>
        </div>
        <div className="work-grid">
          {projects.slice(0, 4).map((project, index) => {
            const photography = index === 1;
            const title = photography ? cupTitle : homeProjectUpdates[index]?.title ?? project.title;
            const cover = photography ? cupPhotos[0].src : project.image;
            const route = photography ? '/photography' : '/projects/' + projectSlugs[index];
            const youtubeId = photography ? undefined : homeProjectUpdates[index]?.youtubeId ?? project.youtubeId;
            return <article className="editorial-project" key={route}>
              {youtubeId && <div className="inline-project-video">
                <ClickToPlay title={title} youtubeId={youtubeId} poster={optimizedImage(cover).fallback} showTranscriptLink={false}/>
              </div>}
              <Link to={route}>
                {!youtubeId && <ResponsiveImage asset={optimizedImage(cover)} alt="" sizes="(max-width: 600px) 100vw, 50vw"/>}
                <div className="editorial-project-title">
                  <div><small>{photography ? 'Photography' : project.category}</small><h3>{title}</h3></div>
                  <ArrowRight size={20} aria-hidden="true"/>
                </div>
              </Link>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="home-section service-ribbon-section" aria-labelledby="home-services">
      <div className="home-shell">
        <div className="editorial-section-heading">
          <h2 id="home-services">What we do</h2>
          <Link className="editorial-text-link" to="/services">Explore services <ArrowRight size={17}/></Link>
        </div>
        <div className="service-ribbon">
          {services.map(([name, Icon, copy]) => <article key={name}><Icon aria-hidden="true"/><h3>{name}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </section>

    <section className="home-section home-proof" aria-labelledby="home-clients">
      <div className="home-shell">
        <div className="editorial-section-heading"><h2 id="home-clients">Our clients</h2></div>
        <div className="client-logo-strip">
          <svg className="client-logo-filters" aria-hidden="true" width="0" height="0">
            <filter id="client-logo-remove-white" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -.2126 -.7152 -.0722 0 1"/>
              <feComponentTransfer><feFuncA type="linear" slope="12" intercept="-.24"/></feComponentTransfer>
              <feComposite in="SourceGraphic" operator="in"/>
            </filter>
          </svg>
          <div className="client-logo-track">
            {[false, true].map(copy => (
              <ul key={String(copy)} className="editorial-clients" aria-hidden={copy || undefined}>
                {clients.map(client => (
                  <li key={client.name}>
                    <ResponsiveImage
                      asset={optimizedImage(client.image)}
                      alt={copy ? '' : client.name}
                      sizes="200px"
                      className={client.name === 'BSP' || client.name === 'SLMP' ? undefined : 'client-logo-transparent'}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Stats/>
      </div>
    </section>

    <section className="home-section studio-intro" aria-labelledby="home-studio">
      <div className="home-shell">
        <ResponsiveImage asset={HOME_TEAM_IMAGE} alt="Fokal team at work" sizes="(max-width: 760px) 100vw, 50vw"/>
        <div>
          <h2 id="home-studio">A creative studio based in Papua New Guinea</h2>
          <p>Fokal Solutions Limited is a Papua New Guinea based production, marketing and events company. Our team of storytellers, technicians and strategists connects brands with people through powerful content and meaningful experiences.</p>
          <Link className="editorial-text-link" to="/about#directors">Meet the team <ArrowRight size={17}/></Link>
        </div>
      </div>
    </section>
    <section className="strip-cta">
      <div><h2>Let’s work together</h2><p>Tell us about your next project.</p></div>
      <Button to="/booking">Get a Quote</Button>
    </section>
  </div>;
}

export function AboutPage(){
 const [team,setTeam]=useState<TeamMember[]>([]);
 const [selectedDirector,setSelectedDirector]=useState<TeamMember|null>(null);
 useEffect(()=>{const fetchTeam=async()=>{const{data}=await supabase.from('team_members').select('*').order('display_order',{ascending:true});if(data)setTeam(data as TeamMember[]);};fetchTeam();},[]);
 const loadedDirectors=team.filter(m=>!HIDDEN_TEAM_MEMBERS.has(normalizeTeamMemberName(m.name))).map(m=>({...m,role:TEAM_ROLE_OVERRIDES.get(normalizeTeamMemberName(m.name))??m.role,image_url:TEAM_IMAGE_OVERRIDES.get(normalizeTeamMemberName(m.name))??m.image_url})).sort((a,b)=>{const ao=TEAM_ORDER_OVERRIDES.get(normalizeTeamMemberName(a.name))??Number.MAX_SAFE_INTEGER;const bo=TEAM_ORDER_OVERRIDES.get(normalizeTeamMemberName(b.name))??Number.MAX_SAFE_INTEGER;return ao-bo;});
 const visibleTeam=(loadedDirectors.length?loadedDirectors:DIRECTOR_FALLBACKS).slice(0,2);
return <><PageHero eyebrow="ABOUT US" title="Driven by Passion. Focused on Impact." copy="A Papua New Guinea creative company connecting brands with people through powerful content and meaningful experiences." image={IMG.about} videoSrc={SUPABASE_ASSETS.aboutHeroVideo}/><main className="light-page">
<section className="about-grid"><div><small>WHO WE ARE</small><h2>Driven by Passion.<br/>Focused on Impact.</h2><p>Fokal Solutions Limited is a 100% Papua New Guinean-owned company that delivers integrated creative solutions across media production, marketing, research, and live events. Fokal Solutions blends innovation, storytelling, and strategy to help brands, communities, and organisations connect, engage, and grow. From compelling photo and video production to full-scale marketing campaigns, event execution, and research-driven insights, we are committed to excellence at every touchpoint. With every frame, story, and experience, we showcase the spirit and diversity of PNG.</p><Button to="/about#directors">MEET THE TEAM</Button></div><ResponsiveImage asset={ABOUT_BTS_IMAGE} alt="Professional video camera" sizes="(max-width: 900px) 100vw, 55vw"/></section>

<section className="mission-vision"><div><Target/><small>OUR MISSION</small><h3>Connecting brands with people.</h3><p>To deliver high-impact creative services rooted in storytelling, strategy, and innovation — helping our clients achieve their goals while amplifying the voices, beauty, and resilience of Papua New Guinea and the Pacific region.</p></div><div><Eye/><small>OUR VISION</small><h3>A leader in creative media.</h3><p>To be Papua New Guinea’s leading creative and strategic solutions partner — inspiring change, celebrating culture, and empowering brands through purposeful storytelling and engaging experiences.</p></div></section>

<Stats/>

<section className="values"><small>OUR VALUES</small>{[[Star,'Excellence','We deliver work that exceeds expectations.'],[Users,'Commitment','We are dedicated to our clients vision.'],[ShieldCheck,'Integrity','We build trust through honest practices.'],[Heart,'Impact','We create content that resonates.']].map(([Icon,t,d]:any)=><div key={t}><Icon/><b>{t}</b><span>{d}</span></div>)}</section>

<section className="production-showcase"><div><small>IN MOTION</small><h2>Stories made to move people.</h2><p>From the first brief to the final frame, our crew combines local knowledge, creative direction and reliable production technology to make every story feel alive.</p><div className="production-points"><span><Video/> Film &amp; edit</span><span><Radio/> Live broadcast</span><span><Camera/> Photography</span></div></div><div className="production-video"><BackgroundVideo asset={HOME_HERO_VIDEO}/></div></section>

<section className="team-highlight"><div><small>OUR TEAM</small><h2>Creative professionals.<br/>Passionate about impact.</h2><p>Our team brings together storytellers, cinematographers, photographers, editors, producers, strategists and event specialists. We combine diverse skills with a shared commitment to delivering work that makes a difference.</p></div><div className="team-roles">{[['Producers','Project leadership and creative direction.'],['Cinematographers','Visual storytelling through every frame.'],['Editors','Post-production that brings stories to life.'],['Photographers','Capturing moments with clarity and impact.'],['Strategists','Marketing plans that connect and convert.'],['Technicians','Technical production and on-site delivery.']].map(([role,desc])=><div key={role}><b>{role}</b><span>{desc}</span></div>)}</div>
</section>

<section id="directors" className="directors-section"><small>MEET OUR DIRECTORS</small><h3>Leadership with vision.</h3><div className="directors-grid">{visibleTeam.map((d)=><article key={d.id} className="director-card director-card-interactive" role="button" tabIndex={0} aria-label={`Learn more about ${d.name}`} onClick={()=>setSelectedDirector(d)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelectedDirector(d);}}}><div className="director-photo">{d.image_url?<img loading="lazy" decoding="async" src={optimizedImage(getPublicImageUrl(d.image_url)).fallback} alt={d.name}/>:<Users/>}</div><div className="director-info"><b>{d.name}</b><small>{d.role}</small><p>{d.bio}</p><span className="director-prompt">HOVER OR CLICK TO LEARN MORE <ArrowRight/></span></div><div className="director-hover-detail"><small>{d.role}</small><strong>{d.name}</strong><p>{d.bio}</p><span>CLICK FOR PROFILE</span></div></article>)}</div></section>

<section className="why-choose-us"><div><small>WHY CHOOSE US</small><h2>Reasons clients trust us.</h2></div><div className="why-grid">{[[Award,'Proven track record','150+ projects delivered across industries in PNG and the Pacific.'],[Zap,'Fast turnaround','We deliver quality work on schedule, every time.'],[ShieldCheck,'Reliable and professional','A trusted partner for organisations of every size.'],[Heart,'Local expertise','Deep understanding of PNG culture, audiences and business landscape.']].map(([Icon,t,d]:any)=><div key={t}><Icon/><b>{t}</b><span>{d}</span></div>)}</div></section>

<section className="clients-section"><div><small>OUR CLIENTS</small><h2>Trusted by leading organisations.</h2><p>We are proud to work with a diverse range of clients across industries in Papua New Guinea and beyond.</p></div><div className="client-grid">{clientNames.map((x,i)=><div key={`${x}-${i}`} className={`client-${i%4}`}>{clientLogoUrls[i]?<img loading="lazy" decoding="async" src={optimizedImage(clientLogoUrls[i]).fallback} alt={`${x} logo`}/>:x}</div>)}</div><div className="clients-testimonials"><blockquote>“Their professionalism and attention to detail made a huge difference in our event.”<b>— Corporate Client</b></blockquote><blockquote>“A talented and reliable team that truly understands our needs.”<b>— Government Partner</b></blockquote><blockquote>“Consistently provides top-quality service and creative solutions.”<b>— NGO Partner</b></blockquote></div></section>

</main><CTA/>{selectedDirector&&<div className="director-modal-overlay" role="presentation" onClick={()=>setSelectedDirector(null)}><section className="director-modal" role="dialog" aria-modal="true" aria-labelledby="director-modal-name" onClick={event=>event.stopPropagation()}><button onClick={()=>setSelectedDirector(null)} aria-label="Close director profile"><X/></button><div className="director-modal-photo">{selectedDirector.image_url?<img loading="lazy" decoding="async" src={optimizedImage(getPublicImageUrl(selectedDirector.image_url)).fallback} alt={selectedDirector.name}/>:<Users/>}</div><div className="director-modal-copy"><small>{selectedDirector.role}</small><h2 id="director-modal-name">{selectedDirector.name}</h2><p>{selectedDirector.bio}</p><Button to="/contact">GET IN TOUCH</Button>{selectedDirector.id==='shannon-ambu'&&<nav className="director-socials" aria-label={`${selectedDirector.name} social profiles`}><a href="https://www.facebook.com/ambu.shannon" target="_blank" rel="noreferrer" aria-label="Shannon Ambu on Facebook"><Facebook/></a><a href="https://www.linkedin.com/in/shannon-ambu-271077163/" target="_blank" rel="noreferrer" aria-label="Shannon Ambu on LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/specsman_ambu/" target="_blank" rel="noreferrer" aria-label="Shannon Ambu on Instagram"><Instagram/></a><a href="https://www.tiktok.com/@nox_thefixer" target="_blank" rel="noreferrer" aria-label="Shannon Ambu on TikTok"><Music2/></a></nav>}{selectedDirector.id==='patrick-turbarat'&&<nav className="director-socials" aria-label={`${selectedDirector.name} social profiles`}><a href="https://www.facebook.com/search/top?q=patrick%20turbarat" target="_blank" rel="noreferrer" aria-label="Patrick Turbarat on Facebook"><Facebook/></a><a href="https://www.linkedin.com/in/patrick-turbarat-083399211/" target="_blank" rel="noreferrer" aria-label="Patrick Turbarat on LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/itz_pats675/" target="_blank" rel="noreferrer" aria-label="Patrick Turbarat on Instagram"><Instagram/></a></nav>}</div></section></div>}</>}

function ServiceThumbnail({images,alt}:{images:string[],alt:string}){
 const [idx,setIdx]=useState(0);
 const [hasInteracted,setHasInteracted]=useState(false);
 useEffect(()=>{if(!hasInteracted || images.length<2)return;const t=setInterval(()=>setIdx(i=>(i+1)%images.length),3500);return()=>clearInterval(t);},[hasInteracted,images.length]);
 const selectImage=(next:number)=>{setHasInteracted(true);setIdx(next);};
 return <div className="service-thumb-wrap">{images.slice(0,hasInteracted?images.length:1).map((src,i)=><ResponsiveImage key={src} asset={optimizedImage(src)} alt={alt} sizes="(max-width: 900px) 100vw, 45vw" className={i===idx?'active':''}/>) }<div className="service-thumb-dots">{images.map((_,i)=><button key={i} className={i===idx?'active':''} onClick={e=>{e.stopPropagation();selectImage(i);}} aria-label={`Show image ${i+1}`}/>)}</div></div>;
}
const photographyShowcase = [
  {
    "title": "Executive Portrait Photography",
    "image": "https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Executive%20Portrait.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9FeGVjdXRpdmUgUG9ydHJhaXQuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MDIzNDg1MCwiZXhwIjoxODIxNzcwODUwfQ.fqPjPSl5KB3-_SsvQmfwvAVPBLUVAE2Nk93xGuCUL-Q",
    "description": "Professional portraits that capture personality and confidence for leadership profiles, corporate websites and personal branding."
  },
  {
    "title": "Corporate Event Photography",
    "image": "https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Corporate%20Event2.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9Db3Jwb3JhdGUgRXZlbnQyLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTAyMzQ4ODAsImV4cCI6MTgyMTc3MDg4MH0.DgdSG5hq6Ff7-mEw87Y7wGtcbPcsiIZI4gq9ZJ3bVPo",
    "description": "Capturing speakers, guests and key moments at corporate events, with polished images for communications, publicity and lasting records."
  },
  {
    "title": "Industrial Documentation Photography",
    "image": "https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Industrial%20Documentatio%20Photography.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9JbmR1c3RyaWFsIERvY3VtZW50YXRpbyBQaG90b2dyYXBoeS5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwMjM0OTExLCJleHAiOjE4MjE3NzA5MTF9.RkmLxVIVxM_1sxlVIqb1i8zn5j2oU81rKDJiG9L0gYE",
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
export function ServicesPage(){const [selectedService,setSelectedService]=useState<Service|null>(null);return <><PageHero eyebrow="OUR SERVICES" title={<>Solutions that bring<br/>your vision to life.</>} copy="A full range of media production, marketing and events solutions tailored to exceed your expectations." image="https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Wide%20services.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9XaWRlIHNlcnZpY2VzLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2MDAwNzAsImV4cCI6MTgyMDEzNjA3MH0.Au76AQFXKFv-bZcFVfGMzkwHV6Z2H_NLZTIM2XfuBmU" animatedBackground/><main className="light-page"><section className="services-intro"><p>Fokal Solutions Limited delivers end-to-end creative and strategic services that empower brands, organisations, and communities to communicate effectively and make a meaningful impact. Our work spans media production, marketing, research, and live event execution, offering clients a one-stop partner for visual storytelling, audience engagement, insight-driven strategy, and memorable experiences. Every service we provide is tailored to our clients' goals, ensuring purposeful, professional, and grounded outcomes.</p></section><section className="service-grid">{services.map((service)=>{const [name,Icon,copy,imgs]=service;return <article className="service-card-interactive" key={name} role="button" tabIndex={0} aria-label={`View ${name} service details`} onClick={()=>setSelectedService(service)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelectedService(service);}}}><div className="service-card-text"><Icon/><h3>{name}</h3><p>{copy}</p>{['Creative strategy','Professional production','Experienced team','Reliable delivery'].map(x=><span key={x}><Check/> {x}</span>)}<b className="service-card-action">EXPLORE SERVICE <ArrowRight/></b></div><ServiceThumbnail images={imgs} alt={name}/></article>;})}</section><section className="process"><div><small>OUR PROCESS</small><h2>From Concept<br/>to Completion.</h2></div>{['Discover','Plan','Create','Deliver','Measure'].map((x,i)=><div key={x}><b>0{i+1}</b><strong>{x}</strong><span>Focused work that moves your vision forward.</span></div>)}</section></main><CTA/>{selectedService&&<ServiceModal service={selectedService} onClose={()=>setSelectedService(null)}/>}</>}

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
  if (project.youtubeId) return <ProjectVideo id={project.youtubeId} title={project.title}/>;
  if (project.facebookUrl) return <FacebookProjectVideo url={project.facebookUrl} title={project.title}/>;
  return <img loading="lazy" decoding="async" src={project.image ? optimizedImage(project.image).fallback : IMG.gallery} alt={project.title}/>;
}

const GALLERY_BATCH_SIZE = 6;

export function GalleryPage() {
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
    <PageHero eyebrow="OUR WORK" title={<>Projects that speak<br/>for <em>themselves.</em></>} copy="We partner with organisations across Papua New Guinea and beyond to create powerful content and memorable experiences." image={IMG.gallery}/>
    <main className="light-page">
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
                    poster={project.image ? optimizedImage(project.image).fallback : undefined}/>
                </div>
                : <ResponsiveImage asset={optimizedImage(project.image || IMG.gallery)} alt="" sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"/>}
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
    </main>
    <CTA/>
  </>;
}
const clientNames=['KUMUL CONSOLIDATED HOLDINGS','PNG POWER','HIDES','NEWCREST','ExxonMobil','Santos','Air Niugini','Westpac','Digicel','BSP','UNDP','THE WORLD BANK','Australian Aid','JICA','Save the Children','care'];
const clientLogoUrls=['https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/WARTSILLA.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9XQVJUU0lMTEEuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODU5MDAwMCwiZXhwIjoxODIwMTI2MDAwfQ.o7jjNGAbPqynPvoNM-NIidlFlk-LK9rGFb0chMNXiFI','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/UNFPA.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9VTkZQQS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NTkwMTMzLCJleHAiOjE4MjAxMjYxMzN9.jMs3M5Qm97LnlVZGsWON9SQ4orXwWZUvXBRNoEEuX-w','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/TWM-Group.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9UV00tR3JvdXAucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODU5MDE1MywiZXhwIjoxODIwMTI2MTUzfQ.NrEC8E3b_3GxLvbXYnV-1GfhK0eRD9AIWCzcyZvq_3k','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/BCFW.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9CQ0ZXLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODU5MDE3NCwiZXhwIjoxODIwMTI2MTc0fQ.gzp0fvowJG7XRyyWmvAQyzBN3yJtWarV-icie-6YqK0','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/NUI%20POWER.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9OVUkgUE9XRVIuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODU5MDE5NSwiZXhwIjoxODIwMTI2MTk1fQ.eCg0eELJNr-s5QCi-dDLZSMK-81ZCDZEo0dUvt6SHyw','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/SJA.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9TSkEuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODU5MDIxMCwiZXhwIjoxODIwMTI2MjEwfQ._15hvz3WDMs2YxRHq75ab7BHP0D1v-a-MppYDPMrAEE','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/CSL.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9DU0wuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODU5MDIzMSwiZXhwIjoxODIwMTI2MjMxfQ._PhfUdddGcoS8UzgZP_ttlMPohEbGQzW_q0G0y2IrNE','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/PNG%20AUS.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9QTkcgQVVTLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODU5MDI1MSwiZXhwIjoxODIwMTI2MjUxfQ.MPLWZPC77iMbSrB9YbkQzRrXwLIYP2s2kq5cbhBm2v0','https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/PNG%20AUS.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9QTkcgQVVTLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODU5MDI4MiwiZXhwIjoxODIwMTI2MjgyfQ.nEYGEeFODV3VQPk6SObv5xoOkc7Iafhabs93-hFmcyM'];

// Updated client artwork supplied for the About page grid.
Object.assign(clientNames,{0:'BSP',12:'SLMP',13:'International Trade Centre',14:'GFA',15:'PALM',3:'APTC',7:'PNG Australia Partnership',8:'UNCDF',9:'BCFW',10:'BCFW',11:'ABT'});
Object.assign(clientLogoUrls,{
 0:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/BSP-logo.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9CU1AtbG9nby5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUwMTI5LCJleHAiOjE4MjA0ODYxMjl9.E2-j8fkEtLhhz174FFs__SBbr4bt4BoHlUnHjT7LWFs',
 12:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/SLMP.jpeg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9TTE1QLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkwMjMyMTEyLCJleHAiOjE4MjE3NjgxMTJ9.vGMPqWQ4NrctQKH5OWbfMydsTMySw4m0Ft3WZJgRlwY',
 13:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/International_Trade_Centre_Logo.svg.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9JbnRlcm5hdGlvbmFsX1RyYWRlX0NlbnRyZV9Mb2dvLnN2Zy5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4OTUwMTY3LCJleHAiOjE4MjA0ODYxNjd9.DXzD_Tnj45Ry2I-z5UwFCTH9SLBQlHL2q0Lej-Nc99s',
 14:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/GFA%20.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9HRkEgLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTAxODMsImV4cCI6MTgyMDQ4NjE4M30.TGORWxLIXgR25YZvwnVtmMLy79x601WLwQNTxQ4Gxu8',
 15:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/palm_logo2x_0.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9wYWxtX2xvZ28yeF8wLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg5NTAxOTksImV4cCI6MTgyMDQ4NjE5OX0.4pNd9Op-S0adaaJV-fJQshUr-sX-JNR5FVM5hbF3brA',
 3:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/APTC.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9BUFRDLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MDA2ODAsImV4cCI6MTgyMDMzNjY4MH0.feRiMW9DzweCq3d91ojCGCAq8ncU67PzwkzgGQeTqgY',
 7:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/PNG%20AUS.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9QTkcgQVVTLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MDA1ODgsImV4cCI6MTgyMDMzNjU4OH0.7MR_LfMEHDGaHpOg6eWyiBQoJCPfZzPvgpYSExqBfdI',
 8:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/UNCDF.png?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9VTkNERi5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4ODAwNjI2LCJleHAiOjE4MjAzMzY2MjZ9.BzYDlxAbLpZoRGSTqFZUVFmjMXWJJyZBxC4enM2Sz1A',
 9:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/BCFW.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9CQ0ZXLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MDA2NTUsImV4cCI6MTgyMDMzNjY1NX0.K_yRnl_U3tgm02p1gf3PFq4Si9xxM02hgEcUKbTVTy4',
 10:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/BCFW.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9CQ0ZXLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MzgyODMsImV4cCI6MTgyMDM3NDI4M30.UxcHqVmtzQ3-bptBAXv5Ovr_1uN5zisFtmq2jhd4k-c',
 11:'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/CLIENTEL/ABT.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9DTElFTlRFTC9BQlQuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODgzODMxOCwiZXhwIjoxODIwMzc0MzE4fQ.NLI2VvzgBNUnNuoZhw1JaAnbbWj4GP-WiPsqwck5ZjI'
});

export function ContactPage(){
 const [faqOpen,setFaqOpen]=useState<number|null>(0);
 const faqs:[string,string][]=[
  ['What services do you offer?','We offer video production, photography, live streaming, event production, marketing and staging & AV services. Whether you need a single video or a full multi-day event production, we can help.'],
  ['How do I get a quote?','Simply fill out the quote request form on our Get a Quote page with your project details, and we will prepare a tailored quote within 1-2 business days. You can also call or WhatsApp us directly.'],
  ['Do you work outside of Port Moresby?','Yes. We work with clients across all provinces of Papua New Guinea and have experience travelling to remote locations for projects. Travel and accommodation costs are included in your quote.'],
  ['Can you handle last-minute or urgent projects?','We do our best to accommodate urgent requests. Contact us directly by phone or WhatsApp for same-week bookings, and we will let you know our availability right away.'],
  ['Do you provide equipment hire only?','Yes, we offer equipment hire for cameras, lighting, sound and AV separately from our production services. Get in touch with your requirements and we will provide a hire quote.'],
  ['What formats do you deliver?','We deliver in any format you need - 4K, HD, social media cutdowns, broadcast specifications and more. Let us know your delivery requirements and we will handle the rest.'],
 ];
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
 return <><PageHero eyebrow="CONTACT US" title={<>Let's create something<br/><em>amazing</em> together.</>} copy="We'd love to hear about your project. Fill out the form or reach out using the details below." image={IMG.contact} videoSrc={CONTACT_HERO_VIDEO}/>
 <main className="light-page">
  <div className="contact-grid"><section><small>GET IN TOUCH</small><h2>We're here to bring your ideas to life.</h2><p>Whether you have a project in mind, need more information about our services, or just want to say hello — we'd love to hear from you.</p><div className="contact-list"><span><Phone/> <b>+675 7295 5054 / 8478 2028</b> Call or WhatsApp</span><span><Mail/><b>info@fokalltd.com</b> Send us an email</span><span><MapPin/><b>Port Moresby, NCD</b> Papua New Guinea</span></div></section><ContactForm/></div>

  <section className="location-section"><div className="contact-extra-head"><small>LOCATE US</small><h2>Visit Fokal Solutions.</h2><p>Find our Port Moresby office on Google Maps.</p></div><div className="location-map"><iframe src={CONTACT_MAP_EMBED} title="Fokal Solutions Ltd location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a className="blue-btn location-map-link" href={CONTACT_MAP_LINK} target="_blank" rel="noreferrer">OPEN IN GOOGLE MAPS <ArrowRight/></a></div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>WHY REACH OUT</small><h2>What happens after you contact us?</h2><p>We make the process simple and transparent from the very first conversation.</p></div><div className="contact-steps">{steps.map(([Icon,t,d]:any)=><div key={t}><Icon/><b>{t}</b><span>{d}</span></div>)}</div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>OFFICE HOURS</small><h2>When you can reach us.</h2><p>We're available during the hours below. For urgent enquiries outside these hours, send us a WhatsApp message and we'll respond as soon as possible.</p></div><div className="hours-grid">{hours.map(([day,time,note])=><div key={day}><b>{day}</b><span>{time}</span><small>{note}</small></div>)}</div></section>

  <section className="contact-extra"><div className="contact-extra-head"><small>FAQ</small><h2>Frequently asked questions.</h2><p>Got a question? Chances are we've answered it before. If not, send us a message and we'll get back to you.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div key={i} className={`faq-item ${faqOpen===i?'open':''}`}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)}><b>{q}</b><ChevronDown className="faq-chevron"/></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></section>
 </main></>}
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
 return <><PageHero eyebrow="GET A QUOTE" title={<>Let's bring your<br/>vision to <em>life.</em></>} copy="Tell us about your project and we'll prepare a tailored quote that fits your needs." animatedBackground image={'https://pixzptkgvkiyzdaeffqc.supabase.co/storage/v1/object/sign/images/2026%20Content%20/Home-Hero.jpg?token=eyJraWQiOiJkMmZiYjA1NS0zYzg5LTRmMmMtODZiOS1lNDkwNDFhZWU4NWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvMjAyNiBDb250ZW50IC9Ib21lLUhlcm8uanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODk1NjcxMywiZXhwIjoxODIwNDkyNzEzfQ.hOdPQ593m-ZHiVD04hpT5WqY7jV-QXcs5owUxkoZsu4'}/><main className="light-page quote-layout"><aside><small>HOW IT WORKS</small><h2>Simple. Fast. Effective.</h2>{['Tell Us About Your Project','We Review Your Requirements','Receive Your Quote'].map((x,i)=><div className="quote-step" key={x}><b>{i+1}</b><span><strong>{x}</strong>We'll guide you through each simple step.</span></div>)}</aside>
 <form name="booking" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="fokal-form" onSubmit={submitQuote}>
 <input type="hidden" name="form-name" value="booking"/><input type="hidden" name="services" value={chosenServices.join('; ')}/><p hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
 <small>REQUEST A QUOTE</small><h2>Project Details</h2><Link className="underline" to="/project-brief">What to prepare before requesting a quote</Link><div className="two-col"><input name="name" aria-label="Full Name" placeholder="Full Name *" required autoComplete="name"/><input name="organisation" aria-label="Company / Organisation" placeholder="Company / Organisation" autoComplete="organization"/><input name="email" aria-label="Email Address" type="email" placeholder="Email Address *" required autoComplete="email"/><input name="phone" aria-label="Phone Number" type="tel" placeholder="Phone Number *" required autoComplete="tel"/></div>
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
 <button type="submit" className="blue-btn" disabled={submission==='sending'}>{submission==='sending'?'SENDING…':'SUBMIT QUOTE REQUEST'} <ArrowRight/></button></form></main></>;
}
