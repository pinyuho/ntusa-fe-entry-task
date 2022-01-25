import React, { useEffect } from 'react';

import { useAppDispatch } from '../reduxHooks';
import { browseAllPosts } from '../slices/posts';

export default function PostList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(browseAllPosts());
  }, []);
  return <ul></ul>;
}
