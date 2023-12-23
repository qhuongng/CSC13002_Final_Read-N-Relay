import "./Checkout.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js"
import { useState, useEffect } from "react";


const Checkout = () => {
    const [carts, setCart] = useState([])
    const [orders, setOrders] = useState(null)
    const [TPrice, setTPrice] = useState(null)

    const fetchData = async () => {
        // Fetch CurrentUserId
        const user = await API.getCurrentUser();

        // Fetch Orders using userId
        const orderP = await API.getUserOrdersProfile(user[0].userId);
        setOrders(orderP);

        // Fetch Cart using userId
        const cartBooks = await API.getUserCart(user[0].userId);
        setCart(cartBooks);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const Total = TotalPrice();
        setTPrice(Total);
    }, [carts]);

    const TotalPrice = () => {
        let Money = 0;
        for (const Item of carts) {
            Money = Money + Item.price;
        }
        return Money;
    };

    const spreadSmallCartItems = () => {
        return carts.map((cart, index) => (
            <div className="small-cart-row" key={index}>
                <div className="cart-row-item">
                    <img src={cart.image} alt={cart.name} className="item-photo" />
                    <div className="item-name">{cart.name}</div>
                </div>
                <div className="cart-row-item">{cart.price} VND</div>
            </div>
        ));
    };
    const HandleCheckOut = async () => {
        try {
            for (const cartItem of carts) {

                // Sử dụng API để cập nhật số lượng sách
                await API.UpdateBooksByID({ id: cartItem.id, status: "sold" });

                // Thêm Orders
                const listOfIds = orders[0].productId.concat(carts.map(item => item.id));
                await API.UpdateOrdersByUserID(orders[0].userId, listOfIds);
            }

            // Đặt các bước xử lý khác ở đây nếu cần thiết sau khi đã cập nhật xong
        } catch (error) {
            console.error('Error updating books:', error);
        }
    };
    return (
        <div className="checkout-container">
            <div className="billing-form">
                <div className="form-title">Billing details</div>
                <div className="billing-input-group">
                    <label>Name of receiver</label>
                    <input type="text" placeholder="Name" required />
                </div>
                <div className="billing-input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="billing-input-group">
                    <label>Phone number</label>
                    <input type="text" placeholder="Phone number" required />
                </div>
                <div className="billing-input-group">
                    <label>City</label>
                    <input type="text" placeholder="City" required />
                </div>
                <div className="billing-input-group">
                    <label>District</label>
                    <input type="text" placeholder="District" required />
                </div>
                <div className="billing-input-group">
                    <label>Address</label>
                    <input type="text" placeholder="Apartment no., street, ward,..." required />
                </div>
            </div>
            <div className="small-cart-preview">
                <div className="small-cart-table">{spreadSmallCartItems()}</div>
                <div className="small-total-table">
                    <div className="small-total-item">
                        <div>Subtotal</div>
                        <div>{TPrice}VND</div>
                    </div>
                    <div className="small-total-item">
                        <div>Shipping</div>
                        <div>10000VND</div>
                    </div>
                    <div className="small-total-item">
                        <div>Total</div>
                        <div>{TPrice + 10000}VND</div>
                    </div>
                </div>
                <div className="payment-option">
                    <div className="option-group">
                        <input type="radio" name="payment" id="card" />
                        <label htmlFor="card">Credit/Debit card</label>
                        <div className="card-img-group">
                            <div className="visa"></div>
                            <div className="mastercard"></div>
                        </div>
                    </div>
                    <div className="option-group">
                        <input type="radio" name="payment" id="cod" />
                        <label htmlFor="cod">Cash on delivery</label>
                    </div>
                </div>
                <Link to="/" state={{ openPopup: true, message: "Order(s) placed successfully.", type: "order" }} className="order-button" onClick={() => { HandleCheckOut() }}>
                    Place order
                </Link>
            </div>
        </div>
    );
};

export default Checkout;