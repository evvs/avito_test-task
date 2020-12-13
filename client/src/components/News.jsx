import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchLatestNews } from '../redux_slices/newsSlice';
import NewsCard from './NewsCard';
import s from './news.module.scss';

const News = () => {
  const dispatch = useDispatch();
  const newsIds = useSelector((state) => state.news.latestNewsIds, shallowEqual);

  useEffect(() => {
    dispatch(fetchLatestNews());
    const intervalId = setInterval(() => {
      console.log('from interval');
      dispatch(fetchLatestNews());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('render news block');
  });

  return (
    <main>
      <div className={s.container}>
        {newsIds.map((id) => (
          <NewsCard key={id} id={id} />
        ))}
      </div>
    </main>
  );
};

export default News;
