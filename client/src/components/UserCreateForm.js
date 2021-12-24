import React, {useState} from "react";
import "../styling/TodoForm.css";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function UserCreateForm({createUser}) {
    const [user_name, setUser_name] = useState("");
    const [user_surname, setUser_surname] = useState("");
    const [email, setUserEmail] = useState("");

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const handleSubmit = e => {
        e.preventDefault();
        if(!(emailRegex.test(email))){
          toast.error('Email format is wrong or empty!', {position: toast.POSITION.TOP_CENTER});
        }
        else if(user_name !== null && user_name === ""){
          toast.error('Name can not be empty', {position: toast.POSITION.TOP_CENTER});
        }
        else if(user_surname !== null && user_surname === ""){
          toast.error('Surname can not be empty', {position: toast.POSITION.TOP_CENTER});
        }
        else{
          createUser({user_name, user_surname, email});
        }
        
    }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" name="user_name" placeholder="User name" onChange={(e)=>setUser_name(e.target.value)}/>
            <input type="text" name="user_surname" placeholder="User surname" onChange={(e)=>setUser_surname(e.target.value)}/>
            <input type="text" name="user_email" placeholder="User email" onChange={(e)=>setUserEmail(e.target.value)}/>
            <button type="submit">Submit</button>
    </form>
    </div>
    
  );
}

export default UserCreateForm;
