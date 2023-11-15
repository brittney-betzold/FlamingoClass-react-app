import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import './App.css';


function App() {
  const [todoList , setTodoList] = useState([]);
  const [isLoading, setIsLoading]  = useState(true);

  useEffect(() => {
    // Retrieve the serialized todoList from local storage
    const savedTodoListJSON = localStorage.getItem("savedTodoList");

    // Convert the JSON string back to an object
    const savedTodoList = JSON.parse(savedTodoListJSON);

    if (savedTodoList) {
      // If data exists in local storage, set it as the initial state
      setTodoList(savedTodoList);
    }

    const newPromise = new Promise((resolve, reject) => {
      const fetchData = () => {
          const success = true;
            if(success) {
              resolve({data : {todoList: savedTodoList || [] } })
            }else{
              reject("Failed to fetch data")
            }
        };
        setTimeout(fetchData, 2000)
    });

    newPromise
      .then((result) => {
        setTodoList(result.data.todoList)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })

  }, []);

  const removeTodo=(id) =>{
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList)
  }

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }

  // Save todoList to local storage whenever it changes
  useEffect(() => {
    if(!isLoading){
      console.log("false")
    }
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
        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
        <AddTodoForm onAddTodo={addTodo} />
      </div>
    </div>
  </>
  );
  
}

export default App;

