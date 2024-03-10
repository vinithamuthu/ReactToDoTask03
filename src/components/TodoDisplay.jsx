import { useEffect, useState } from "react";

const TodoDisplay = ({
  item,
  index,
  deleteTodoItem,
  setActiveTodo,
  upsertTodoData,
}) => {
  const [completed, setCompleted] = useState("pending");

  useEffect(() => {
    if (item) {
      setCompleted(item.completed ? "completed" : "pending");
    }
  }, [item]);

  return (
    <div className="card w-full">
      <div key={index} className="card-body text-bg-info">
        <h3>
          <span className="text-primary">{item.title}</span>{" "}
          <span className="caption">#{item.id}</span>
        </h3>
        <p className="text-secondary">{item.description}</p>
        <select
          className="form-select mb-3"
          name="form-select-status"
          id="form-select-status"
          value={completed}
          onChange={(e) => {
            upsertTodoData({
              ...item,
              completed: e.target.value === "completed" ? true : false,
            });
            setCompleted(e.target.value);
          }}
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <div className="mb-3">
          <button
            className="btn btn-sm btn-danger me-3"
            onClick={() => {
              deleteTodoItem(item.id);
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setActiveTodo(item);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDisplay;
