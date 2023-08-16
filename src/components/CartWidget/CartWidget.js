import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';


const CartWidget = () => {
  const { getTotalItems } = useCart();

  return (
    <Link to="/cart">
      <div className="logo_carrito_nav">
        <h2>🛒</h2>
        <span className='cart-item-count'>{getTotalItems()}</span>
      </div>
    </Link>
  );
};

export default CartWidget;
