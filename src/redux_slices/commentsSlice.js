import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const initialState = {
  rootCommentsIds: [],
  commentsById: {},
  commentsUIstate: {},
};

export const fetchComment = createAsyncThunk(
  'fetchComment/fetchingComment',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload));
    if (!data) {
      // in some cases we get empty(null) data, so retry after 5 sec
      setTimeout(dispatch(fetchComment(payload)), 5000);
    }
    return data;
  },
);

const fetchCommentSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {
    clearCommentsState: () => initialState,
    toggleIsOpen: ({ commentsUIstate }, { payload: id }) => {
      commentsUIstate[id].isOpen = !commentsUIstate[id].isOpen;
    },
    setRootCommentsIds: (state, action) => {
      state.rootCommentsIds = action.payload.kids ? action.payload.kids : [];
    },
  },
  extraReducers: {
    [fetchComment.fulfilled]: (state, action) => {
      try {
        const { id, ...rest } = action.payload;
        state.commentsById[id] = {
          id,
          kids: [],
          ...rest,
        };
        state.commentsUIstate[id] = {
          isOpen: false,
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

export const { clearCommentsState, toggleIsOpen, setRootCommentsIds } = fetchCommentSlice.actions;

export default fetchCommentSlice.reducer;

export const refreshRootComments = createAsyncThunk(
  'fetchComment/refreshRootComments',
  async (payload, { dispatch }) => {
    const { data } = await axios.get(routes.getItem(payload.id));
    if (!data) {
      // in some cases we get empty(null) data, so retry after 5 sec
      setTimeout(dispatch(refreshRootComments(payload.id)), 5000);
    }
    dispatch(setRootCommentsIds(data));
  },
);
