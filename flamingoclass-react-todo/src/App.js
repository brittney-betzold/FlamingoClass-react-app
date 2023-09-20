import React from "react";
const todoList = [
  { id: 1, title: "dishes" },
  {
    id: 2,
    title: "school assignment",
  },
  {
    id: 3,
    title: "work",
  },
];
function App() {
  return (
    <div style={{ textAlign: "center"}}>
      <header>
        <h1>Todo List</h1>
      </header>
      <ul>
    {todoList.map((todo) => (
      <li style = {{listStyleType: "none"}} key = {todo.id}>{todo.title}</li>
    ))}
  </ul>
</div>
  );
    };

export default App;
