import React from "react";
import CounterContainer from "./containers/CounterContainer";
import PostContainer from "./containers/PostContainer";
import UsersContainer from "./containers/UsersContainer";

const App: React.FC = () => {
  return (
    <div>
      <CounterContainer />
      <PostContainer />
      <hr />
      <UsersContainer />
    </div>
  );
};

export default App;
