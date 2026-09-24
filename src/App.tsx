import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'react-hot-toast';
import { Toaster as Sonner } from 'sonner';
const queryClient = new QueryClient();
const AdminPage = lazy(() => import('./pages/AdminPage'));
const HomePage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.HomePage })));
const ServicesPage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.ServicesPage })));
const AboutPage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.ContactPage })));
const GalleryPage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.GalleryPage })));
const PhotographyPage = lazy(() => import('./pages/PhotographyPage'));
const ProjectOverviewPage = lazy(() => import('./pages/SitePages').then(module => ({default:module.ProjectOverviewPage})));
const BookingPage = lazy(() => import('./pages/SitePages').then(module => ({ default: module.BookingPage })));

import HoverReceiver from "@/visual-edits/VisualEditsMessenger";

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HoverReceiver />

        <Routes location={location} key={location.pathname}>
          {/* Auth route — no Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected admin — no Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<main className="route-loading">Loading dashboard…</main>}><AdminPage /></Suspense>
              </ProtectedRoute>
            }
          />

          {/* Public routes wrapped in Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Suspense fallback={<main className="route-loading">Loading…</main>}><AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/photography" element={<PhotographyPage />} />
                    <Route path="/projects/:slug" element={<ProjectOverviewPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </AnimatePresence></Suspense>
              </Layout>
            }
          />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
