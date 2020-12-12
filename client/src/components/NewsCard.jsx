import React from 'react';
import s from './newscard.module.scss';

const NewsCard = () => (
  <div className={s.container}>
    <h3>News Title</h3>
    <p className={s.raiting}>rating: 123</p>
    <p>author: QWerwq</p>
    <p>posted: 2020/12/11</p>
  </div>
);

export default NewsCard;
