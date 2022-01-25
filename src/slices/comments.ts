import { createAsyncThunk } from '@reduxjs/toolkit';

import agent from './agent';

// type of slice entity ------------------------------------------------------

export type Comment = {
  username: string;
  content: string;
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

// TODO: comment slice
