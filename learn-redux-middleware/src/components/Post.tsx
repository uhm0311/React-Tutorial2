import React from "react";
import * as post from "../modules/post";

const Post: React.FC<{
  loading: boolean;
  post: post.Post | null;
}> = ({ loading, post }) => {
  return (
    <section>
      <h1>포스트</h1>
      {loading && "로딩 중..."}
      {!loading && post && (
        <div>
          <h3>{post.title}</h3>
          <h3>{post.body}</h3>
        </div>
      )}
    </section>
  );
};

export default Post;
