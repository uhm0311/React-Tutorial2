import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { AuthResponse } from '../../lib/api/auth';
import { RootState } from '../../modules';
import { writePost } from '../../modules/post';

const WriteActionButtonsContainer: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(
    ({ write, post }: RootState) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: post.post,
      postError: post.postError,
    }),
  );

  const onPublish = useCallback(() => {
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  }, [dispatch, title, body, tags]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    if (post) {
      const { _id, user }: { _id: string; user: AuthResponse } = post;
      history.push(`/@${user.username}/${_id}`);
    } else if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
    ></WriteActionButtons>
  );
};

export default withRouter(WriteActionButtonsContainer);
