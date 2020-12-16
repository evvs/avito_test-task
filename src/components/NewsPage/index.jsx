import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { createSelector } from 'reselect';
import {
  setPageInfo,
  fetchNewsPageData,
  clearPageNewsState,
} from '../../redux_slices/currentNewsPageSlice';
import Loader from '../Loader';
import Comment from '../Comment';
import BackHomeButton from '../BackHomeButton';
import {
  setRootCommentsIds,
  clearCommentsState,
  refreshRootComments,
} from '../../redux_slices/commentsSlice';
import s from './newspage.module.scss';
import convertUnixDate from '../../utils';

const NewsPage = () => {
  const dispatch = useDispatch();
  const location = useHistory();
  const { id } = useParams();
  const preloadData = useSelector((state) => state.news.newsById[id]);
  const pageData = useSelector((state) => state.currentNewsPage);
  const rootCommentsIds = useSelector(
    (state) => state.comments.rootCommentsIds,
    shallowEqual,
  );

  useEffect(() => {
    if (preloadData) {
      dispatch(setPageInfo(preloadData));
      dispatch(setRootCommentsIds(preloadData));
    } else dispatch(fetchNewsPageData(id));
    return () => {
      dispatch(clearPageNewsState());
    };
  }, [dispatch, id, preloadData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(refreshRootComments({ id }));
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, id]);

  useEffect(() => {
    console.log('RERENDER PAGE', rootCommentsIds);
  });

  useEffect(
    () => () => {
      dispatch(clearCommentsState());
    },
    [dispatch],
  );

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
                <p className={s.linkContainer}>
                  <a href={pageData.url} target="_blank" rel="noreferrer">
                    Link
                  </a>
                </p>
                <p>
                  <FontAwesomeIcon icon={faUser} className={s.iconText} />
                  <span className={s.iconText}>{` ${pageData.by}`}</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faComment} className={s.icon} />
                  <span className={s.iconText}>{rootCommentsIds.length}</span>
                </p>
              </div>
            </div>
            <div className={s.commentsContainer}>
              {rootCommentsIds.map((commId) => (
                <Comment key={commId} id={commId} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={s.overlay} onClick={hidePageHandler} aria-hidden="true" />
    </>
  );
};

export default NewsPage;
