import React from "react";

function DisplayTodo({todos}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((entry) => (
            <tr key={`${entry.firstName} ${entry.lastName}`}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTodo;
