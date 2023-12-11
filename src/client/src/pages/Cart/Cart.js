import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
    const spreadCartItems = () => {
        const n = 2;
        return [...Array(n)].map((e, i) => (
            <div className="cart-table-row">
                <div className="cart-table-row-item">
                    <div className="row-item-photo"></div>
                    <div className="row-item-name">Book</div>
                </div>
                <div className="cart-table-row-item">30.000 VND</div>
                <div className="cart-table-row-item">
                    <div className="cart-button-group">
                        <Link to="/books/id" className="view-button">
                            View product
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
