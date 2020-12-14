import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchNewsCardInfo, removeFromState } from '@redux_slices/newsSlice';
import Loader from '@components/Loader';
import s from './newscard.module.scss';
import convertUnixDate from '../../utils';

const NewsCard = ({ id }) => {
  const data = useSelector((state) => state.news.newsById[id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsCardInfo(id));
    return () => {
      dispatch(removeFromState(id));
    };
  }, [id, dispatch]);

  return (
    <div className={s.container}>
      {!data ? (
        <Loader />
      ) : (
        <Link to={`/news/${id}`} className={s.innerFlex}>
          <h3>{data.title}</h3>
          <div style={{ textAlign: 'center' }}>
            <p>
              <FontAwesomeIcon icon={faStar} className={s.cardIcon} />
              {` ${data.score}`}
            </p>
            <p>
              <FontAwesomeIcon icon={faUser} className={s.cardIcon} />
              {` ${data.by}`}
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} className={s.cardIcon} />
              {` ${convertUnixDate(data.time)}`}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NewsCard;
