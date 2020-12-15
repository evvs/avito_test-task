import React from 'react';
import headerLogo from '../../img/hacker.svg';
import RefreshNewsButton from '../RefreshNewsButton';
import s from './header.module.scss';

const Header = () => (
  <header className={s.header}>
    <div className={s.left}>
      <RefreshNewsButton />
    </div>
    <div className={s.logo_title_wrapper}>
      <img className={s.logo} src={headerLogo} alt="logo" />
      <p className={s.title}>Hacker News</p>
    </div>
    <div className={s.right} />
  </header>
);

export default Header;
