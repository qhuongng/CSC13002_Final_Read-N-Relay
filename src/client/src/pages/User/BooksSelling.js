import "./BooksSelling.css";
import { Link } from "react-router-dom";

const BooksSelling = () => {
    const spreadSaleItems = () => {
        const n = 4;
        return [...Array(n)].map((e, i) => (
            <div className="sales-table-row">
                <div className="sales-table-row-item">
                    <div className="sales-item-photo"></div>
                    <div className="sales-item-name">Book</div>
                </div>
                <div className="sales-table-row-item">30.000 VND</div>
                <div className="sales-table-row-item">For sale</div>
                <div className="sales-table-row-item">
                    <div className="sales-button-group">
                        <Link to="/add" className="edit-button">
                            Edit
                        </Link>
                        <div className="remove-button">Remove</div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="sales-container">
            <div className="sales-table">
                <div className="sales-table-header">
                    <div className="sales-table-header-item">Book</div>
                    <div className="sales-table-header-item" id="price">
                        Price
                    </div>
                    <div className="sales-table-header-item">Status</div>
                    <div className="sales-table-header-item">
                        <div className="sales-blank"></div>
                    </div>
                </div>
                <div className="sale-table-rows">{spreadSaleItems()}</div>
            </div>
        </div>
    );
};

export default BooksSelling;
