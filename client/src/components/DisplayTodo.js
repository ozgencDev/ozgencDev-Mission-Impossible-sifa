import React from "react";
import {Table} from "reactstrap";

function DisplayTodo({todos}) {
    console.log(todos);
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
    {todos.map((todo, key) => (
      <tr>
        <td>{key+1}</td>
        <td>{todo.user_name}</td>
        <td>{todo.user_surname}</td>
        <td>{todo.userEmail}</td>
      </tr>
    ))}
  </tbody>
</Table>
  );
}

export default DisplayTodo;
