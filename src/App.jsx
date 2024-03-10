import { useEffect, useState } from "react";
import InputComponent from "./components/InputComponent";
import TodoDisplay from "./components/TodoDisplay";
import Filt from "./components/Filt";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [activeTodo, setActiveTodo] = useState(null);

  const [filterTodos, setFilterTodos] = useState([]);
  const [view, setView] = useState("all");

  useEffect(() => {
    let items;
    switch (view) {
      case "completed":
        items = todos.filter((i) => i.completed);
        break;
      case "pending":
        items = todos.filter((i) => !i.completed);
        break;

      default:
        items = todos;
        break;
    }
    setFilterTodos(items);
  }, [view, todos]);

  const upsertTodoData = (todo) => {
    let newData = {
      id: todo.id || todos.length + 1,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };

    // if (!todo.id) {
    //   newData.completed = false;
    // }

    const index = todos.findIndex((item) => item.id === newData.id);

    if (index > -1) {
      const payload = { ...todos[index], ...newData };
      setTodos((prev) => {
        prev[index] = payload;
        return prev;
      });
    } else {
      setTodos([...todos, newData]);
    }
  };

  const deleteTodoItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  console.log(todos);

  function changeView(e) {
    setView(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="heading">My todo</h1>
      <InputComponent
        upsertTodoData={upsertTodoData}
        setActiveTodo={setActiveTodo}
        todo={activeTodo}
      />
      <Filt changeView={changeView} className="my-4" />
      <div className="row gap-4">
        {filterTodos.map((item, index) => {
          return (
            <div key={index} className="col-4">
              <TodoDisplay
                item={item}
                index={index}
                deleteTodoItem={deleteTodoItem}
                upsertTodoData={upsertTodoData}
                setActiveTodo={setActiveTodo}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
