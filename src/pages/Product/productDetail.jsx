import React, { useContext, useEffect, useState } from "react";
import Menu_Left from "../../components/menu_left";
import API from "../../services/api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProductDetail = () => {
  const { auth } = useContext(AuthContext);
  console.log(`auth`, auth);
  const [prdDetail, setPrdDetail] = useState([]);
  const { id } = useParams();
  const [brands, setBrand] = useState([]);
  const [image, setImage] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    API.get("category-brand").then((res) => {
      console.log(res.data);
      setBrand(res.data.brand);
    });
  }, []);
  useEffect(() => {
    API.get(`product/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setPrdDetail(res.data.data);
        let listImage = JSON.parse(res.data.data.image);
        console.log("image", listImage);
        setImage(listImage);
        setSelectedImage(listImage[0] ?? "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <Menu_Left />

          <div className="col-sm-9 padding-right">
            <div className="product-details">
              <div className="col-sm-5">
                <div className="view-product">
                  <img
                    src={`http://localhost/laravel8/public/upload/product/${prdDetail.id_user}/${selectedImage}`}
                    alt={prdDetail.name}
                  />
                </div>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "12px" }}
                >
                  {image.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedImage(item)}>
                      <img
                        src={`http://localhost/laravel8/public/upload/product/${prdDetail.id_user}/${item}`}
                        alt=""
                        style={{
                          width: "70px",
                          height: "70px",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-sm-7">
                <div className="product-information">
                  <h2>{prdDetail.name}</h2>
                  <p>Web ID: {prdDetail.id}</p>
                  <img src="images/product-details/rating.png" alt="" />
                  <span>
                    <span>US ${prdDetail.price}</span>
                    <label>Quantity:</label>
                    <input type="text" value="3" />
                    <button type="button" className="btn btn-fefault cart">
                      <i className="fa fa-shopping-cart"></i>
                      Add to cart
                    </button>
                  </span>
                  <p>
                    <b>Made with in:</b> {prdDetail.company_profile}
                  </p>
                  <p>
                    <b>Condition:</b> {prdDetail.id === "1" ? "New" : "Sale"}
                  </p>
                  <p>
                    <b>Brand:</b>
                    {brands.map((item) => {
                      if (Number(item.id) === Number(prdDetail.id_brand)) {
                        return `${item.brand}`;
                      }
                    })}
                  </p>
                  <a href="">
                    <img
                      src="images/product-details/share.png"
                      className="share img-responsive"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
