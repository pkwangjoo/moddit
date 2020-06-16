import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user";
import UserItem from "./UserItem";
const UserList = ({ user: { users, loading }, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    !loading && (
      <Fragment>
        <div class="ui items">
          {users.map((user) => {
            return <UserItem key={user._id} user={user} />;
          })}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(UserList);
