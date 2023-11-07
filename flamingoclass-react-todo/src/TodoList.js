import React from "react";
import TodoListItem from "./TodoListItem";


function TodoList({ todoList, onRemoveTodo }) {
  const listStyle = {
    textAlign: "left", // Center-align the items within the TodoList
  };

  return (
    <ul style={listStyle}>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
