import React, { use, useEffect, useState } from "react";
import API from "../../services/api";
import Menu_Account from "../../components/menu_account";
import { useNavigate } from "react-router-dom";
import Err from "../User/err";

const AddProduct = () => {
  let nav = useNavigate();
  const [inputs, setInput] = useState({
    category: "",
    brand: "",
    name: "",
    price: "",
    status: 1,
    sale: "",
    detail: "",
    company: "",
    image: "",
  });
  let listErr = {};
  const [brands, setBrand] = useState([]);
  const [categorys, setCategory] = useState([]);
  const [fileImg, setFileImg] = useState([]);
  const [err, setErr] = useState({});
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
  useEffect(() => {
    API.get("category-brand").then((res) => {
      console.log(res.data);
      setBrand(res.data.brand);
      setCategory(res.data.category);
    });
  }, []);
  function checkImage() {
    const typeAvatar = ["image/jpeg", "image/png"];
    if (fileImg.length > 3) {
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
    API.post("user/product/add", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        alert("Thêm sản phẩn thành công");
        nav("/user/my-product");
      })
      .catch((error) => {
        alert("Thêm sản phẩnphẩnthaats bại");

        console.log(error);
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
                <label>Image *</label>
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  required
                />
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

export default AddProduct;
