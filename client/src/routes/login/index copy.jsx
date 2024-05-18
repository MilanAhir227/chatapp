import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { SERVER_URL } from "../../constant";
import {useNavigate} from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          axios
            .post(`${SERVER_URL}/user/login`, values)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userId", res.data.data._id);
              navigate("/chat")
            })
            .catch((erre) => console.log(erre));
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <label htmlFor="password">First Name</label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Jane"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
