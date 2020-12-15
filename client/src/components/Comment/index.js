/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, toggleIsOpen } from '@redux_slices/commentsSlice';
import Loader from '@components/Loader';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import convertUnixDate from '../../utils';
import s from './comments.module.scss';

const Comment = ({ id }) => {
  const data = useSelector((state) => state.comments.commentsById[id]);
  const { isOpen } = useSelector((state) => state.comments.commentsUIstate[id] ?? false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComment(id));
  }, [id, dispatch]);

  const onOpenHandler = () => {
    dispatch(toggleIsOpen(id));
  };

  return (
    <div>
      {!data ? (
        <Loader />
      ) : (
        <div className={s.container}>
          <div onClick={onOpenHandler} aria-hidden="true" className={data.kids ? s.cursorPoiner : ''}>
            <div className={s.header}>
              <p>{data.by}</p>
              <p className={s.time}>{convertUnixDate(data.time)}</p>
            </div>
            <p className={s.text} dangerouslySetInnerHTML={{ __html: `${data.text}` }} />
          </div>
          <div className={s.footer} onClick={onOpenHandler} aria-hidden="true">
            {data.kids.length > 0 && <span><FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} className={s.chevron} /><FontAwesomeIcon icon={faComment} />{data.kids.length}</span>}
          </div>
          {data.kids && isOpen && data.kids.map((commentId) => (<Comment key={commentId} id={commentId} />))}
        </div>
      )}
    </div>
  );
};

export default Comment;
