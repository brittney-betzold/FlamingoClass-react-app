import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import './App.css';

async function fetchData(setTodoList, setIsLoading) {
  const savedTodoListJSON = localStorage.getItem("savedTodoList");

  if (savedTodoListJSON) {
    // If there is saved data in local storage, use that data
    const savedTodoList = JSON.parse(savedTodoListJSON);
    setTodoList(savedTodoList);
    setIsLoading(false);
    return savedTodoList;
  }

  // If no data in local storage, fetch data from API
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
  };

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const todos = data.records.map((record) => ({
      title: record.fields.title,
      id: record.id,
    }));

    setTodoList(todos);
    setIsLoading(false);
    console.log("API Response", data);

    // Save the fetched data to local storage
    localStorage.setItem("savedTodoList", JSON.stringify(data.records));

    // Return the records array
    return data.records;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addTodoToAirtable(newTodo) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
    body: JSON.stringify({
      fields: {
        title: newTodo.title,
      },
    }),
  };

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error adding todo:", errorResponse);
      throw new Error(`Error adding todo: ${response.status}`);
    }

    const addedTodo = await response.json();
    return addedTodo;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error; // Rethrow the error for further handling
  }
}



function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      try {
        const result = await fetchData(setTodoList, setIsLoading);
        setTodoList(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchDataAndInitialize();
  }, []);

  useEffect(() => {
    // Save the updated todoList to local storage whenever it changes
    const todoListJSON = JSON.stringify(todoList);
    localStorage.setItem("savedTodoList", todoListJSON);
  }, [todoList]);

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };
  
  const handleAddTodo = async (newTodo) => {
    try {
      // Optimistically update UI
      setTodoList((prevTodoList) => [...prevTodoList, { id: 'tempId', title: newTodo.title }]);
  
      // Add the new todo to Airtable
      const addedTodo = await addTodoToAirtable(newTodo);
  
      // Replace the temporary ID with the actual ID from the server
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === 'tempId' ? { id: addedTodo.id, title: addedTodo.fields.title } : todo
        )
      );
    } catch (error) {
      console.error("Error adding todo:", error);
  
      // Rollback: Remove the todo from the UI
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== 'tempId'));
    }
  };
  

  // Render loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render when data is available
  return (
    <>
      <div className="App">
        <div className="box">
          <h1>Todo List</h1>
          {todoList.length === 0 ? (
            <p>No todos available. Add some todos!</p>
          ) : (
            <TodoList
              className="todoList"
              todoList={todoList}
              onRemoveTodo={removeTodo}
            />
          )}
          <AddTodoForm onAddTodo={handleAddTodo} />
        </div>
      </div>
    </>
  );
}

export default App;
