import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import SiteMeta from '../common/SiteMeta';
import Analytics from '../common/Analytics';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteMeta />
      <Analytics />
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
