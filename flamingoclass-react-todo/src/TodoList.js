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
function TodoList() {
        return(
            <ul>
            {todoList.map((todo) => (
              <li style = {{listStyleType: "none"}} key = {todo.id}>{todo.title}</li>
            ))}
          </ul>
        )
}

export default TodoList;