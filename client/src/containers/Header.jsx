import React from 'react';
import headerLogo from '../img/hacker.svg';
import s from './header.module.scss';

const Header = () => (
  <header className={s.header}>
    <img className={s.logo} src={headerLogo} alt="logo" />
    <p className={s.title}>Hacker News</p>
  </header>
);

export default Header;
