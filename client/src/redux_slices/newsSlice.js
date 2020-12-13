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
  // eslint-disable-next-line no-unused-vars
  async (payload, thunkApi) => {
    const { data } = await axios.get(routes.getLatestNews());
    return data;
  },
);

export const fetchNewsCardInfo = createAsyncThunk(
  'news/fetchNewsCardInfo',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getCardInfo(payload));
    if (!data) {
      console.log(data);
      setTimeout(dispatch(fetchNewsCardInfo(payload)), 2000);
    }
    return data;
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
    [fetchNewsCardInfo.fulfilled]: (state, action) => {
      const { id, ...rest } = action.payload;
      state.newsById[id] = {
        id,
        ...rest,
      };
    },
  },
});

export const { removeFromState } = newsSlice.actions;

export default newsSlice.reducer;