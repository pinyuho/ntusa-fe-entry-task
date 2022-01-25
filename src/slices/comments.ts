import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import agent from './agent';

// type of slice entity ------------------------------------------------------

export type Comment = {
  id: number;
  postId: number;
  username: string;
  content: string;
  time: string;
};

// interfaces for response and action payload type check ---------------------

export interface BrowseCommentPayload {
  id: number;
  post_id: number;
  username: string;
  content: string;
  time_: string;
}

// interfaced of action arguments --------------------------------------------

export interface BrowseCommentArgs {
  postId: number;
}

export const browseComment = createAsyncThunk(
  'comments/browseComment',
  async ({ postId }: BrowseCommentArgs) => {
    const res = await agent.get<BrowseCommentPayload[]>(`/post/${postId}/comment`);
    return res.data;
  },
);

// TODO: addComment

// entity adaptor -------------------------------------------------------------

const commentAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: commentAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(browseComment.fulfilled, (state, action) => {
      commentAdapter.upsertMany(
        state,
        action.payload.map(({ id, post_id, username, content, time_ }) => ({
          id,
          postId: post_id,
          username,
          content,
          time: time_,
        })),
      );
    });
  },
});

export default commentSlice;
