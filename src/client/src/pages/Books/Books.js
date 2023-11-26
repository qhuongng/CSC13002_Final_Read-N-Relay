import "./Books.css";
import { Link } from "react-router-dom";

const Books = () => {
  const spreadProducts = () => {
    const n = 16;
    return [...Array(n)].map((e, i) => (
      <Link to="/books/id" className="product">
        <div className="product-photo"></div>
        <div className="product-title">Book</div>
        <div className="product-price">NaN VND</div>
      </Link>
    ));
  };

  return (
    <div className="books-container">
      <div className="title">All books</div>
      <div className="product-spread">{spreadProducts()}</div>
    </div>
  );
};

export default Books;
