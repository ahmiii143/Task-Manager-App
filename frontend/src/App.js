import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import {
  getAllToDo,
  addToDo,
  updateTodo,
  deleteToDo,
} from "./utils/HandleApis";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { logout } = useAuth0();

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Today Tasks</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add a Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
        <div className="button">
          {isAuthenticated ? (
            <button
              className="btn"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()} className="btn">
              Log In
            </button>
          )}
        </div>

        <div className="welcomeText">
          {isAuthenticated && (
            <div>
              {" "}
              <h2>Welcome Back </h2>
              <h3>{user.name}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
