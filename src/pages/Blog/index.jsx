import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Menu_Left from "../../components/menu_left";
import { NavLink } from "react-router-dom";
const IndexBlog = () => {
  const [dataBlog, setDataBlog] = useState([]);
  useEffect(() => {
    API.get("blog")
      .then((res) => {
        setDataBlog(res.data.blog.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function renderBlog() {
    if (dataBlog.length === 0) {
      return <div>Không có sản phẩm nào</div>;
    } else {
      return dataBlog.map((blog) => {
        return (
          <div className="single-blog-post" key={blog.id}>
            <h3>{blog.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user"></i> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o"></i>{" "}
                  {blog.created_at.slice(11, 16)} pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i>{" "}
                  {blog.created_at.slice(0, 10)}
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
            <NavLink to={`/blog/detail/${blog.id}`}>
              <img
                src={`http://localhost/laravel8/public/upload/Blog/image/${blog.image}`}
                alt=""
              />
            </NavLink>
            <p>{blog.description}</p>
            <NavLink to={`/blog/detail/${blog.id}`} className="btn btn-primary">Read More</NavLink>
          </div>
        );
      });
    }
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <Menu_Left />
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
            </div>
            {renderBlog()}
            <div className="pagination-area">
              <ul className="pagination">
                <li>
                  <NavLink className="active">1</NavLink>
                </li>
                <li>
                  <NavLink to="">2</NavLink>
                </li>
                <li>
                  <NavLink to="">3</NavLink>
                </li>
                <li>
                  <NavLink to="">
                    <i className="fa fa-angle-double-right"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexBlog;
