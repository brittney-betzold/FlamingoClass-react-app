import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import './App.css';


function useSemiPersistentState  () {
  const [todoList, setTodoList] = useState([]);
  // Load saved data from local storage
  useEffect(() => {
    // Retrieve the serialized todoList from local storage
    const savedTodoListJSON = localStorage.getItem("savedTodoList");

    // Convert the JSON string back to an object
    const savedTodoList = JSON.parse(savedTodoListJSON);

    if (savedTodoList) {
      // If data exists in local storage, set it as the initial state
      setTodoList(savedTodoList);
    }
  }, []);
  return [todoList, setTodoList];
}
 
function App() {
  const [todoList , setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }

  // Save todoList to local storage whenever it changes
  useEffect(() => {
    // Convert the todoList to a JSON string
    const todoListJSON = JSON.stringify(todoList);

    // Save the serialized todoList to local storage
    localStorage.setItem("savedTodoList", todoListJSON);
  }, [todoList]);

  return (
  <>
    <div className="App">
      <div className="box">
        <h1>Todo List</h1>
        <TodoList todoList={todoList} />
        <AddTodoForm onAddTodo={addTodo} />
      </div>
    </div>
  </>
  );
  
}

export default App;

