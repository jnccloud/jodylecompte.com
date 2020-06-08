import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #036995;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  color: #fff;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
`;

const NavLink = styled.li`
  display: inline;

  a {
    color: #fff;
    margin: 10px;
  }

  a:hover {
    color: gold;
  }
`;

const NavBar: React.FC = () => (
  <Nav>
    <NavLinks>
      <NavLink>
        <a href="#">Home</a>
      </NavLink>
      <NavLink>
        <a href="#">About</a>
      </NavLink>
      <NavLink>
        <a href="#">Portfolio</a>
      </NavLink>
      <NavLink>
        <a href="#">Blog</a>
      </NavLink>
      <NavLink>
        <a href="#">Contact</a>
      </NavLink>
    </NavLinks>
  </Nav>
);

export default NavBar;
