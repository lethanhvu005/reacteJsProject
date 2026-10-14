import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Menu_Account from "../../components/menu_account";
import { Link, NavLink } from "react-router-dom";

const MyProduct = () => {
  const [inputs, setInput] = useState([]);
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
        // if (res.data.response === "success") {
        //   alert("hiển thị thành công");
        // }
        setInput(Object.values(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function hanndleDelete(id) {
    API.get(`user/product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "applicatin/json",
      },
    })
      .then((res) => {
        alert("Xóa thành công");
        setInput(Object.values(res.data.data));
      })
      .catch((error) => {
        alert("Xóa thất bại");
        console.log("URL:", error.config?.url);
        console.log("Status:", error.response?.status);
        console.log("Chi tiết:", error.response?.data);
      });
  }
  return (
    <section>
      <div className="container">
        <div className="row">
          <Menu_Account />
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
                  {inputs.map((item) => {
                    let image = JSON.parse(item.image || []);
                    return (
                      <tr>
                        <td className="cart_product">
                          <NavLink href="">
                           
                            {<img
                              style={{ width: "100px", height: "70px" }}
                              src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${image[0]}`}
                              alt=""
                            />}
                          </NavLink>
                        </td>
                        <td className="cart_description">
                          <h4>
                            <NavLink href="">{item.name}</NavLink>
                          </h4>
                        </td>
                        <td className="cart_price">
                          <p>{item.price}$</p>
                        </td>

                        <td className="cart_total">
                          <NavLink to={`/user/product/update/${item.id}`}>
                            edit
                          </NavLink>
                          <br></br>
                          <button onClick={() => hanndleDelete(item.id)}>
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <NavLink to="/user/product/add">Add Product</NavLink>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProduct;
