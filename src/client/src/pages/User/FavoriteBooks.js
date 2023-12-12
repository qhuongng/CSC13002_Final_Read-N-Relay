import "./FavoriteBooks.css";
import { Link } from "react-router-dom";

const FavoriteBooks = () => {
    const spreadFavoriteItems = () => {
        const n = 4;
        return [...Array(n)].map((e, i) => (
            <div className="fav-table-row">
                <div className="fav-table-row-item">
                    <div className="fav-item-photo"></div>
                    <div className="fav-item-name">Book</div>
                </div>
                <div className="fav-table-row-item">30.000 VND</div>
                <div className="fav-table-row-item">
                    <Link to="/books/id" className="fav-view-button">
                        View info
                    </Link>
                </div>
            </div>
        ));
    };

    return (
        <div className="fav-container">
            <div className="fav-table">
                <div className="fav-table-header">
                    <div className="fav-table-header-item">Book</div>
                    <div className="fav-table-header-item" id="price">
                        Price
                    </div>
                    <div className="fav-table-header-item">
                        <div className="fav-blank"></div>
                    </div>
                </div>
                <div className="fav-table-rows">{spreadFavoriteItems()}</div>
            </div>
        </div>
    );
};

export default FavoriteBooks;
