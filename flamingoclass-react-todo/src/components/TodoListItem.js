import React from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo: { id, title }, onRemoveTodo }) {
  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "10px",
    marginLeft: "180px",
  };
  const todoStyle = {
    fontWeight: "bold",
    padding: 9,
  };
  const removeButton = {
    color: "red",
    marginLeft: "auto",
    marginRight: "180px",
  };
  return (
    <li className={style.ListItem} style={listItemStyle}>
      {title && <span style={todoStyle}>{title}</span>}
      <button style={removeButton} onClick={() => onRemoveTodo(id)}>
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string, // Mark title as optional
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
