import "./SearchBook.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js";

const SearchBook = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchName = searchParams.get("searchName");
    const [books,setBooks]=useState([])

    useEffect(()=>{
        const fetchdata= async ()=>{

            const SearchData=await API.getBooksByAttributes({name: searchName})
            setBooks(SearchData);
            console.log(searchName);

        }
        fetchdata(); 
    },[searchName]);
    
    const spreadProducts = () => {
        console.log(books)
        return books.map((book, index) => (
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
