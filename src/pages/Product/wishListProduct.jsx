import React, { useContext, useEffect, useState } from "react";
import API from "../../services/api";
import { NavLink } from "react-router-dom";

import Menu_Left from "../../components/menu_left";
import { QuantityContext } from "../../contexts/quantityContext";
const WishListProduct = () => {
  const { setQuantityWishList, addTo } = useContext(QuantityContext);
  const [wishList, setWishlist] = useState([]);
  let wishListLocal = JSON.parse(localStorage.getItem("wishlist"));
  console.log("wishlist", wishListLocal);
  useEffect(() => {
    API.get("product")
      .then((res) => {
        alert("done");
        console.log("prd", res.data.data);
        let wishListNew = res.data.data.filter((item) => {
          return Object.keys(wishListLocal).some((id) => {
            return Number(item.id) === Number(id);
          });
        });
        console.log("wl", wishListNew);
        setWishlist(wishListNew);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log("wll", wishList);
  function removeWishList(id) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
    delete wishlist[id];
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setQuantityWishList(Object.keys(wishlist).length);
    setWishlist((element) =>
      element.filter((item) => Number(item.id) !== Number(id)),
    );
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
                {wishList.map((item) => {
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
                                onClick={() => addTo(item.id, "cart")}
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
                              <button
                                onClick={() => addTo(item.id, "wishlist")}
                                className="fa fa-plus-square"
                              >
                                {" "}
                                Add to wishlist
                              </button>
                            </li>
                            <li>
                              <button onClick={() => removeWishList(item.id)}>
                                <i className="fa fa-plus-square">
                                  remove wishlist
                                </i>
                              </button>
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

export default WishListProduct;
