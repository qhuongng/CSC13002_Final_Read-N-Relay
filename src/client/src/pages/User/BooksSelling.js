import "./BooksSelling.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BooksSelling = () => {
    const {userId}=useParams();
    const [sellingbooks,setSellingBooks] =useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            //Fetch cart
            const SellBooks=await API.getBooksByAttributes({userId : userId})
            setSellingBooks(SellBooks)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, [userId]);
    const spreadSaleItems = () => {
        return sellingbooks.map((book, index) => (
            <div className="sales-table-row"key={index}>
                <div className="sales-table-row-item">
                    <div className="sales-item-photo">{/*<img src={book.image} alt={book.name} className="sales-item-image" />*/}</div>
                    <div className="sales-item-name">{book.name}</div>
                </div>
                <div className="sales-table-row-item">{book.price} VND</div>
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
