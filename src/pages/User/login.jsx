import React, { useContext, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import Err from "./err";
import { AuthContext } from "../../contexts/authContext";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [input, setInput] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  function handeInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function submit(e) {
    e.preventDefault();
    const data = {
      email: input.email,
      password: input.password,
      level: 0,
    };
    API.post("login", data)
      .then((res) => {
        console.log(res.data);

        if (res.data.response === "error") {
          setErr({ login: res.data.errors.errors });
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("auth", JSON.stringify(res.data.Auth));
        setAuth(res.data.Auth);
        alert("Login done");
        navigate("/");
      })
      .catch((error) => {
        console.log("Lỗi", error.response?.data);
        console.log("Status", error.response?.status);
      });
  }
  return (
    <section id="form">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
              <Err err={err} />
              <h2>Login to your account</h2>
              <form onSubmit={submit}>
                <input
                  type="text"
                  name="email"
                  onChange={handeInput}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={handeInput}
                  placeholder="Password"
                  required
                />
                <button type="submit" className="btn btn-default">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
