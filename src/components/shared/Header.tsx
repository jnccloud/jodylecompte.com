import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';

const HeroBox = styled.div`
  background: #0889c2;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;

  h1 {
    padding: 0;
    margin: 0;
  }
`;

const Header: React.FC = () => (
  <header>
    <NavBar />
    <HeroBox>
      <h1>JodyLeCompte.com</h1>
      <h2>Full Stack Developer</h2>
    </HeroBox>
  </header>
);

export default Header;
