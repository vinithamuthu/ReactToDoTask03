import React, { useEffect, useState } from "react";

const InputComponent = ({ todo, upsertTodoData, setActiveTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("pending");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message


  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed ? "completed" : "pending");
    } else {
      setErrorMessage(""); // Clear any previous error message on edit
    }
  }, [todo]);

  const handleSubmit = () => {
    if (!title) {
      setErrorMessage("Please enter a title for your todo.");
      return; // Exit the function if title is empty
    }

    upsertTodoData({
      title,
      description,
      id: todo ? todo.id : null,
      completed: completed === "completed" ? true : false,
    });
    setTitle("");
    setDescription("");
    setCompleted("pending");
    setActiveTodo(null);
  };

  return (
    <div className="card" style={{ width: "24rem" }}>
      <div className="card-body">
      {errorMessage && ( // Display error message if present
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title (required)
          </label>
          <input
            className="form-control"
            placeholder="Enter your todo"
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => { setTitle(e.target.value);
              setErrorMessage(""); // Clear error message when user starts typing
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            type="text"
            placeholder="Enter you todo description"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <select
          value={completed}
          onChange={(e) => {
            setCompleted(e.target.value);
          }}
          name="filter-todos"
          id="filter-todos"
          className="form-select mb-3"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
