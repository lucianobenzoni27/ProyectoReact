import React, { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { db } from "../../firebase"; 
import { collection, addDoc, writeBatch, getDocs, query, where } from "firebase/firestore";
import { useCart } from "../../context/CartContext"; 

const Checkout = () => {
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const { cartItems, clearCart, getTotalItems } = useCart();

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cartItems.map((prod) => prod.product.id);

            const productsRef = collection(db, "products");
            const productsAddedFromFirestore = await getDocs(query(productsRef, where("id", "in", ids)));
            const { docs } = productsAddedFromFirestore;

            docs.forEach((doc) => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cartItems.find((prod) => prod.product.id === doc.id);
                const prodQuantity = productAddedToCart.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, "orders");
                const objOrder = {
                    buyer: {
                        name,
                        phone,
                        email,
                    },
                    items: cartItems.map(item => ({
                        product: item.product,
                        quantity: item.quantity
                    })),
                    total: getTotalItems(),
                    date: new Date(),
                };

                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error("Hay productos que están fuera de stock");
            }
        } catch (error) {
            console.log("Error al crear la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Se está generando su orden...</h1>;
    }

    if (orderId) {
        return <h1>El ID de su orden es: {orderId}</h1>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
};

export default Checkout;

