import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import { PulseLoader } from "react-spinners";
function App() {
  const [users, setUsers] = useState([]);
  const [usersSelected, setUsersSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(true);
  useEffect(() => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const get = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => setUsers(res.data));
  };
  const deleteUsers = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => get());
  };
  const select = (user) => {
    setUsersSelected(user);
  };

  const deselect = () => setUsersSelected(null);
  return loading ? (
    <div className="loader">
      <PulseLoader
        className="la"
        color={"#FF6F91"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="App">
      <button
        className="button-user"
        onClick={() => {
          deselect();
          setVisibility(true);
        }}
      >
        <i className="fa-solid fa-users "></i> Users
      </button>
      <UsersForm
        id={visibility ? "form-flex" : "form-none"}
        get={get}
        usersSelected={usersSelected}
        deselect={deselect}
        select={select}
        setVisibility={setVisibility}
        visibility={visibility}
      />
      <UsersList users={users} select={select} deleteUsers={deleteUsers} />
    </div>
  );
}

export default App;
