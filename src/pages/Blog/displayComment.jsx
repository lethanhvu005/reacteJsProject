import React, { useContext, useState } from "react";
import { CommentContext } from "../../contexts/commentContext";
import ReplayBox from "./postComment";

const Comment = () => {
  let { comment } = useContext(CommentContext) ;
  const [replyId,setReplyId] = useState(null)
  function renderComment() {
    return comment.map((item) => {
      if (Number(item.id_comment) !== 0) return null;
      return (
        <li className="media" key={item.id}>
          <a className="pull-left" href="#">
            <img
              className="media-object" style={{ height: "100px" ,width:"100px"}}
              src={`http://localhost/laravel8/public/upload/user/avatar/${item.image_user}`}
              alt=""
            />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li>
                <i className="fa fa-user"></i>
                {item.name_user}
              </li>
              <li>
                <i className="fa fa-clock-o"></i>{" "}
                {item.created_at.slice(11, 16)}
              </li>
              <li>
                <i className="fa fa-calendar"></i>
                {item.created_at.slice(0, 10)}
              </li>
            </ul>
            <p>{item.comment}</p>
            <button className="btn btn-primary" onClick={()=>setReplyId(item.id)} >
              <i className="fa fa-reply"></i>Replay
            </button>
            {replyId === item.id &&(
              <ReplayBox
              parent_id ={item.id}
              onClose={()=>setReplyId(null)} 
              />
            )}
          </div>
          <ul className="media-list">
            {comment.map((child) => {
              if (Number(child.id_comment) !== Number(item.id)) return null;

              return (
                <li className="media second-media" key={child.id}>
                  <div className="pull-left">
                    <img
                      className="media-object"
                      style={{ height: "100px", width: "100px" }}
                      src={`http://localhost/laravel8/public/upload/user/avatar/${child.image_user}`}
                      alt={child.name_user}
                    />
                  </div>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li>
                        <i className="fa fa-user"></i> {child.name_user}
                      </li>
                      <li>
                        <i className="fa fa-clock-o"></i>{" "}
                        {child.created_at?.slice(11, 16)}
                      </li>
                      <li>
                        <i className="fa fa-calendar"></i>{" "}
                        {child.created_at?.slice(0, 10)}
                      </li>
                    </ul>
                    <p>{child.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  }
  return (
    <div className="response-area">
      <h2>RESPONSES</h2>
      <ul className="media-list">{renderComment()}</ul>
    </div>
  );
};

export default Comment;
