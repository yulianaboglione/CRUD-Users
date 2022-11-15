import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UsersForm = ({
  get,
  usersSelected,
  deselect,
  select,
  setVisibility,
  visibility,
}) => {
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
      setVisibility(true);
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
      <div className="container" id={visibility ? "form-flex2" : "form-none2"}>
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
            <input
              {...register("first_name")}
              type="text"
              id="first_name"
              placeholder="first name"
            />
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
            <input
              {...register("last_name")}
              type="text"
              id="last_name"
              placeholder="last name"
            />
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
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="email@address.com"
            />
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
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="password"
            />
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
          <button
            style={{ color: "#FF6F91" }}
            onClick={() => {
              showAlert();
              setVisibility(false);
            }}
            className="btn"
          >
            <i className="fa-solid fa-floppy-disk"></i> Submit
          </button>{" "}
          {usersSelected && (
            <button
              style={{ color: "#FF6F91" }}
              type="button"
              onClick={() => select(null)}
            >
              <i className="fa-solid fa-square-xmark"></i> Cancel
            </button>
          )}
          <button
            onClick={() => {
              setVisibility(false);
            }}
            type="button"
            className="close"
            style={{ color: "#FF6F91" }}
          >
            <i className="fa-solid fa-xmark icon"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
