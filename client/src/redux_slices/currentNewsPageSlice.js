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
  kids: [],
  isLoaded: false,
};

const currentNewsPageSlice = createSlice({
  name: 'currentNewsPage',
  initialState,
  reducers: {
    setPageInfo: (state, { payload }) => {
      const kids = payload.kids ? payload.kids : [];
      const rootCommentsCount = payload.descendants;
      return {
        ...state,
        ...payload,
        kids,
        rootCommentsCount,
        isLoaded: true,
      };
    },
    setComment: (state, action) => {
      console.log('settt', action.payload);
      try {
        const { id, ...rest } = action.payload;
        state.commentsById[id] = {
          id,
          ...rest,
        };
      } catch (err) {
        console.log(err);
      }
    },
    clearPageNewsState: () => initialState,
  },
  extraReducers: {},
});

export const { setPageInfo, clearPageNewsState } = currentNewsPageSlice.actions;
export default currentNewsPageSlice.reducer;

export const fetchNewsPageData = createAsyncThunk(
  'currentNewsPage/fetchNewsPageData',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    dispatch(setPageInfo(data));
  },
);
