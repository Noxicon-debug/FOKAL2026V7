import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import SiteMeta from '../common/SiteMeta';
import Analytics from '../common/Analytics';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const path = useLocation().pathname.replace(/\/$/, '');
  const innerPage = path !== '' && path !== '/about';
  return (
    <div className="flex flex-col min-h-screen">
      <SiteMeta />
      <Analytics />
      <ScrollToTop />
      <Header />
      <main className={innerPage ? "flex-grow landing-page public-inner" : "flex-grow"}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
