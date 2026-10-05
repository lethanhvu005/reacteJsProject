import React from "react";

const Comment = (props) => {
  let { comment } = props;
  function renderComment() {
    return comment.map((item) => {
      console.log(item)
      return (
        <li className={item.id_comment === 0 ? "media":"media second-media"} key={item.id}>
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
            <a className="btn btn-primary" href="">
              <i className="fa fa-reply"></i>Replay
            </a>
          </div>
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
