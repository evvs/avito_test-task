import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackHomeButton from '@components/BackHomeButton';
import {
  setPageInfo,
  fetchNewsPageData,
  clearPageNewsState,
} from '@redux_slices/currentNewsPageSlice';
import Loader from '@components/Loader';
import Comment from '@components/Comment';
import { clearCommentsState } from '@redux_slices/commentsSlice';
import s from './newspage.module.scss';
import convertUnixDate from '../../utils';

const NewsPage = () => {
  const dispatch = useDispatch();
  const location = useHistory();
  const { id } = useParams();
  const preloadData = useSelector((state) => state.news.newsById[id]);
  const pageData = useSelector((state) => state.currentNewsPage);

  useEffect(() => {
    if (preloadData) dispatch(setPageInfo(preloadData));
    else dispatch(fetchNewsPageData(id));
    return () => {
      dispatch(clearPageNewsState());
      dispatch(clearCommentsState());
    };
  }, [dispatch, id, preloadData]);
  console.log('RENDER PAGE');

  const hidePageHandler = () => {
    location.push('/');
  };

  return (
    <>
      <div className={s.container}>
        {!pageData.isLoaded ? (
          <Loader />
        ) : (
          <>
            <div>
              <BackHomeButton onClick={hidePageHandler} />
            </div>
            <div className={s.infoContainer}>
              <div className={s.title}>
                <h2>{pageData.title}</h2>
                <p>{convertUnixDate(pageData.time)}</p>
              </div>
              <div>
                <p>{pageData.url}</p>
                <p>{pageData.by}</p>
                <p>{`comments count: ${pageData.rootCommentsCount}`}</p>
              </div>
            </div>
            <div className={s.commentsContainer}>
              {pageData.kids.map((commId) => <Comment key={commId} id={commId} />)}
            </div>
          </>
        )}
      </div>
      <div className={s.overlay} onClick={hidePageHandler} aria-hidden="true" />
    </>
  );
};

export default NewsPage;
