import "./Checkout.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js"
import { useState, useEffect } from "react";
import Alert from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [carts, setCart] = useState([])
    const [orders, setOrders] = useState(null)
    const [TPrice, setTPrice] = useState(null)

    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tickCheck, setTickCheck] = useState('');

    const fetchData = async () => {
        // Fetch CurrentUserId
        const user = await API.getCurrentUser();

        const Profile = await API.getUserProfileByAttributes({ id: user[0].userId })
        setUserProfile(Profile);
        setName(Profile[0].name);
        setEmail(Profile[0].email);
        setAddress(Profile[0].address);
        setPhoneNumber(null);

        // Fetch Orders using userId
        const orderP = await API.getUserOrdersProfile(user[0].userId);
        setOrders(orderP);
        //console.log(orderP);

        // Fetch Cart using userId
        const cartBooks = await API.getUserCart(user[0].userId);
        setCart(cartBooks);

        // init tickCheck status
        setTickCheck(false);
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


    const HandleCheckOut = async (e) => {
        setAlert("");
        e.preventDefault();
        try {
            // not fill vào all fields
            if (!name || !email || !address || !phoneNumber) {
                setAlert("Please fill in all fields.");
                return;
            }
            // chưa chọn phương thức thanh toán
            if (tickCheck != true) {
                setAlert("Please choose a payment method.");
                return;
            }
            // kiểm tra sdt, bắt đầu bằng 0 và có 10 số
            const regex = /^0\d{9}$/;
            const isValidPhoneNumber = regex.test(phoneNumber);
            if (!isValidPhoneNumber) {
                setAlert('Invalid phone number (phone numbers must start with 0).');
                return;
            }
            // có sp đã sold
            for (const cartItem of carts) {
                if (cartItem.status === "sold") {
                    setAlert("A product in the cart is already sold.");
                    return;
                }
                // Sử dụng API để cập nhật số lượng sách
                await API.UpdateBooksByID({ id: cartItem.id, status: "sold" });

                // update Orders
                await API.UpdateOrdersByUserID(userProfile[0].id, cartItem.id);
            }

            // delete carts
            await API.UpdateCartsByUserID(userProfile[0].id, []);
            // navigate về home
            navigate("/", { state: { openPopup: true, message: "Purchase completed successfully.", type: "order" }, replace: true });

        } catch (error) {
            console.error('Error updating books:', error);
        }
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName); // Update the input value as the user types
    };
    const handleEmailChange = (e) => {
        const newName = e.target.value;
        setEmail(newName); // Update the input value as the user types
    };
    const handleAddressChange = (e) => {
        const newName = e.target.value;
        setAddress(newName); // Update the input value as the user types
    };
    const handlePhoneNumberChange = (e) => {
        const newName = e.target.value;
        setPhoneNumber(newName); // Update the input value as the user types
    };
    const handleTick = (e) => {
        setTickCheck(true);
    }


    return (
        <div className="checkout-container">
            <div className="billing-form">
                <div className="form-title">Billing details</div>
                <div className="billing-input-group">
                    <label>Name of receiver</label>
                    <input type="text" placeholder="Name" required value={name} onChange={handleNameChange} />
                </div>
                <div className="billing-input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" required value={email} onChange={handleEmailChange} />
                </div>
                <div className="billing-input-group">
                    <label>Phone number</label>
                    <input type="text" placeholder="Phone number" required value={phoneNumber} onChange={handlePhoneNumberChange} />
                </div>
                <div className="billing-input-group">
                    <label>Address</label>
                    <input type="text" placeholder="Apartment no., street, ward,..." required value={address} onChange={handleAddressChange} />
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
                    <div className="option-group" onClick={handleTick}>
                        <input type="radio" name="payment" id="card" />
                        <label htmlFor="card">Credit/Debit card</label>
                        <div className="card-img-group">
                            <div className="visa"></div>
                            <div className="mastercard"></div>
                        </div>
                    </div>
                    <div className="option-group" onClick={handleTick}>
                        <input type="radio" name="payment" id="cod" />
                        <label htmlFor="cod">Cash on delivery </label>
                    </div>
                </div>
                <button className="order-button" onClick={HandleCheckOut}>
                    Place order
                </button>
                {alert && <Alert message={alert} type="notype" />}
            </div>
        </div>
    );
};

export default Checkout;