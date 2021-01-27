import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer: React.FC<
  RouteComponentProps<{ username: string }>
> = ({ location, match }) => {
  const { lastPage, posts, loading } = useSelector(
    ({ posts, loading }: RootState) => ({
      lastPage: posts.lastPage,
      posts: posts.posts,
      loading: loading['posts/LIST_POSTS'],
    }),
  );

  if (!posts || loading) {
    return null;
  }

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const tag = query.tag as string;
  const page = parseInt(query.page as string, 10) || 1;
  const { username } = match.params;

  return (
    <Pagination tag={tag} username={username} page={page} lastPage={lastPage} />
  );
};

export default withRouter(PaginationContainer);
