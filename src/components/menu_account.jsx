import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Menu_Account = () => {
      const { auth} = useContext(AuthContext);
      const id = auth.id
  return (
    <div>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Account</h2>
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <NavLink to={`/user/updateUser/${id}`}>account</NavLink>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <NavLink to={'/user/my-product'}>My product</NavLink>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-9">
        <div className="blog-post-area">
        </div>
      </div>
    </div>
  );
};

export default Menu_Account;
