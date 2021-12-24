import React from "react";
import {Table} from "reactstrap";

function UsersList({users}) {
    console.log(users);
  return (
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, key) => (
      <tr>
        <td>{key+1}</td>
        <td>{user.user_name}</td>
        <td>{user.user_surname}</td>
        <td>{user.email}</td>
      </tr>
    ))}
  </tbody>
</Table>
  );
}

export default UsersList;
