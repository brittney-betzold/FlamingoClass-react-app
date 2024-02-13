import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import './App.css';

const API_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        // Call the function to fetch and sort data based on the new sort order
        fetchDataAndInitialize(newSortOrder);
    };
    const fetchDataAndInitialize = async (sortOrder = 'asc') => {
      try {
          const options = {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
              },
          };
  
          const response = await fetch(`${API_URL}?sort[0][field]=title&sort[0][direction]=${sortOrder}`, options);
  
          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }
  
          const data = await response.json();
  
          if (!Array.isArray(data.records) || data.records.length === 0) {
              console.error('No data or invalid data format received');
              setIsLoading(false);
              return;
          }
  
          // Filter out records with empty titles
          const filteredRecords = data.records.filter(record => record.fields.title);
  
          // Sort and process the filtered records
          const sortedTodos = filteredRecords.sort((objectA, objectB) => {
              const titleA = (objectA.fields.title || '').toUpperCase();
              const titleB = (objectB.fields.title || '').toUpperCase();
  
              if (titleA < titleB) return sortOrder === 'asc' ? -1 : 1;
              if (titleA > titleB) return sortOrder === 'asc' ? 1 : -1;
              return 0;
          });
  
          const todos = sortedTodos.map((record) => ({
              title: record.fields.title,
              id: record.id,
          }));
  
          setTodoList(todos);
          setIsLoading(false);
      } catch (error) {
          console.error(error);
          setIsLoading(false);
      }
  };
  

    const addTodo = async (title) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                },
                body: JSON.stringify({
                    fields: {
                        title: title,
                    },
                }),
            };

            const response = await fetch(API_URL, options);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error adding todo:", errorResponse);
                throw new Error(`Error adding todo: ${response.status}`);
            }

            const addedTodo = await response.json();

            // using the Airtable response data add new todo to state...
            setTodoList((prevTodoList) => [...prevTodoList, { title: addedTodo.fields.title, id: addedTodo.id }]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const removeTodo = async (id) => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                },
            };

            const response = await fetch(`${API_URL}/${id}`, options);

            const deletedTodo = await response.json();

            // using Airtable response data remove the todo from state
            setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== deletedTodo.id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    useEffect(() => {
        fetchDataAndInitialize(sortOrder);  
    }, [sortOrder]);  // Re-fetch when sort order changes

    // Render loading state
    if (isLoading) {
        return <p>Loading...</p>;
    }
    // Render when data is available
return (
  <Router>
      <div>
          <nav>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/new">New Page</Link>
                  </li>
              </ul>
          </nav>

          <Routes>
              <Route path="/" element={
                  <div className="App">
                      <div className="box">
                          <h1>{process.env.REACT_APP_TABLE_NAME}</h1>
                          {todoList.length === 0 ? (
                              <p>No todos available. Add some todos!</p>
                          ) : (
                              <TodoList
                                  className="todoList"
                                  todoList={todoList}
                                  onRemoveTodo={removeTodo}
                              />
                          )}
                          <AddTodoForm onAddTodo={addTodo} />
                          <button className="toggle" onClick={toggleSortOrder}>Toggle Sort Order</button>
                      </div>
                  </div>
              } />
              <Route path="/new" element={
                  <div>
                      <h1>{process.env.REACT_APP_TABLE_NAME}</h1>

                      <p>Enter the details for your new todo below:</p>
                      <AddTodoForm onAddTodo={addTodo} />
                  </div>
              } />
          </Routes>
      </div>
  </Router>
);

};

export default App;
