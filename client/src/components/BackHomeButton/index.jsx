import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import s from './backhome.module.scss';

const BackHomeButton = ({ onClick }) => (
  <button type="button" className={s.btn} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
    News
  </button>
);

export default BackHomeButton;
