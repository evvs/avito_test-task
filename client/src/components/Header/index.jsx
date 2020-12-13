import React from 'react';
import headerLogo from '@img/hacker.svg';
import RefreshButton from '@components/RefreshButton';
import s from './header.module.scss';

const Header = () => (
  <header className={s.header}>
    <div className={s.left}>
      <RefreshButton />
    </div>
    <div className={s.logo_title_wrapper}>
      <img className={s.logo} src={headerLogo} alt="logo" />
      <p className={s.title}>Hacker News</p>
    </div>
    <div className={s.right} />
  </header>
);

export default Header;
