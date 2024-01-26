import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";


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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Adjust based on the actual data type
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};



export default TodoList;
