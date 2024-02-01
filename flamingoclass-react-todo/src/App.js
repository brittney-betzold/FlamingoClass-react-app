import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import './components/App.css';

const API_URL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

function App() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleAddTodo = async (newTodo) => {
        try {
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
        const fetchDataAndInitialize = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                    },
                };

                const response = await fetch(API_URL, options);

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
            } catch (error) {
                console.error(error);
                // setIsLoading(false);
            }
        };

        fetchDataAndInitialize();
    }, []);

    // Render loading state
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Render when data is available
    return (
        <Router>
            <Routes>
                <Route path="/" element={
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
                } />
                <Route path="/new" element={
                    <div>
                        <h1> New todo List</h1>
                    </div>
                }
                />
            </Routes>
        </Router>
    );
}

export default App;