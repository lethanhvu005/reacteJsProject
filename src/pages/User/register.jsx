import React, { useState } from "react";
import Err from "./err";
import API from "../../services/api";

const Register = () => {
  const [inputs, setInput] = useState({
    name: "",
    password: "",
    email: "",
    avatar: "",
    phone: "",
    address: "",
    level: 0,
  });
  const [err, setErr] = useState({});
  const [fileAvt, setFile] = useState([]);
  let listErr = {};
  function handeInput(e) {
    let name = e.target.name;
    if (e.target.type === "file") {
      let files = Array.from(e.target.files);
      setFile(files);
      const reader = new FileReader();
      reader.onload = () => {
        setInput((state) => ({ ...state, avatar: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setInput((state) => ({ ...state, [name]: e.target.value }));
    }
  }
  function checkAvatar() {
    const typeAvatar = ["image/jpeg", "image/png"];
    for (let file of fileAvt) {
      if (!typeAvatar.includes(file.type)) {
        listErr.avatar = `${file.name}kiểu file không hợp lệ`;
        setErr(listErr);
        return false;
      }
      if (file.size > 1024 * 1024) {
        listErr.avatar = `${file.name}quá kích thước cho phép`;
        setErr(listErr);
        return false;
      }
    }
    setErr({});
    return true;
  }
  function submit(e) {
    e.preventDefault();
    if (!checkAvatar()) {
      return;
    }
    API.post("register", inputs)
      .then((res) => {
        alert("Đăng ksy thành công");
        console.log(res.data);
      })
      .catch((error) => {
        console.log("STATUS:", error.response?.status);
        console.log("LỖI BACKEND:", error.response?.data);
      });
  }

  return (
    <section id="form">
      <Err err={err} />
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="signup-form">
              <h2>New User Signup!</h2>
              <form onSubmit={submit} encType="multipart/form-data">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handeInput}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handeInput}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handeInput}
                  required
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  onChange={handeInput}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handeInput}
                  required
                />
                <input
                  type="file"
                  name="avatar"
                  placeholder="Avatar"
                  onChange={handeInput}
                  required
                  multiple
                />
                <input
                  type="level"
                  name="level"
                  placeholder="level"
                  defaultValue={0}
                  onChange={handeInput}
                  required
                />
                <button type="submit" className="btn btn-default">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
