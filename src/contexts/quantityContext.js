import React, { createContext, use, useContext, useState } from "react";
import API from "../services/api";
export const QuantityContext = createContext();
const QuantityProvider = ({ children }) => {
  const [quantityPrd, setQuantityPrd] = useState(() => {
    try {
      let cartQty = JSON.parse(localStorage.getItem("cart"));
      return Object.keys(cartQty).length ?? 0;
    } catch (error) {
      return 0;
    }
  });
  const [quantityWishlist, setQuantityWishList] = useState(() => {
    try {
      let wishListQty = JSON.parse(localStorage.getItem("wishlist"));
      return Object.keys(wishListQty).length ?? 0;
    } catch (error) {
      return 0;
    }
  })
  function addTo(id, type) {
    let token = localStorage.getItem("token");
    API.get(`product/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        let itemOld = {};
        if (type === "cart") {
          itemOld = JSON.parse(localStorage.getItem("cart")) || {};
        }
        if (type === "wishlist") {
          itemOld = JSON.parse(localStorage.getItem("wishlist")) || {};
        }
        let item = res.data.data;
        let id = item.id;
        if (itemOld[id]) {
          itemOld[id] = itemOld[id] + 1;
          if (type === "cart") {
            localStorage.setItem("cart", JSON.stringify(itemOld));
          }
          if (type === "wishlist") {
            localStorage.setItem("wishlist", JSON.stringify(itemOld));
          }
        } else {
          itemOld[id] = 1;
          if (type === "cart") {
            localStorage.setItem("cart", JSON.stringify(itemOld));
            let cartQty = JSON.parse(localStorage.getItem("cart"));
            setQuantityPrd(Object.keys(cartQty).length);
          }
          if (type === "wishlist") {
            localStorage.setItem("wishlist", JSON.stringify(itemOld));
            let wishListQty = JSON.parse(localStorage.getItem("wishlist"));
            setQuantityWishList(Object.keys(wishListQty).length);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })}
  
  return (
    <QuantityContext.Provider value={{ quantityPrd, setQuantityPrd ,quantityWishlist,setQuantityWishList,addTo}}>
      {children}
    </QuantityContext.Provider>
  );
};

export default QuantityProvider;
