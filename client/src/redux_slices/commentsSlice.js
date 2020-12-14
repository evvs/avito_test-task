import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  commentsById: {},
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchComment.fulfilled]: (state, { payload: { data } }) => {
      const { id, ...rest } = data;
      state.commentsById[id] = {
        id,
        ...rest,
      };
    },
  },
});

export default commentsSlice.reducer;
