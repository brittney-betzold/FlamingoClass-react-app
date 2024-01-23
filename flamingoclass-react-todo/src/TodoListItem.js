import React from "react";
import style from './TodoListItem.module.css';

function TodoListItem(props) {

    const listItemStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: "10px",
      marginLeft:"180px"
    };
    const todoStyle = {
        fontWeight: "bold",
        padding:9,

    };
    const removeButton = {
        color: "red",
        marginLeft:"auto",
        marginRight: "180px"
    }
    return (
      <li className = {style.ListItem} style={listItemStyle}>
       <span style={todoStyle}>{props.todo.title}</span>
        <button style = {removeButton} onClick= {() => props.onRemoveTodo(props.todo.id)}>Remove</button>
      </li>
    );
  }
  
  export default TodoListItem;
  