import React, { useEffect } from "react";
import { connect } from "react-redux";
import Users from "../components/Users";
import { RootState } from "../modules";
import * as users from "../modules/users";

const UsersContainer: React.FC<{
  getUsers: () => void;
  users: Array<users.User> | null;
  loading: boolean;
}> = ({ getUsers, users, loading }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return <Users users={users} loading={loading} />;
};

const getUsers = () => users.getUsers(1);

export default connect(
  (state: RootState) => ({
    users: state.users,
    loading: state.loading[users.GET_USERS],
  }),
  {
    getUsers,
  }
)(UsersContainer);
