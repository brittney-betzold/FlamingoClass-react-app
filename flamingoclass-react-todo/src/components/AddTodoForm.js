import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (title.trim() === "") {
      setError("Title cannot be empty");
      return;
    }
    onAddTodo(title);
    setTitle("");
    setError("");
  };

  return (
    <form className="add-todo-form" onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={title}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button className="add" type="submit">
        Add
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
