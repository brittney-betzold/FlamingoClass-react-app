import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  const uniqueKeys = new Set();
  
  if (todoList.length === 0) {
    return <p>No todos available. Add some todos!</p>;
  }
  
  return (
    <ul>
      {todoList.map((todo) => {
        if (!todo.title) {
          // If todo title is empty or undefined, skip rendering it
          return null;
        }

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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
