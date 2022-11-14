import React, { useState } from "react";
import Swal from "sweetalert2";

const UsersList = ({ users, select, deleteUsers }) => {
  return (
    <div>
      <ul className="ul">
        {users.map((user) => (
          <li className="list" key={user.id}>
            <p>
              <b>
                {user.first_name} {user.last_name}
              </b>
            </p>
            <p>{user.birthday}</p>
            <p>{user.email}</p>
            <button onClick={() => select(user)}>
              <i
                style={{ color: "#FF6F91" }}
                className="fa-regular fa-pen-to-square fa-lg"
              ></i>
            </button>{" "}
            <button onClick={() => deleteUsers(user.id)}>
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-trash-can fa-lg"
              ></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
