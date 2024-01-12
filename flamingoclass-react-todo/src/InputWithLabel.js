import React from 'react'


export default function InputWithLabel({ children, todoTitle, handleTitleChange }) {
    const inputRef = React.useRef();
React.useEffect(() => {
    inputRef.current.focus();
})
    return (
      <>
        <label htmlFor="todoTitle">{children}:</label>
        <input
          type="text"
          value={todoTitle}
          onChange={handleTitleChange}
          placeholder="Add a new todo"
          ref = {inputRef}
          id= "todoTitle"
        />
      </>
    );
  }
  