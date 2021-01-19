import React from "react";
import * as users from "../modules/users";

const Users: React.FC<{
  loading: boolean;
  users: Array<users.User> | null;
}> = ({ loading, users }) => {
  return (
    <section>
      <h1>사용자 목록</h1>
      {loading && "로딩 중..."}
      {!loading && users && (
        <ul>
          {users.map((user: users.User) => (
            <li key={user.id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Users;
