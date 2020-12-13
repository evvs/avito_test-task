import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchNewsCardInfo, removeFromState } from '@redux_slices/newsSlice';
import Loader from '@components/Loader';
import s from './newscard.module.scss';
import convertUnixDate from '../../utils';

const NewsCard = ({ id }) => {
  const data = useSelector((state) => state.news.newsById[id] ?? 'loading');
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsCardInfo(id));
    return () => {
      dispatch(removeFromState(id));
    };
  }, [id, dispatch]);

  // useEffect(() => {
  // eslint-disable-next-line no-unneeded-ternary
  //   setLoading(data ? false : true);
  // }, [data]);

  return (
    <div className={s.container}>
      {data === 'loading' ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default NewsCard;
