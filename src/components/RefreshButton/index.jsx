import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import s from './refreshbutton.module.scss';

const RefreshButton = ({ refreshfunc }) => {
  const [active, setActive] = useState(false);

  const onClickHandler = () => {
    refreshfunc();
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
      title="sync"
    >
      <FontAwesomeIcon icon={faSyncAlt} />
    </button>
  );
};

export default RefreshButton;
