import React, { useContext, useState } from "react";
import API from "../../services/api";
import Err from "./err";
import Menu_Account from "../../components/menu_account";
import { AuthContext } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
const UpdateUser = () => {
  const { auth } = useContext(AuthContext);
  const [inputs, setInput] = useState({
    name: auth?.name ?? "",
    password: auth?.password ?? "",
    email: auth?.email ?? "",
    avatar: auth?.avatar ?? "",
    phone: auth?.phone ?? "",
    address: auth?.address ?? "",
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
    let id = auth.id
    e.preventDefault();
    const token = localStorage.getItem('token')
    if (!checkAvatar()) {
      return;
    }
    API.post(`user/update/${id}`, inputs,
        {
            headers:{
                'Authorization':`Bearer ${token}`,
                'Accept':"applicatin/json"
            }
        }
    )
      .then((res) => {
        alert("Cập nhập thành công");
        console.log(res.data);
        const {password,...updateUser} = res.data.Auth
        localStorage.setItem('auth',JSON.stringify(updateUser))
        localStorage.setItem('token',res.data.token)
      })
      .catch((error) => {
        console.log(error)
        console.log("STATUS:", error.response?.status);
        console.log("LỖI BACKEND:", error.response?.data);
      });
  }
  return (
    <section id="form">
      <Err err={err} />
      <div className="container">
        <div className="row">
          <Menu_Account />

          <div className="col-sm-4">
            <div className="signup-form">
              <h2>Update User!</h2>
              <form onSubmit={submit} encType="multipart/form-data">
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  placeholder="Name"
                  onChange={handeInput}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  placeholder="Email Address"
                  onChange={handeInput}
                  readOnly
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handeInput}
                  
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  onChange={handeInput}
                  value={inputs.phone}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handeInput}
                  value={inputs.address}
                  required
                />
                <input
                  type="file"
                  name="avatar"
                  placeholder="Avatar"
                  onChange={handeInput}
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
