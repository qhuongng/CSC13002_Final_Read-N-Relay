import { useEffect, useState } from "react";
import "./Cart.css";
import * as API from "../../utils/API.js"
import { Link } from "react-router-dom";


const Cart = () => {
    const [carts, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch CurrentUserId
                const user = await API.getCurrentUser();

                // Fetch Cart using userId
                const cartBooks = await API.getUserCart(user[0].userId);
                setCart(cartBooks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const spreadCartItems = () => {
        return carts.map((cart, index) => (
            <div className="cart-table-row"key={index}>
                <div className="cart-table-row-item">
                    <div className="row-item-photo">{/*<img src={cart.image} alt={cart.name} className="row-item-image" />*/}</div>
                    <div className="row-item-name">{cart.name}</div>
                </div>
                <div className="cart-table-row-item">{cart.price} VND</div>
                <div className="cart-table-row-item">
                    <div className="cart-button-group">
                        <Link to="/books/id" className="view-book-button">
                            View book info
                        </Link>
                        <div className="remove-button">Remove</div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="cart-container">
            <div className="cart-table">
                <div className="cart-table-header">
                    <div className="cart-table-header-item">Book</div>
                    <div className="cart-table-header-item">Price</div>
                    <div className="cart-table-header-item">
                        <div className="blank"></div>
                    </div>
                </div>
                <div className="cart-table-rows">{spreadCartItems()}</div>
            </div>
            <div className="total-table">
                <div className="table-title">Cart total</div>
                <div className="table-item">
                    <div className="table-item-title">Subtotal</div>
                    <div className="table-item-value">60.000VND</div>
                </div>
                <div className="table-item">
                    <div className="table-item-title">Shipping</div>
                    <div className="table-item-value">10.000VND</div>
                </div>
                <div className="table-item">
                    <div className="table-item-title">Total</div>
                    <div className="table-item-value">70.000VND</div>
                </div>
                <Link to="/checkout" className="checkout-button">
                    Proceed to checkout
                </Link>
            </div>
        </div>
    );
};

export default Cart;
