import React, { useContext, useEffect, useState } from "react";
import API from "../../services/api";
import { QuantityContext } from "../../contexts/quantityContext";

const CartProduct = () => {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  const {setQuantityPrd}=useContext(QuantityContext)
  const [cart, setCarPrd] = useState(
    JSON.parse(localStorage.getItem("cartPrd")) || [],
  );
  console.log(cart);
  useEffect(() => {
    API.post("product/cart", cartLocal)
      .then((res) => {
        console.log("dataCart", res.data.data);
        setCarPrd(res.data.data);
        // alert("done");
      })
      .catch((error) => {
        console.log(error);
        // alert("thất bại");
      });
  }, []);
  let totalAll = cart.reduce((sum, item) => {
    return sum + Number(item.qty) * Number(item.price);
  }, 0);
  function save(cartNew) {
    setCarPrd(cartNew);
    localStorage.setItem("cartPrd", JSON.stringify(cartNew));
    let cartObj = cartNew.reduce((obj, item) => {
      obj[item.id] = item.qty;
      return obj;
    }, {});
    localStorage.setItem("cart", JSON.stringify(cartObj));
     let cartQty =  JSON.parse(localStorage.getItem('cart'))
          setQuantityPrd(Object.keys(cartQty).length)
  }
  function handleUp(id) {
    let cartNew = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          qty: Number(item.qty) + 1,
        };
      }
      return item;
    });
    save(cartNew);
  }
  function handleDown(id) {
    let cartNew = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: Number(item.qty) - 1,
          };
        }
        return item;
      })
      .filter((item) => item.qty > 0);
    save(cartNew);
  }
  function deletePrd(id) {
    let cartNew = cart.filter((item) => item.id !== id);
    save(cartNew);
  }
  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            {/* chỗ hiển thị prd */}

            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  let image = JSON.parse(item.image);
                  return (
                    <tr key={item.id}>
                      <td className="cart_product">
                        <a href="">
                          <img
                            style={{ width: "150px", height: "70px" }}
                            src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${image[0]}`}
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="cart_description">
                        <h4>
                          <a href="">{item.name}</a>
                        </h4>
                        <p>Web ID: {item.id}</p>
                      </td>
                      <td className="cart_price">
                        <p>${item.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <button
                            type="button"
                            className="cart_quantity_down"
                            onClick={() => handleDown(item.id)}
                          >
                            -
                          </button>

                          <input
                            className="cart_quantity_input"
                            type="text"
                            value={item.qty}
                            readOnly
                            size="2"
                          />

                          <button
                            type="button"
                            className="cart_quantity_up"
                            onClick={() => handleUp(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">
                          {Number(item.qty) * Number(item.price)}
                        </p>
                      </td>
                      <td className="cart_delete">
                        <button
                          className="cart_quantity_delete"
                          onClick={() => deletePrd(item.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href="">
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href="">
                  Continue
                </a>
              </div>
            </div>
            {/* CHỖ TÍNH TIỀN */}
            {cart.map((item) => {
              let sumTotal = 0;
              sumTotal = sumTotal + Number(item.qty) * Number(item.price);
              return (
                <div className="col-sm-6">
                  <div className="total_area">
                    <ul>
                      <li>
                        Cart Sub Total <span>${totalAll}</span>
                      </li>
                      <li>
                        Eco Tax <span>Free</span>
                      </li>
                      <li>
                        Shipping Cost <span>Free</span>
                      </li>
                      <li>
                        Total <span>${totalAll}</span>
                      </li>
                    </ul>
                    <a className="btn btn-default update" href="">
                      Update
                    </a>
                    <button className="btn btn-default check_out" href="">
                      Check Out
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CartProduct;
