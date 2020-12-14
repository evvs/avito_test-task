import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import newsReducer from './redux_slices/newsSlice';
import currentNewsPage from './redux_slices/currentNewsPageSlice';
import './globalStyles.scss';
import App from './App';

const rootReducer = { news: newsReducer, currentNewsPage };
const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
