import React, { useState } from 'react';

import AddCommentModal from '../../modals/AddCommentModal';
import { Post } from '../../slices/posts';
import CommentListItem from './CommentListItem';

interface ParamsType {
  post: Post;
}

export default function CommentList({ post }: ParamsType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex space-x-4 ">
        <h1 className="text-xl mb-3 h-full">Comments</h1>
        <button
          className="h-8 bg-sky-100 text-slate-700 rounded-md shadow-md px-4 font-medium hover:bg-neutral-400 hover:cursor-pointer active:bg-neutral-600 transition-all"
          onClick={() => setShowModal(true)}>
          Say smth...
        </button>
        <AddCommentModal
          showModal={showModal}
          setShowModal={setShowModal}
          postId={post.id}></AddCommentModal>
      </div>
      <ul className="flex flex-col gap-3">
        {post.commentIds.map((id) => (
          <CommentListItem key={id} commentId={id} />
        ))}
      </ul>
    </div>
  );
}
