import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchLatestNews } from '@redux_slices/newsSlice';
import NewsCard from '@components/NewsCard';
import NewsPage from '@components/NewsPage';
import Loader from '@components/Loader';
import s from './newslist.module.scss';

const News = () => {
  const dispatch = useDispatch();
  const newsIds = useSelector((state) => state.news.latestNewsIds, shallowEqual);
  const { id: pathId } = useParams();

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
    if (pathId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [pathId]);

  useEffect(() => {
    console.log('render news block');
  });

  return (
    <main>
      {pathId && <NewsPage />}
      <div className={s.container}>
        {!newsIds.length ? (
          <Loader />
        ) : (
          newsIds.map((id) => <NewsCard key={id} id={id} />)
        )}
      </div>
    </main>
  );
};

export default News;
