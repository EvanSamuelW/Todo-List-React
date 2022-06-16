import React from "react";
import "font-awesome/css/font-awesome.min.css";

const Todos = ({ todos, handleToggle, handleRemove, handleUpdate }) => {
  const handleClick = (id) => {
    handleToggle(id);
  };

  const handleDelete = (id) => {
    handleRemove(id);
  };

  const handleEdit = (id) => {
    handleUpdate(id);
  };
  return (
    <div>
      <ul className="item">
        {todos.map((item, index) => (
          <li key={index} className="mt-2 list-item">
            <span id={item.id} className={item.done ? "done list" : "list"}>
              {" "}
              {item.task}
            </span>
            <div>
              <button
                className="button is-danger mr-2 is-small"
                onClick={() => handleDelete(item.id)}
              >
                <span class="icon">
                  <i class="fa fa-trash-o"></i>
                </span>
              </button>
              <button
                className="button is-success mr-2 is-small"
                onClick={() => handleEdit(item.id)}
              >
                <span class="icon">
                  <i class="fa far fa-edit"></i>
                </span>
              </button>
              <button
                className="button is-primary mr-2 is-small"
                onClick={() => handleClick(item.id)}
              >
                <span class="icon">
                  <i class="fa fa-check"></i>
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
