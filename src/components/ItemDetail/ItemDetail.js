import React from 'react';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const { addItem, isInCart } = useCart();
  
    const handleAddToCart = quantity => {
      if (!isInCart(id)) {
        addItem({ id, name, price }, quantity);
        console.log('Producto agregado al carrito:', { id, name, price, quantity });
      }
    };

    return (
        <article className='CardItem'>
            <header className='HeaderItem'>
                <h2 className='ItemHeader'>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className='ItemImg' />
            </picture>
            <section>
                <p className='Info'>
                    Categoria: {category}
                </p>
                <p className='Info'>
                    Descripcion: {description}
                </p>
                <p className='Info'>
                    Precio: ${price}
                </p>
            </section>
            <footer className="ItemFooter">
                <ItemCount initial={1} stock={stock} onAdd={handleAddToCart} />
            </footer>
        </article>
    );
};

export default ItemDetail;
