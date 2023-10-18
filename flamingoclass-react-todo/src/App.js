import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import './App.css';

function App() {
const [todoList, setTodoList] = useState([]);

const addTodo = (newTodo) => {
  setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
}

  return (
    <div className = "App">
      <div className = "box">
      <h1>Todo List</h1>
      <TodoList todoList = {todoList} />
      <AddTodoForm onAddTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
