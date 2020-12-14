import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment } from '@redux_slices/commentsSlice';
import parse from 'html-react-parser';
import Loader from '@components/Loader';
import convertUnixDate from '../../utils';
import s from './comments.module.scss';

const Comment = ({ id }) => {
  const data = useSelector((state) => state.comments.commentsById[id]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComment(id));
    console.log('comment effect');
  }, [id, dispatch]);
  console.log('comment DDDDDDDDDDDDDDDAATA', data);
  return (
    <div>
      {!data ? (
        <Loader />
      ) : (
        <div className={s.container}>
          <div className={s.header}>
            <p>{data.by}</p>
            <p className={s.time}>{convertUnixDate(data.time)}</p>
          </div>
          <p className={s.text}>{parse(data.text)}</p>
          {data.kids && data.kids.map((commentId) => <Comment key={commentId} id={commentId} />)}
        </div>
      )}
    </div>
  );
};

export default Comment;
