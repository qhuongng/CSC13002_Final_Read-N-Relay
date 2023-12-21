import "./FavoriteBooks.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js"
import { useEffect, useState } from "react";

const FavoriteBooks = () => {
    const [favorbooks,setFavorites] =useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch CurrentUserId
            const user = await API.getCurrentUser();

            //Fetch cart
            const FavoriteBooks=await API.getUsersFavoritesBooks(user[0].userId)
            setFavorites(FavoriteBooks)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);
    const spreadFavoriteItems = () => {
        return favorbooks.map((book, index) => (
            <div className="fav-table-row"key={index}>
                <div className="fav-table-row-item">
                    <div className="fav-item-photo">{/*<img src={book.image} alt={book.name} className="fav-item-image" />*/}</div>
                    <div className="fav-item-name">{book.name}</div>
                </div>
                <div className="fav-table-row-item">{book.price} VND</div>
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
