import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPage: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <PostViewerContainer />
    </div>
  );
};

export default PostPage;
