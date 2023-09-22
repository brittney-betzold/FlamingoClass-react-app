import React, { useState } from "react";

function AddTodoForm(props) {

const [todoTitle, setTodoTitle] = useState("");

    const handleAddTodo = (event) => {
        event.preventDefault();
          console.log("Todo Title:", todoTitle)
          props.onAddTodo(todoTitle)
          setTodoTitle("")
      
    };
    // clears value of text input
    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
    }

        return(
            <form onSubmit = {handleAddTodo}>
                <label htmlFor="todoTitle">Title</label>
                <input id = "todoTitle" 
                     type = "text" 
                     name = "title" 
                     value = {todoTitle}
                     onChange= {handleTitleChange}></input>
                <button type = "submit">Add</button>
            </form>
        )

}

export default AddTodoForm;