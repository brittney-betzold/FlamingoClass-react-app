import React from "react";
import TodoListItem from "./TodoListItem";
import {useSemiPersistentState} from "./App";

function TodoList({ todoList }) {
  const listStyle = {
    textAlign: "center", // Center-align the items within the TodoList
  };

  return (
    <ul style={listStyle}>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
