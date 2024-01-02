import "./SearchBook.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchBook = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchDataParam = searchParams.get("searchData");
    const searchData = searchDataParam ? JSON.parse(decodeURIComponent(searchDataParam)) : null;

    const spreadProducts = () => {
        console.log(searchData)
        return searchData.map((book, index) => (
            <Link to={`/books/${book.id}`} className="product" key={index}>
                <div className="product-photo-container">
                    <img className="product-photo" src={book.image} alt={book.name} />
                </div>
                <div className="product-title">{book.name}</div>
                <div className="product-price">{book.price} VND</div>
            </Link>
        ));
    };

    return (
        <div className="books-container">
            <div className="title">Search books</div>
            <div className="product-spread">{spreadProducts()}</div>
        </div>
    );
};

export default SearchBook;
