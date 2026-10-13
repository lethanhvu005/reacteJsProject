import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Err from "../User/err";
import Menu_Account from "../../components/menu_account";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [inputs, setInput] = useState({
    category: "",
    brand: "",
    name: "",
    price: 0,
    status: 1,
    sale: "",
    detail: "",
    company: "",
    image: "",
    id_user: "",
  });
  let listErr = {};
  let { id } = useParams();
  console.log(id);
  const [brands, setBrand] = useState([]);
  const [categorys, setCategory] = useState([]);
  const [fileImg, setFileImg] = useState([]);
  const [err, setErr] = useState({});
  const [fileImgOld, setFileImgOld] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  let token = localStorage.getItem("token");
  let nav = useNavigate();
  function handleChange(e) {
    let name = e.target.name;
    if (e.target.type === "file") {
      let files = Array.from(e.target.files);
      setFileImg(files);
    } else {
      let value = e.target.value;
      setInput((state) => ({ ...state, [name]: value }));
    }
  }
  function handleCheckBox(e) {
    let value = e.target.value;
    if (e.target.checked) {
      setCheckBox((state) => [...state, value]);
    } else {
      setCheckBox((state) => state.filter((item) => item !== value));
    }
  }
  useEffect(() => {
    API.get("category-brand").then((res) => {
      setBrand(res.data.brand);
      setCategory(res.data.category);
    });
  }, []);
  useEffect(() => {
    API.get(`user/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }).then((res) => {
      console.log(res.data.data);
      let product = res.data.data;
      console.log(product.image);
      setInput({
        category: String(product?.id_category ?? ""),
        brand: String(product?.id_brand ?? ""),
        name: String(product?.name ?? ""),
        price: product?.price ?? 0,
        status: product?.status ?? "",
        sale: product?.sale ?? "",
        detail: String(product?.detail ?? ""),
        company: String(product?.company_profile ?? ""),
        id_user: product?.id_user ?? "",
      });
      setFileImgOld(product?.image ?? []);
    });
  }, []);
  function checkImage() {
    const typeAvatar = ["image/jpeg", "image/png"];
    let totalImg = fileImgOld.length + fileImg.length - checkBox.length;
    if (totalImg > 3) {
      listErr.image = "Chỉ nhận tối đa 3 file";
      setErr(listErr);
      return false;
    }
    for (let file of fileImg) {
      if (!typeAvatar.includes(file.type)) {
        listErr.image = `${file} kiểu file k không hợp lệ`;
        setErr(listErr);
        return false;
      }
      if (file.size > 1024 * 1024) {
        listErr.image = `${file} kiểu file quá dung lượng cho phép`;
        setErr(listErr);
        return false;
      }
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (!checkImage()) {
      return;
    }
    const data = new FormData();
    data.append("category", inputs.category);
    data.append("brand", inputs.brand);
    data.append("name", inputs.name);
    data.append("price", inputs.price);
    data.append("status", inputs.status);
    data.append("sale", inputs.sale);
    data.append("detail", inputs.detail);
    data.append("company", inputs.company);
    fileImg.forEach((file) => {
      data.append("file[]", file);
    });
    checkBox.forEach((file) => {
      data.append("avatarCheckBox[]", file);
    });
    API.post(`user/product/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("Edit thành công");
        nav("/user/my-product");
      })
      .catch((error) => {
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
            <h2 className="title text-center">Add Product</h2>
            <Err err={err} />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label>Name *</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  className="form-control"
                  name="category"
                  value={inputs.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categorys.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Brand *</label>
                <select
                  className="form-control"
                  name="brand"
                  value={inputs.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn thương hiệu --</option>
                  {brands.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.brand}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  min="0"
                  value={inputs.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image *</label>
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                {fileImgOld.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <img
                        style={{ width: "100px", height: "70px" }}
                        src={`http://localhost/laravel8/public/upload/product/${inputs.id_user}/${item}`}
                        alt=""
                      />
                      <input
                        name="checkBox"
                        value={item}
                        onChange={handleCheckBox}
                        type="checkbox"
                        style={{
                          marginTop: "10px",
                          transform: "scale(1.5)",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  className="form-control"
                  name="status"
                  value={inputs.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn trạng thái --</option>
                  <option value="1">New</option>
                  <option value="0">Sale</option>
                </select>
              </div>

              {inputs.status === "0" ? (
                <div className="form-group">
                  <label>Sale</label>
                  <input
                    className="form-control"
                    type="number"
                    name="sale"
                    min="0"
                    max="100"
                    value={inputs.sale}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="form-group">
                <label>Detail *</label>
                <textarea
                  className="form-control"
                  name="detail"
                  value={inputs.detail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  className="form-control"
                  type="text"
                  name="company"
                  value={inputs.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
