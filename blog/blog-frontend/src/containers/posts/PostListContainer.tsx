import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState } from '../../modules';
import qs from 'qs';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer: React.FC<
  RouteComponentProps<{ username: string }>
> = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }: RootState) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    const tag = query.tag as string;
    const page = query.page as string;
    const { username } = match.params;

    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search, match.params]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={!!user}
    />
  );
};

export default withRouter(PostListContainer);
