import React from "react";

function TodoListItem(props) {
    const listItemStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };
    const todoStyle = {
        fontWeight: "bold",
        padding:9,

    };
    const removeButton = {
        color: "red"
    }
    return (
      <li style={listItemStyle}>
       <span style={todoStyle}>{props.todo.title}</span>
        <button style = {removeButton} onClick= {() => props.onRemoveTodo(props.todo.id)}>Remove</button>
      </li>
    );
  }
  
  export default TodoListItem;
  