import { useEffect, useState } from "react";
import "./Cart.css";
import * as API from "../../utils/API.js"
import Alert from "../../components/Alert/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [carts, setCart] = useState([]);
    const [CartProfile, setCartProfile] = useState(null);
    const [TPrice, setTPrice] = useState(null)
    const [alert, SetAlert] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // Fetch CurrentUserId
            const user = await API.getCurrentUser();

            // Fetch CartProfile using userId
            const CProfile = await API.getUserCartProfile(user[0].userId);
            setCartProfile(CProfile);
            console.log(CartProfile)

            // Fetch Cart using userId
            const cartBooks = await API.getUserCart(user[0].userId);
            setCart(cartBooks);
            console.log("when fetch cart dt: ", cartBooks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const Total = TotalPrice();
        setTPrice(Total);
    }, [carts]); // useEffect để tính toán tổng giá trị khi carts thay đổi


    const TotalPrice = () => {
        let Money = 0;
        for (const Item of carts) {
            Money = Money + Item.price;
        }
        return Money;
    };

    const handleRemove = (Id) => {
        API.UpdateCartsByUserID(CartProfile[0].userId, CartProfile[0].productId.filter(item => item !== Id))

            .then(() => {
                // Reload the page after updating the backend
                fetchData();
            })
            .catch((error) => {
                console.error('Error removing item:', error);
            });
    };

    const spreadCartItems = () => {
        return carts.map((cart, index) => (
            <div className="cart-table-row" key={index}>
                <div className="cart-table-row-item">
                    <div className="row-item-photo-container">
                        <img src={cart.image} alt={cart.name} className="row-item-photo" />
                    </div>
                    <div className="row-item-name">{cart.name}</div>
                </div>
                <div className="cart-table-row-item">{cart.price} VND</div>
                <div className="cart-table-row-item">
                    <div className="cart-button-group">
                        <Link to={`/books/${cart.id}`} className="view-book-button">
                            View book info
                        </Link>
                        {/* Add the Remove button */}
                        <div className="remove-button" onClick={() => handleRemove(cart.id)}>
                            Remove
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const handleCheckout = async (e) => {
        SetAlert("");
        e.preventDefault();
        console.log("After press chekcout button:", carts);
        // cart trống
        if (carts.length == 0) {
            SetAlert("Cannot check out with an empty cart.");
        }
        else {
            console.log(carts[0]);
            navigate("/checkout");
        }
    }

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
                    <div className="table-item-value">{TPrice}VND</div>
                </div>
                <div className="table-item">
                    <div className="table-item-title">Shipping</div>
                    <div className="table-item-value">10000VND</div>
                </div>
                <div className="table-item">
                    <div className="table-item-title">Total</div>
                    <div className="table-item-value">{TPrice + 10000}VND</div>
                </div>
                <button onClick={handleCheckout} className="checkout-button">
                    Proceed to checkout
                </button>
                {alert && <Alert message={alert} type="notype" />}
            </div>
        </div>
    );
};

export default Cart;