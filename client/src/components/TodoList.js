import React, {useState} from "react";
import DisplayTodo from "./DisplayTodo";
import TodoForm from "./TodoForm";

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        //We set the new todos with the old ones here.
        setTodos([...todos, todo]);
      };

    const updateTodo = (todoId) => {
        console.log("todo updated");
    }

    const removeTodo = id => {
        console.log("todo removed");
    };

  return (
    <div>
      <TodoForm addTodo={addTodo} updateTodo={updateTodo} removeTodo={removeTodo}></TodoForm>
        <DisplayTodo todos={todos}></DisplayTodo>
    </div>
  );
}

export default TodoList;
