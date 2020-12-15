import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setRootCommentsIds } from './commentsSlice';
import routes from '../routes';

const initialState = {
  id: 0,
  title: '',
  time: 0,
  url: '',
  by: '',
  isLoaded: false,
};

const currentNewsPageSlice = createSlice({
  name: 'currentNewsPage',
  initialState,
  reducers: {
    // eslint-disable-next-line arrow-body-style
    setPageInfo: (state, { payload }) => {
      // const kids = payload.kids ? payload.kids : [];

      return {
        ...state,
        ...payload,
        isLoaded: true,
      };
    },
    clearPageNewsState: () => initialState,
  },
  extraReducers: {
  },
});

export const { setPageInfo, clearPageNewsState } = currentNewsPageSlice.actions;
export default currentNewsPageSlice.reducer;

export const fetchNewsPageData = createAsyncThunk(
  'currentNewsPage/fetchNewsPageData',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    dispatch(setRootCommentsIds(data));
    dispatch(setPageInfo(data));
  },
);
