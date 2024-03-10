import React from "react";

const Filt = ({ changeView }) => {
  return (
    <div className="my-4">
      <label htmlFor="filter-todos" className="form-label">
        Filter
      </label>
      <select
        onChange={changeView}
        name="filter-todos"
        id="filter-todos"
        className="form-select"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default Filt;
