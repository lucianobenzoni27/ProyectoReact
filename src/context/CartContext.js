import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantity) => {
    setCartItems(prevItems => [
      ...prevItems,
      { product, quantity }
    ]);
  };

  const removeItem = productId => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = productId => {
    return cartItems.some(item => item.product.id === productId);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clearCart, isInCart, getTotalItems}} 
    >
      {children}
    </CartContext.Provider>
  );
};
