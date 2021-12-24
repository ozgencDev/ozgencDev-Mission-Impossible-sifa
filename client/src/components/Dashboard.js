import React, {useState} from "react";
import UsersList from "./UsersList";
import UserCreateForm from "./UserCreateForm";

function Dashboard() {
    const [users, setUsers] = useState([]);

    const createUser = user => {
        setUsers([...users, user]);
      };

    const updateUser = (userId) => {
        console.log("todo updated");
    }

    const deleteUser = id => {
        console.log("todo removed");
    };

  return (
    <div>
      <UserCreateForm createUser={createUser} updateUser={updateUser} deleteUser={deleteUser} />
      <UsersList users={users} />
    </div>
  );
}

export default Dashboard;
