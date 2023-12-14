import "./Home.css";
import { Link } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";
import Alert from "../../components/Alert/Alert";

const Home = ({ location }) => {
    const { openPopup = false, message = "nomessage", type = "notype" } = location.state || {};

    const spreadProducts = () => {
        const n = 4;
        return [...Array(n)].map((e, i) => (
            <Link to="/books/id" className="product">
                <div className="product-photo"></div>
                <div className="product-title">Book</div>
                <div className="product-price">NaN VND</div>
            </Link>
        ));
    };

    return (
        <div className="home-container">
            {openPopup && <Alert message={message} type={type} />}
            <div className="top-banner">
                <div className="top-banner-illust"></div>
                <div className="top-banner-content">
                    <div className="top-banner-heading">Less money spent,</div>
                    <div className="top-banner-heading">more knowledge gained</div>
                    <div className="top-banner-body">With Read & Relay, reselling and buying old books with fellow bookworms has never been easier.</div>
                    <Link to="/books" className="start-relay-btn">
                        Start relaying
                    </Link>
                </div>
            </div>
            <div className="recently-posted">
                <div className="title-container">
                    <div className="title">Recently posted</div>
                    <Link to="/books" className="view-all-btn">
                        View all
                    </Link>
                </div>
                <div className="product-spread">{spreadProducts()}</div>
            </div>
            <div className="you-might-like">
                <div className="title-container">
                    <div className="title">You might like</div>
                </div>
                <div className="product-spread">{spreadProducts()}</div>
            </div>
        </div>
    );
};

export default withRouter(Home);
