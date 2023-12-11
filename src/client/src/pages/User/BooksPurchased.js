import "./BooksPurchased.css";
import { Link } from "react-router-dom";

const BooksPurchased = () => {
    const spreadPurchasedItems = () => {
        const n = 4;
        return [...Array(n)].map((e, i) => (
            <div className="bought-table-row">
                <div className="bought-table-row-item">
                    <div className="bought-item-photo"></div>
                    <div className="bought-item-name">Book</div>
                </div>
                <div className="bought-table-row-item">30.000 VND</div>
                <div className="bought-table-row-item">
                    <Link to="/books/id" className="bought-view-button">
                        View info
                    </Link>
                </div>
            </div>
        ));
    };

    return (
        <div className="bought-container">
            <div className="bought-table">
                <div className="bought-table-header">
                    <div className="bought-table-header-item">Book</div>
                    <div className="bought-table-header-item" id="price">
                        Price
                    </div>
                    <div className="bought-table-header-item">
                        <div className="bought-blank"></div>
                    </div>
                </div>
                <div className="sale-table-rows">{spreadPurchasedItems()}</div>
            </div>
        </div>
    );
};

export default BooksPurchased;
