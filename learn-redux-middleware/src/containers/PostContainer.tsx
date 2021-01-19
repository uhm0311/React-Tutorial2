import React, { useEffect } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import { RootState } from "../modules";
import * as post from "../modules/post";

const PostContainer: React.FC<{
  getPost: (id: number) => void;
  post: post.Post | null;
  loading: boolean;
}> = ({ getPost, post, loading }) => {
  useEffect(() => {
    getPost(1);
  }, [getPost]);

  return <Post post={post} loading={loading} />;
};

const getPost = post.getPost;

export default connect(
  (state: RootState) => ({
    loading: state.loading[post.GET_POST],
    post: state.post,
  }),
  {
    getPost,
  }
)(PostContainer);
