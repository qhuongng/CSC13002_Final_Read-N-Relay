import "./BookInfo.css";
import * as API from "../../utils/API.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookInfo = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [checkStatus, setCheckStatus] = useState([]);
  const [user, setUser] = useState(null);
  const [ReviewUser, setReviewUser] = useState([]);
  const [booksMightLike, setBooksMightLike] = useState([]);
  const [successCart, setSuccessCart] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch book details
        const books = await API.getBooksByAttributes({ id: id });
        setBookData(books[0]) // Assuming you want to display information for the first book
        // Fetch reviews for the book
        const bookReviews = await API.getBookReviews(id);
        setReviews(bookReviews);
        //Fetch book's user
        const users = await API.getUserProfileByAttributes({ id: books[0].userId });
        setUser(users); // Assuming you want to display information for the first book
        //Fetch reviews' user
        const reviewUsers = []
        for (const Review of bookReviews) {
          const reviewUser = await API.getUserProfileByAttributes({ id: Review.userId });
          reviewUsers[Review.userId] = reviewUser[0]
        }
        setReviewUser(reviewUsers)
        //Fetch Books Might Like
        const booksMightLike = await API.getBooksByPage(2, 5);
        setBooksMightLike(booksMightLike);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const spreadComments = () => {
    return reviews.map((review, index) => (
      <div className="info-each-review" key={index}>
        <div className="review-user">{ReviewUser[review.userId]?.name}</div>
        <div className="review-content">{review.text}</div>
        {/* Add other review details as needed */}
      </div>
    ));
  };

  const spreadReco = () => {
    return booksMightLike.map((book, index) => (
      <div className="info-each-reco" key={index}>
        {/*<img src={book.image} alt={book.name} className="reco-product-image" />*/}
        <div className="reco-product-name">{book.name}</div>
        <div className="reco-product-price">{book.price}</div>
        {/* Add other book details as needed */}
      </div>
    ));
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const user = await API.getCurrentUser();
      const books = await API.getBooksByAttributes({ id: id });
      const addedToCart = await API.addtoCart({
        userId: user[0].userId,
        productId: books[0].id
      });
      toast.success('Added to cart successfully!');
      console.log('Added to cart:', addedToCart);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const handelAddToFav = async (e) => {
    e.preventDefault();
    try {
      const user = await API.getCurrentUser();
      const books = await API.getBooksByAttributes({ id: id });
      const addedToCart = await API.addtoFavorite({
        userId: user[0].userId,
        productId: books[0].id
      });
      toast.success('Added to favorites successfully!');
      console.log('Added to favorites:', addedToCart);
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    }
  };


  return (
    <div className="info-container">
      {bookData && (
        <div className="info-product-full">
          <div className="info-image">{/*<img src={bookData.image} alt={bookData.name} />*/} </div>
          <div className="info-prodcut-container">
            <div className="info-product">
              <div className="info-product-name">{bookData.name}</div>
              <div className="info-product-rate-status">
                <div className="info-product-rate">{reviews.length} Reviews</div>
                <div className="info-product-line-split"></div>
                <div className="info-product-status">
                  {checkStatus ? <div>For sale</div> : <div>Sold</div>}
                </div>
              </div>
              <div className="info-product-price">{bookData.price} VND</div>
              <div className="info-des">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</div>
              <div className="info-line"></div>
              <div className="info-access">
                <Link to="/checkout" className="info-buy">
                  Buy now
                </Link>
                <div className="info-add" onClick={handleAddToCart}>
                  Add to cart
                </div>
                <div className="info-like" onClick={handelAddToFav}>
                  <FaHeart className="info-like-icon" />
                </div>
              </div>
            </div>
            <div className="info-shop"></div>
          </div>
        </div>
      )}

      <div className="info-review-reco">
        <div className="info-review">
          <div className="info-review-header">
            <div className="info-review-title">Reviews</div>
            <div className="review-form">
              <textarea name="book-description" placeholder="Start typing a review..."></textarea>
              <div className="review-button">Post</div>
            </div>
          </div>
          <div className="info-review-container">{spreadComments()}</div>
        </div>

        <div className="info-reco">
          <div className="info-reco-title">You might also like</div>
          <div className="info-reco-container">{spreadReco()}</div>
        </div>
      </div>

      <div className="info-button-up"></div>
    </div>
  );
};

export default BookInfo;
