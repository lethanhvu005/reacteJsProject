import React, { useContext, useEffect, useState } from "react";
import Menu_Left from "../components/menu_left";
import API from "../services/api";
import { NavLink } from "react-router-dom";
import { QuantityContext } from "../contexts/quantityContext";

const Home = () => {
  const [inputs, setInput] = useState([]);
  const {setQuantityPrd} = useContext(QuantityContext)
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
          console.log(res.data);
        }
        setInput(Object.values(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function addToCart(id) {
    API.get(`product/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        let cartOld = JSON.parse(localStorage.getItem("cart")) || {};
        let cart = res.data.data;
        let id = cart.id
        if (cartOld[id]) {
          cartOld[id] = cartOld[id] + 1;
          localStorage.setItem("cart", JSON.stringify(cartOld));
        } else {
          cartOld[id]= 1;
          localStorage.setItem("cart", JSON.stringify(cartOld));
          let cartQty =  JSON.parse(localStorage.getItem('cart'))
          setQuantityPrd(Object.keys(cartQty).length)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section id="slider">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div
              id="slider-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#slider-carousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#slider-carousel" data-slide-to="1"></li>
                <li data-target="#slider-carousel" data-slide-to="2"></li>
              </ol>

              <div className="carousel-inner">
                <div className="item active">
                  <div className="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>Free E-Commerce Template</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                    <button type="button" className="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <img
                      src="images/home/girl1.jpg"
                      className="girl img-responsive"
                      alt=""
                    />
                    <img
                      src="images/home/pricing.png"
                      className="pricing"
                      alt=""
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>100% Responsive Design</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                    <button type="button" className="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <img
                      src="images/home/girl2.jpg"
                      className="girl img-responsive"
                      alt=""
                    />
                    <img
                      src="images/home/pricing.png"
                      className="pricing"
                      alt=""
                    />
                  </div>
                </div>

                <div className="item">
                  <div className="col-sm-6">
                    <h1>
                      <span>E</span>-SHOPPER
                    </h1>
                    <h2>Free Ecommerce Template</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                    <button type="button" className="btn btn-default get">
                      Get it now
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <img
                      src="images/home/girl3.jpg"
                      className="girl img-responsive"
                      alt=""
                    />
                    <img
                      src="images/home/pricing.png"
                      className="pricing"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <a
                href="#slider-carousel"
                className="left control-carousel hidden-xs"
                data-slide="prev"
              >
                <i className="fa fa-angle-left"></i>
              </a>
              <a
                href="#slider-carousel"
                className="right control-carousel hidden-xs"
                data-slide="next"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
            <Menu_Left />
            <div className="col-sm-9 padding-right">
              <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {inputs.map((item) => {
                  let image = JSON.parse(item.image || []);
                  return (
                    <div className="col-sm-4" key={item.id}>
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img
                              src={`http://localhost/laravel8/public/upload/product/${item.id_user}/${image[0]}`}
                              alt=""
                            />
                            <h2>${item.price}</h2>
                            <p>{item.name}</p>
                            <a href="#" className="btn btn-default add-to-cart">
                              <i className="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                          <div className="product-overlay">
                            <div className="overlay-content">
                              <h2>${item.price}</h2>
                              <p>{item.name}</p>
                              <br></br>
                              <button
                                onClick={() => addToCart(item.id)}
                                className="btn btn-default add-to-cart"
                              >
                                <i className="fa fa-shopping-cart"></i>Add to
                                cart
                              </button>
                              <NavLink
                                className="btn btn-default add-to-cart"
                                style={{ marginLeft: "10px" }}
                                to={`product/detail/${item.id}`}
                              >
                                <i
                                  className="fa fa-arrow-right"
                                  aria-hidden="true"
                                ></i>
                                Read More
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div className="choose">
                          <ul className="nav nav-pills nav-justified">
                            <li>
                              <a href="#">
                                <i className="fa fa-plus-square"></i>Add to
                                wishlist
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-plus-square"></i>Add to
                                compare
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
