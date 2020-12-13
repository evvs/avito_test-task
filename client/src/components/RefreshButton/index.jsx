import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { fetchLatestNews } from '@redux_slices/newsSlice';
import s from './refreshbutton.module.scss';

const RefreshButton = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const onClickHandler = () => {
    dispatch(fetchLatestNews());
    setActive(!active);
  };

  const classes = cn(s.refresh_btn, {
    [s.rotate]: active,
  });

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={classes}
      onAnimationEnd={() => setActive(!active)}
    >
      <FontAwesomeIcon icon={faSyncAlt} />
    </button>
  );
};

export default RefreshButton;
