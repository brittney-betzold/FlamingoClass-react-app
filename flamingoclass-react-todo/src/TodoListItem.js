import React from "react";

function TodoListItem (props) {
    return <li style = {{listStyleType: "none"}}>
        {props.todo.title}</li>

}
export default TodoListItem;