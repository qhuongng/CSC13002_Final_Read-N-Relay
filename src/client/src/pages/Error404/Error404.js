import "./Error404.css";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="error404-container">
            <div className="main">404</div>
            <div className="desc">It looks like this page might not exist.</div>
            <Link to="/" className="go-home-button">
                Go home?
            </Link>
        </div>
    );
};

export default Error404;
