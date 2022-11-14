import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UsersForm = ({ get, usersSelected, deselect, select }) => {
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
  };
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (usersSelected) {
      reset(usersSelected);
    } else {
      reset(initialValues);
    }
  }, [usersSelected]);

  const submit = (data) => {
    if (usersSelected) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${usersSelected.id}/`,
          data
        )
        .then(() => {
          get();
          deselect();
        })
        .catch((error) => console.log(error.response?.data));
    } else {
      axios
        .post(`https://users-crud1.herokuapp.com/users/`, data)
        .then(() => {
          get();
          reset(initialValues);
        })

        .catch((error) => console.log(error.response?.data));
    }
  };

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "the operation was completed successfully",
      icon: "success",
    });
  };
  return (
    <div>
      <fieldset>
        <legend>
          <i
            style={{ color: "#FF6F91" }}
            className="fa-solid fa-users fa-2x"
          ></i>{" "}
          <span className="x">{usersSelected ? "Edit " : " Create User"}</span>
        </legend>

        <form className="form" onSubmit={handleSubmit(submit)}>
          <div className="input-container">
            <label htmlFor="first_name">
              {" "}
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-user"
              ></i>{" "}
              Name
            </label>
            <input {...register("first_name")} type="text" id="first_name" />
          </div>

          <div className="input-container">
            <label htmlFor="last_name">
              {" "}
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-file-signature"
              ></i>{" "}
              Last Name
            </label>
            <input {...register("last_name")} type="text" id="last_name" />
          </div>

          <div className="input-container">
            <label htmlFor="email">
              {" "}
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-envelope"
              ></i>{" "}
              Email
            </label>
            <input {...register("email")} type="text" id="email" />
          </div>

          <div className="input-container">
            <label htmlFor="password">
              {" "}
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-lock"
              ></i>{" "}
              Password
            </label>
            <input {...register("password")} type="password" id="password" />
          </div>
          <div className="input-container">
            <label htmlFor="birthday">
              {" "}
              <i
                style={{ color: "#FF6F91" }}
                className="fa-solid fa-cake-candles"
              ></i>{" "}
              Birthday
            </label>
            <input {...register("birthday")} type="date" id="birthday" />
          </div>
          <button onClick={showAlert} className="btn">
            <i
              style={{ color: "#FF6F91" }}
              className="fa-solid fa-floppy-disk"
            ></i>{" "}
            Submit
          </button>
          {usersSelected && (
            <button
              style={{ color: "#FF6F91" }}
              type="button"
              onClick={() => select(null)}
            >
              <i className="fa-solid fa-square-xmark"></i> Cancel
            </button>
          )}
        </form>
      </fieldset>
    </div>
  );
};

export default UsersForm;
