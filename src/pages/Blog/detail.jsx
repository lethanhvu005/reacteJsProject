import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import API from "../../services/api";
import Menu_Left from "../../components/menu_left";

const DetailBlog = () => {
  const [detailBlog, setDetailBlog] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    API.get(`blog/detail/${id}`)
      .then((res) => {
        setDetailBlog(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  function renderDetailBlog() {
    if (!detailBlog) {
      return <div>Blog không tồn tại</div>;
    } else {
      return (
        <div className="single-blog-post" key={detailBlog.id}>
          <h3>{detailBlog.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user"></i> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o"></i>{" "}
                {detailBlog.created_at.slice(11, 16)}
              </li>
              <li>
                <i className="fa fa-calendar"></i>{" "}
                {detailBlog.created_at.slice(0, 10)}
              </li>
            </ul>
            <span>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </span>
          </div>
          <NavLink >
            <img
              src={`http://localhost/laravel8/public/upload/Blog/image/${detailBlog.image}`}
              alt=""
            />
          </NavLink>
          <p>{detailBlog.description}</p> <br></br>
          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <NavLink href="#">Pre</NavLink>
              </li>
              <li>
                <NavLink href="#">Next</NavLink>
              </li>
            </ul>
          </div>
          <div className="rating-area">
            <ul className="ratings">
              <li className="rate-this">Rate this item:</li>
              <li>
                <i className="fa fa-star color"></i>
                <i className="fa fa-star color"></i>
                <i className="fa fa-star color"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </li>
              <li className="color">(6 votes)</li>
            </ul>
            <ul className="tag">
              <li>TAG:</li>
              <li>
                <NavLink className="color" >
                  Pink <span>/</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="color" >
                  T-Shirt <span>/</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="color" >
                  Girls
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="container">
      <div className="row">
        <Menu_Left />
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
          </div>
          {renderDetailBlog()}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
