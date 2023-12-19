import "./Books.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await API.getAllBooks();
        console.log('Books Data:', booksData); 
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);

  const spreadProducts = () => {
    return books.map((book, index) => (
      <Link to={`/books/${book.id}`} className="product" key={index}>
        <div className="product-photo">
          {/* <img src={book.image} alt={book.name} /> */}
        </div>
        <div className="product-title">{book.name}</div>
        <div className="product-price">{book.price} VND</div>
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
