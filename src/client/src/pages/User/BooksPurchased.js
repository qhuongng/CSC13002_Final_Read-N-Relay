import "./BooksPurchased.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js"
import { useEffect, useState } from "react";

const BooksPurchased = () => {
    const [orderbooks,setOrder] =useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch CurrentUserId
            const user = await API.getCurrentUser();

            //Fetch orders
            const OrderBooks=await API.getUsersPurchasedBooks(user[0].userId)
            setOrder(OrderBooks)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
    const spreadPurchasedItems = () => {
        if (!orderbooks) {
            return null; 
        }
        return orderbooks.map((book, index) => (
            <div className="bought-table-row"key={index}>
                <div className="bought-table-row-item">
                    <div className="bought-item-photo">{/*<img src={books.image} alt={book.name} className="bought-item-image" />*/}</div>
                    <div className="bought-item-name">{book.name}</div>
                </div>
                <div className="bought-table-row-item">{book.price} VND</div>
                <div className="bought-table-row-item">
                    <Link to={`/books/${book.id}`} className="bought-view-button">
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