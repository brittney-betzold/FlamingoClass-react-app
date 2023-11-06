import React from "react";

function TodoListItem ({todo}) {
    return <li style = {{listStyleType: "none"}}>
        {todo.title}</li>

}
export default TodoListItem;