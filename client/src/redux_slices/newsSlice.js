import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  latestNewsIds: [],
  newsById: {},
};

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  // eslint-disable-next-line no-unused-vars
  async (payload, thunkAPI) => {
    const { data } = await axios.get(routes.getLatestNews());
    return data;
  },
);

export const fetchNewsCardInfo = createAsyncThunk(
  'news/fetchNewsCardInfo',
  // eslint-disable-next-line no-unused-vars
  async (payload, thunkAPI) => {
    const { data } = await axios.get(routes.getCardInfo(payload));
    return data;
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLatestNews.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.latestNewsIds = action.payload;
    },
    [fetchLatestNews.rejected]: (state, action) => {
      console.log(action);
    },
    [fetchNewsCardInfo.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      const { id, ...rest } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.newsById[id] = {
        id,
        ...rest,
      };
    },
  },
});

export default newsSlice.reducer;
