import React, { useEffect, useState } from 'react';

import AddPostModal from '../modals/AddPostModal';
import PostListItem from '../partials/PostList/PostListItem';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { browseAllPosts } from '../slices/posts';

export default function PostList() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const posts = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(browseAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-sky-200 p-6 rounded-l shadow-md">
      <div className="flex flex-row justify-between align-middle py-2 mb-2">
        <h1 className="text-3xl font-bold mb-3">Posts</h1>
        {/* TODO: Add post */}
        <button
          className="bg-yellow-700 text-white rounded-md shadow-md shadow-yellow-900 px-4 hover:bg-yellow-600 hover:cursor-pointer active:bg-yellow-800 transition-all"
          onClick={() => setShowModal(true)}>
          Add
        </button>
        <AddPostModal showModal={showModal} setShowModal={setShowModal}></AddPostModal>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.ids.map((id) => (
          <PostListItem key={id.toString()} postId={Number(id)} />
        ))}
      </ul>
    </div>
  );
}
