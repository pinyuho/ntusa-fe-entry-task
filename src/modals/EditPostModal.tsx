import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';

import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { editPost } from '../slices/posts';

interface ParamsType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
}

export default function EditPostModal({ showModal, setShowModal, postId }: ParamsType) {
  const posts = useAppSelector((state) => state.posts);
  const post = useMemo(() => posts.entities[Number(postId)], [postId, posts.entities]);
  const [title, setTitle] = useState(post?.title ?? '');
  const [author, setAuthor] = useState(post?.author ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await dispatch(
      editPost({
        title: String(title),
        author: String(author),
        content: String(content),
        postId: Number(postId),
      }),
    );
    setShowModal(false);
  };

  // Reset edit modal default content after cancelling
  const resetEdit = async () => {
    setTitle(String(post?.title));
    setAuthor(String(post?.author));
    setContent(String(post?.content));
  };

  return (
    <Modal isOpen={showModal} ariaHideApp={false}>
      <div className="flex flex-col rounded-md">
        <div className="flex items-stretch ">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
            Edit the Post
          </h2>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            onClick={() => setShowModal(false)}>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6 space-y-6 rounded-b border-t border-gray-200 dark:border-gray-600">
          <form>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </label>
            <br />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>
            <br />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 h-80 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </label>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="defaultModal"
            type="button"
            onClick={() => {
              setShowModal(false);
              resetEdit();
            }}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
            Cancel
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
            className="bg-cyan-600 text-white rounded-md shadow-md shadow-neutral-600 px-4 hover:bg-cyan-500 hover:cursor-pointer active:bg-cyan-700 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
