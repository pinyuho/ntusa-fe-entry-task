import React, { useMemo } from 'react';

import { useAppSelector } from '../reduxHooks';

interface ParamsType {
  postId: number;
}

export default function Post({ postId }: ParamsType) {
  const posts = useAppSelector((state) => state.posts);

  const post = useMemo(() => posts.entities[postId], [posts, postId]);

  return (
    <li>
      <h2>{post?.title}</h2>
      <h3>{post?.author}</h3>
      <h3>{post?.time.format('DD MM YYYY')}</h3>
      <span>{post?.content}</span>
    </li>
  );
}
