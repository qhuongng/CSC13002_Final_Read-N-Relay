import "./BookInfo.css";
import * as API from "../../utils/API.js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";


const BookInfo = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [checkStatus, setCheckStatus] = useState([]);
  const [user, setUser] = useState(null);
  const [ReviewUser, setReviewUser] = useState([]);
  const [booksMightLike, setBooksMightLike] = useState([]);

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
        <div className="info-user-photo-container">
          <div className="info-user-photo"></div>
        </div>
        <div className="info-user-comment-name">
          <div className="info-user-name">{ReviewUser[review.userId]?.name}</div>
          <div className="info-user-comment">{review.text}</div>
        </div>
        {/* Add other review details as needed */}
      </div>
    ));
  };

  const spreadReco = () => {
    return booksMightLike.map((book, index) => (
      <Link to={`/books/${book.id}`} className="info-each-reco" key={index}>
        <div className="info-product-reco-photo-container">
          <img src={book.image} alt={book.name} className="info-product-reco-photo" />
        </div>
        <div className="info-product-reco">
          <div className="info-product-reco-name">{book.name}</div>
          <div className="info-product-reco-des">Tụi em không còn thời gian để viết description nên thầy thông cảm cho tụi em nha, em cảm ơn ạ !</div>
          <div className="info-product-reco-price-rate">
            <div className="info-product-reco-price">{book.price} VND</div>
            <div className="info-product-reco-rate">(35 reviews)</div>
          </div>
        </div>
        {/* Add other book details as needed */}
      </Link>
    ));
  };

  const spreadGenres = () => {
    return bookData.genres.map((genre, index) => (
      <div className="info-product-genre">
        <div className="info-product-each-genre">{genre}</div>
        <div className="info-product-each-genre">{index < bookData.genres.length - 1 && "|"}</div>
      </div>
    ))
  };

  return (
    <div className="info-container">
      {bookData && (
        <div className="info-product-full">
          <div className="info-image-container">
            <img src={bookData.image} alt={bookData.name} className="info-image" />
          </div>

          <div className="info-prodcut-container">
            <div className="info-product">
              <div className="info-product-name">{bookData.name}</div>
              <div className="info-product-genre">{spreadGenres()}</div>
              <div className="info-product-rate-status">
                <div className="info-product-rate">{reviews.length} Reviews</div>
                <div className="info-product-line-split"></div>
                <div className="info-product-status">
                  {checkStatus ? <div>For sale</div> : <div>Sold</div>}
                </div>
              </div>

              <div className="info-product-price">{bookData.price} VND</div>
              <div className="info-des">Want to instantly capture readers? No matter who you are or what genre your book falls into—nothing beats getting engrossed in a book description that leaves a reader wanting more. Short and long book descriptions both serve a purpose—to make you and your book look good. Before you start writing, here are a few things you need to know.</div>
              <div className="info-line"></div>
              <div className="info-access">
                <Link to="/checkout" className="info-buy">
                  Buy now
                </Link>
                <div className="info-add">Add to cart</div>
                <div className="info-like">
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
