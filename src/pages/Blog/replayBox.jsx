import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { NavLink, useParams } from "react-router-dom";
import Err from "../User/err";
import API from "../../services/api";

const ReplayBox = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  console.log(auth)
  const [err, setErr] = useState({});
  const [input, setInput] = useState({ message: "" });
  function handeInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    setInput((state) => ({ ...state, [name]: value }));
  }
  function postComment() {
    let listErr = {};
    if (!auth) {
      listErr.auth = "Vui lòng đăng nhập trước khi comment";
      setErr(listErr);
      return;
    }
    if (input.message.trim() === "") {
      listErr.comment = "Vui lòng nhập bình luận";
      setErr(listErr);
      return;
    }
    const token = localStorage.getItem("token");
    const data = {
      id_blog: id,
      id_user: auth.id,
      name_user: auth.name,
      comment: input.message,
      image_user: auth.avatar,
      id_comment: 0,
    };
    API.post(`blog/comment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setErr({});
        setInput({ message: "" });
        alert("post comment done");
      })
      .catch((error) => {
        console.log(error.response?.status);
        console.log(error.response?.data);
      });
  }

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>

          <div className="text-area">
            <div className="blank-arrow">
              <label>{auth?.name}</label>
            </div>
            <span>*</span>
            <textarea
              name="message"
              onChange={handeInput}
              value={input.message}
              rows="11"
              required
            ></textarea>
            <button className="btn btn-primary" onClick={postComment}>
              post comment
            </button>
            <Err err={err} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplayBox;
