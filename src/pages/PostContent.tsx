import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isPost } from '../functions/typeGuards';
import EditPostModal from '../modals/EditPostModal';
import CommentList from '../partials/PostContent/CommentList';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { readPostAndComments } from '../slices/posts';

export default function PostContent() {
  const { postId } = useParams();
  const posts = useAppSelector((state) => state.posts);
  const post = useMemo(() => posts.entities[Number(postId)], [postId, posts.entities]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // just to show you that we can await a dispatch
    const refetch = async () => {
      await dispatch(readPostAndComments({ postId: Number(postId) }));
    };
    refetch();
  }, [dispatch, postId]);

  // type guard
  if (isPost(post))
    // typeof post === 'Post' here
    return (
      <div className="flex flex-col bg-sky-200 p-6 rounded-l shadow-md">
        <div className="flex flex-row justify-between align-middle py-2 mb-2">
          <h2 className="text-3xl mb-2 font-bold">{post.title}</h2>
          <button
            className="bg-sky-100 text-slate-700 rounded-md shadow-md px-4 font-medium hover:bg-sky-300 hover:cursor-pointer active:bg-sky-400 transition-all"
            onClick={() => setShowModal(true)}>
            Edit
          </button>
          <EditPostModal
            showModal={showModal}
            setShowModal={setShowModal}
            postId={Number(postId)}></EditPostModal>
        </div>
        <div>
          <span className="mr-1">{post.author}</span>
          <span className="text-sm">{moment(post.time).format('MMM DD, YYYY')}</span>
        </div>
        <span>{post.content}</span>
        <CommentList post={post} />
      </div>
    );
  else
    return (
      <div className="bg-sky-200 p-6 rounded-l shadow-md">
        <h2 className="text-xl font-bold">404 Not Found</h2>
      </div>
    );
}
