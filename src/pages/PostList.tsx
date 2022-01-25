import React, { useEffect } from 'react';

import PostListItem from '../partials/PostList/PostListItem';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { browseAllPosts } from '../slices/posts';

export default function PostListItemList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(browseAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-sky-200 p-6 rounded-l shadow-md">
      <div className="flex flex-row justify-between align-middle py-2 mb-2">
        <h1 className="text-3xl font-bold mb-3">Posts</h1>
        {/* TODO: Add post */}
        <button className="bg-yellow-700 text-white rounded-md shadow-md shadow-yellow-900 px-4 hover:bg-yellow-600 hover:cursor-pointer active:bg-yellow-800 transition-all">
          Add
        </button>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.ids.map((id) => (
          <PostListItem key={id.toString()} postId={Number(id)} />
        ))}
      </ul>
    </div>
  );
}
