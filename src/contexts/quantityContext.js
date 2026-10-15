import React, { createContext, use, useContext, useState } from "react";
export const QuantityContext = createContext();
const QuantityProvider = ({ children }) => {
  const [quantityPrd, setQuantityPrd] = useState(() => {
    try {
      let cartQty = JSON.parse(localStorage.getItem("cart"));
      return Object.keys(cartQty).length ?? 0;
    } catch (error) {
      return null;
    }
  });
  return (
    <QuantityContext.Provider value={{ quantityPrd, setQuantityPrd }}>
      {children}
    </QuantityContext.Provider>
  );
};

export default QuantityProvider;
