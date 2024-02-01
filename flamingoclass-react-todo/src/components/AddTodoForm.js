import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoTitle.trim() !== "") {
      onAddTodo({ id: Date.now(), title: todoTitle });
      setTodoTitle("");
    }
  };

  return (
    <div className="add-todo-form">
       <InputWithLabel
             todoTitle={todoTitle}
             handleTitleChange={handleTitleChange}>
             Title
        </InputWithLabel>

         <button className = "add" onClick={handleAddTodo}>Add</button>
    </div>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
}

export default AddTodoForm;
