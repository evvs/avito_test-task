import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  id: 0,
  title: '',
  time: 0,
  url: '',
  by: '',
  rootCommentsCount: 0,
  commentsById: {},
  kids: [],
  isLoaded: false,
};

export const fetchComment = createAsyncThunk(
  'comments/fetchComment',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    if (!data) {
      // in some cases we get empty(null) data, so retry after 2 sec
      setTimeout(dispatch(fetchComment(payload)), 2000);
    }
    return { data };
  },
);

const currentNewsPageSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setPageInfo: (state, { payload }) => {
      const kids = payload.kids ? payload.kids : [];
      const rootCommentsCount = kids.length;
      return {
        ...state,
        ...payload,
        kids,
        rootCommentsCount,
        isLoaded: true,
      };
    },
    clearPageNewsState: () => initialState,
  },
  extraReducers: {},
});

export const { setPageInfo, clearPageNewsState } = currentNewsPageSlice.actions;
export default currentNewsPageSlice.reducer;

export const fetchNewsPageData = createAsyncThunk(
  'comments/fetchComment',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    dispatch(setPageInfo(data));
  },
);
