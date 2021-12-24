import React, {useState} from "react";
import "../styling/TodoForm.css";

function TodoForm({addTodo}) {
    const [user_name, setUser_name] = useState("");
    const [user_surname, setUser_surname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userType, setUserType] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        addTodo({user_name, user_surname, userEmail, userType})
    }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" name="user_name" placeholder="User name" onChange={(e)=>setUser_name(e.target.value)}/>
            <input type="text" name="user_surname" placeholder="User surname" onChange={(e)=>setUser_surname(e.target.value)}/>
            <input type="text" name="user_email" placeholder="User email" onChange={(e)=>setUserEmail(e.target.value)}/>
            <input type="text" name="user_type" placeholder="User type" onChange={(e)=>setUserType(e.target.value)}/>
            <button type="submit">Submit</button>

    </form>
  );
}

export default TodoForm;
