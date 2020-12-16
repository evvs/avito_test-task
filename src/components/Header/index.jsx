import React from 'react';
import { useDispatch } from 'react-redux';
import headerLogo from '../../img/hacker.svg';
import RefreshButton from '../RefreshButton';
import { fetchLatestNews } from '../../redux_slices/newsSlice';
import s from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={s.header}>
      <div className={s.left}>
        <RefreshButton refreshfunc={() => dispatch(fetchLatestNews())} />
      </div>
      <div className={s.logo_title_wrapper}>
        <img className={s.logo} src={headerLogo} alt="logo" />
        <p className={s.title}>Hacker News</p>
      </div>
      <div className={s.right} />
    </header>
  );
};

export default Header;
