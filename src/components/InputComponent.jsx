import React, { useEffect, useState } from "react";

const InputComponent = ({ todo, upsertTodoData, setActiveTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("pending");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed ? "completed" : "pending");
    }
  }, [todo]);

  const handleSubmit = () => {
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
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            placeholder="Enter your todo"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
