import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import PostActionButtons from '../../components/post/PostActionButtons';
import PostViewer from '../../components/post/PostViewer';
import { RootState } from '../../modules';
import { readPost, unloadPost } from '../../modules/post';

const PostViewerContainer: React.FC<
  RouteComponentProps<{ postId: string }>
> = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(
    ({ post, loading }: RootState) => ({
      post: post.post,
      error: post.postError,
      loading: loading['post/READ_POST'],
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons />}
    />
  );
};

export default withRouter(PostViewerContainer);
