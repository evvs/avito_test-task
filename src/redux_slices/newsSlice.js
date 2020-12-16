import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import routes from '../routes';

const initialState = {
  latestNewsIds: [],
  newsById: {},
};

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async () => {
    console.log('REFRESH NEWS');
    const { data } = await axios.get(routes.getLatestNews());
    return data;
  },
);

export const fetchNewsCardInfo = createAsyncThunk(
  'news/fetchNewsCardInfo',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    if (!data) {
      // in some cases we get empty(null) data, so retry after 15 sec
      setTimeout(dispatch(fetchNewsCardInfo(payload)), 15000);
    }
    return { data };
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    removeFromState: (state, action) => {
      const withoutDeletedNews = _.omit(state.newsById, [action.payload]);
      state.newsById = withoutDeletedNews;
    },
  },
  extraReducers: {
    [fetchLatestNews.fulfilled]: (state, action) => {
      state.latestNewsIds = action.payload;
    },
    [fetchLatestNews.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchNewsCardInfo.fulfilled]: (state, { payload: { data } }) => {
      try {
        const { id, ...rest } = data;
        state.newsById[id] = {
          id,
          ...rest,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const { removeFromState } = newsSlice.actions;

export default newsSlice.reducer;
