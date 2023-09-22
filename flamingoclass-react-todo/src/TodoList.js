import React from "react";
import TodoListItem from "./TodoListItem";
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
            {todoList.map((todo ) => (
                <TodoListItem key = {todo.id} todo = {todo} />
            ))}
          </ul>
        )
}

export default TodoList;