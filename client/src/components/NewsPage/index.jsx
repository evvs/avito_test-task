import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './newspage.module.scss';

const NewsPage = ({ id }) => {
  const location = useHistory();
  const hidePageHandler = () => {
    location.push('/');
  };

  console.log(id);

  return (
    <>
      <div className={s.container}>
        <div></div>
        <div
          style={{
            outline: '1px solid red',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div className={s.title}>
            <h2>Old Radiator Is a Pandemic-Fighting Weapon</h2>
            <p>1607879902</p>
          </div>
          <div>
            <p>URL I</p>
            <p>tosh</p>
            <p>comments count 0</p>
          </div>
        </div>
      </div>
      <div className={s.overlay} onClick={hidePageHandler} aria-hidden="true" />
    </>
  );
};

export default NewsPage;
