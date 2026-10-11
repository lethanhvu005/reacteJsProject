import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Menu_Account from "../../components/menu_account";
import { NavLink } from "react-router-dom";

const MyProduct = () => {
  const [inputs, setInput] = useState({});
  let token = localStorage.getItem("token");
  useEffect(() => {
    API.get("user/my-product", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "applicatin/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.response === "success") {
          alert("hiển thị thành công");
        }
        setInput(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Menu_Account />
          </div>
          <div className="col-sm-9">
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">image</td>
                    <td className="description">name</td>
                    <td className="price">price</td>

                    <td className="total">action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cart_product">
                      <NavLink href="">
                        <img
                          src={`http://localhost/laravel8/public/upload/product/2/${inputs.image}`}
                          alt=""
                        />
                      </NavLink>
                    </td>
                    <td className="cart_description">
                      <h4>
                        <NavLink href="">{inputs.name}</NavLink>
                      </h4>
                    </td>
                    <td className="cart_price">
                      <p>${inputs.price}</p>
                    </td>

                    <td className="cart_total">
                      <NavLink>edit</NavLink>
                      <NavLink>delete</NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProduct;
