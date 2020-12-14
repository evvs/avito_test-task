import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  commentsById: {},
  commentsUIstate: {},
};

export const fetchComment = createAsyncThunk(
  'fetchComment/fetchingComment',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    if (!data) {
      // in some cases we get empty(null) data, so retry after 15 sec
      setTimeout(dispatch(fetchComment(payload)), 15000);
    }
    return data;
  },
);

const fetchCommentSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {
    clearCommentsState: () => initialState,
  },
  extraReducers: {
    [fetchComment.fulfilled]: (state, action) => {
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
    [fetchComment.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { clearCommentsState } = fetchCommentSlice.actions;

export default fetchCommentSlice.reducer;
