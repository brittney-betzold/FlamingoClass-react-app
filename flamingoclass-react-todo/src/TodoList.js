import React from "react";
import TodoListItem from "./TodoListItem";


function TodoList({ todoList, onRemoveTodo }) {
  const uniqueKeys = new Set();

  return (
    <ul>
      {todoList.map((todo) => {
        if (uniqueKeys.has(todo.id)) {
          console.error(`Duplicate key found: ${todo.id}`);
        } else {
          uniqueKeys.add(todo.id);
        }

        return <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />;
      })}
    </ul>
  );
}

export default TodoList;
