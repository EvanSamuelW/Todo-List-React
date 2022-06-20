import React, { useState, useEffect } from "react";
import "./App.css";
import Todos from "./Todos.jsx";
import "bulma/css/bulma.min.css";
import { Helmet } from "react-helmet";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const handleSubmit = (event) => {
    if (todoItem !== "") {
      if (!editTodo) {
        event.preventDefault();
        let copy = [...todos];
        copy = [...copy, { id: Date.now(), task: todoItem, done: false }];
        setTodos(copy);
        setTodoItem("");
      } else {
        event.preventDefault();

        const newData = todos.map((item) => {
          return item.id === editTodo.id
            ? { id: editTodo.id, task: todoItem, done: editTodo.done }
            : item;
        });
        setTodos(newData);
        setEditTodo("");
      }
    }
  };

  useEffect(() => {
    if (editTodo) {
      setTodoItem(editTodo.task);
    } else {
      setTodoItem("");
    }
  }, [setTodoItem, editTodo]);
  const handleChange = (event) => {
    setTodoItem(event.target.value);
  };

  const handleToggle = (id) => {
    let mapped = todos.map((task) => {
      return task.id === Number(id)
        ? { ...task, done: !task.done }
        : { ...task };
    });
    setTodos(mapped);
  };

  const handleDone = (id) => {
    let copy = [...todos];
    Object.keys(copy).forEach((task) => {
      copy[task]["done"] = true;
    });
    setTodos(copy);
  };
  const handleUpdate = (id) => {
    const find = todos.find((item) => item.id === id);
    setEditTodo(find);
  };
  const handleRemove = (id) => {
    let copy = [...todos];
    const filtered = copy.filter((item) => {
      return item.id !== id;
    });
    setTodos(filtered);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>To Do List</title>
      </Helmet>
      <div className="level">
        <div className="level-item">
          <figure>
            <div className="inner">
              <form onSubmit={handleSubmit}>
                <div class="field has-addons">
                  <div class="control">
                    <input
                      class="input"
                      placeholder="Create todo"
                      value={todoItem}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="control">
                    <a class="button is-success" onClick={handleSubmit}>
                      Add
                    </a>
                  </div>
                </div>
              </form>
              <div id="btn">
                <button
                  class="button is-primary is-rounded"
                  onClick={handleDone}
                >
                  Mark All Done
                </button>
                <button
                  class="button is-danger is-rounded"
                  onClick={handleDeleteAll}
                >
                  Remove All
                </button>
              </div>
            </div>
            <Todos
              todos={todos}
              handleToggle={handleToggle}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </figure>
        </div>
      </div>
    </body>
  );
}

export default App;
