import React from 'react';
import Navigation from './Navigation';
import Background3D from './Background3D';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Background3D />
      <main>{children}</main>
      <Navigation />
    </div>
  );
};

export default Layout;
