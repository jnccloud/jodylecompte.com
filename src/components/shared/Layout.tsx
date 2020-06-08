import React from 'react';
import { PageProps } from 'gatsby';

import Header from '@/components/shared/Header';

import './layout.css';

const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <footer>Footer</footer>
  </>
);

export default Layout;
