import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, removeItem, clearCart } = useCart();

    const handleRemoveItem = (productId) => {
        removeItem(productId);
    };

    const handleClearCart = () => {
        clearCart();
      };

    const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="CartPage">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p className="EmptyCart">No hay productos en el carrito</p>
                    <Link to="/" className="GoToProductsButton">Ir a productos</Link>
                </div>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="CartItem">
                            <p>{item.product.name}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Precio: ${item.product.price}</p>
                            <p>Subtotal: ${item.product.price * item.quantity}</p>
                            <button onClick={() => handleRemoveItem(item.product.id)}>X</button>
                        </div>
                    ))}
                    <div className="Subtotal">Total: ${subtotal}</div>
                    <button onClick={handleClearCart} className="ClearCartButton">Limpiar carrito</button>
                    <Link to="/checkout" className='CheckoutButton'>Checkout</Link>   
                </div>
            )}
        </div>
    );
};



export default CartPage;


