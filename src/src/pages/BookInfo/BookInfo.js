import "./BookInfo.css";
import * as API from "../../utils/API.js";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert/Alert";


const BookInfo = () => {
    const { id } = useParams();
    const [bookData, setBookData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [ReviewUser, setReviewUser] = useState([]);
    const [booksMightLike, setBooksMightLike] = useState([]);
    const [cartAlert, setCartAlert] = useState("");
    const [favAlert, setFavAlert] = useState("");
    const [reviewAlert, setReviewAlert] = useState("");
    const [checkFav, setFav] = useState();
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState('');
    const [currentUser, setCurrentUser] = useState(-1);

    const fetchData = async () => {
        try {
            // Fetch book details
            const books = await API.getBooksByAttributes({ id: id });
            setBookData(books[0]); // Assuming you want to display information for the first book
            console.log(books[0]);
            // Fetch reviews for the book
            const bookReviews = await API.getBookReviews(id);
            setReviews(bookReviews);
            //Fetch reviews' user
            const reviewUsers = [];

            for (const Review of bookReviews) {
                const reviewUser = await API.getUserProfileByAttributes({ id: Review.userId });
                reviewUsers[Review.userId] = reviewUser[0];
            }
            setReviewUser(reviewUsers);
            //Fetch Books Might Like
            const booksMightLike = await API.getBooksByPage(2, 5);

            setBooksMightLike(booksMightLike);

            const user = await API.getCurrentUser();

            if (user[0].userId !== -1) {
                setCurrentUser(user[0].userId);

                const listFav = await API.getUserFavoritesProfile(user[0].userId);

                if (listFav && listFav[0].productId.includes(Number(id))) {
                    setFav(true);
                }
                else {
                    setFav(false);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const checkStatus = () => {
        if (bookData.status.toString() == "available") {
            return true;
        } else {
            return false;
        };
    }
    useEffect(() => {
        fetchData();
    }, [id]);

    const spreadComments = () => {
        return reviews.map((review, index) => (
            <div className="info-each-review" key={index}>
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
                    <div className="info-product-reco-des">{book.description}</div>
                    <div className="info-product-reco-price-rate">
                        <div className="info-product-reco-price">{book.price} VND</div>
                        <div className="info-product-reco-rate">(35 reviews)</div>
                    </div>
                </div>
                {/* Add other book details as needed */}
            </Link>
        ));
    };

    const handleAddToCart = async (e) => {
        setCartAlert("");
        e.preventDefault();
        try {
            const user = await API.getCurrentUser();

            if (user[0].userId !== -1) {
                setCurrentUser(user[0].userId);

                const books = await API.getBooksByAttributes({ id: id });
                const addedToCart = await API.addtoCart({
                    userId: user[0].userId,
                    productId: books[0].id
                });
                setCartAlert('Book added to cart.');
                console.log('Added to cart:', addedToCart);
            }
            else {
                setCartAlert('Cannot add to cart. Please log in first.');
            }
        } catch (error) {
            setCartAlert('Error adding book to cart.');
            console.error('Error adding to cart:', error.message);
        }
    };

    const handleBuyNow = async (e) => {
        setCartAlert("");
        e.preventDefault();
        try {
            const user = await API.getCurrentUser();

            if (user[0].userId !== -1) {
                setCurrentUser(user[0].userId);

                const books = await API.getBooksByAttributes({ id: id });
                const addedToCart = await API.addtoCart({
                    userId: user[0].userId,
                    productId: books[0].id
                });
                navigate('/checkout');
            }
            else {
                setCartAlert('Cannot proceed to checkout. Please log in first.');
            }
        } catch (error) {
            setCartAlert('An error occured.');
            console.error('Error buying now', error.message);
        }
    };

    const handelAddToFav = async (e) => {
        setFavAlert("");
        e.preventDefault();
        try {
            const user = await API.getCurrentUser();

            if (user[0].userId !== -1) {
                setCurrentUser(user[0].userId);

                const books = await API.getBooksByAttributes({ id: id });

                if (!checkFav) {
                    const addedToFav = await API.addtoFavorite({
                        userId: user[0].userId,
                        productId: books[0].id
                    });
                    setFavAlert('Added book to favorites successfully.');
                    console.log('Added to favorites:', addedToFav);
                    setFav(true);
                }
                else {
                    const RemoveFromFav = await API.UpdateFavoriteList({
                        userId: user[0].userId,
                        productIdToRemove: books[0].id
                    });
                    setFavAlert('Removed from favorites successfully.');
                    console.log('Removed from favorites:', RemoveFromFav);
                    setFav(false);
                }
            }
            else {
                setFavAlert('Cannot add book to favorites. Please log in first.');
            }
        } catch (error) {
            setFavAlert('An error occured.');
            console.error('Error handling favorites:', error.message);
        }
    };

    const handleInputReview = (e) => {
        setReviewText(e.target.value);
    }

    const handleAddReview = async (e) => {
        setReviewAlert("");
        e.preventDefault();
        try {
            const user = await API.getCurrentUser();

            if (user[0].userId !== -1) {
                setCurrentUser(user[0].userId);

                const books = await API.getBooksByAttributes({ id: id });
                const response = await API.addReview({
                    userId: user[0].userId,
                    productId: books[0].id,
                    text: reviewText
                });
                setReviewAlert('Review posted successfully.');
                console.log('Post a reviews:', response);
                // đặt lại giá trị review sau khi post thành công
                setReviewText('');
                // Sau khi gửi thành công, gọi lại fetchData để tải lại đánh giá mới nhất
                fetchData();
            }
            else {
                setReviewAlert('Cannot post review. Please log in first.');
            }
        } catch (error) {
            setReviewAlert('Error posting review.');
            console.error('Error posting a new reviews: ', error.message);
        }
    }

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
                            <div className="info-product-rate-status">
                                <div className="info-product-genre">{reviews.length} Reviews</div>
                                <div className="info-product-line-split"></div>
                                {checkStatus() ? <div className="info-product-sale">For sale</div> : <div className="info-product-sold">Sold</div>}
                                <div className="info-product-line-split"></div>
                                <div className="info-product-genre">{bookData.genre}</div>
                            </div>

                            <div className="info-product-price">{bookData.price} VND</div>
                            <div className="info-des">{bookData.description}</div>
                            <div className="info-line"></div>
                            <div className="info-access">
                                <div className="info-buy" onClick={handleBuyNow}>
                                    Buy now
                                </div>
                                <div className="info-add" onClick={handleAddToCart}>
                                    Add to cart
                                </div>
                                {cartAlert && <Alert message={cartAlert} type="notype" />}
                                <div className="info-like" onClick={handelAddToFav}>
                                    {checkFav ? <FaHeart className="info-like-icon" /> : <FaHeart className="info-like-icon-dont" />}
                                </div>
                                {favAlert && <Alert message={favAlert} type="notype" />}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="info-review-reco">
                <div className="info-review">
                    <div className="info-review-header">
                        <div className="info-review-title">Reviews</div>
                        <div className="review-form">
                            <textarea name="book-description" placeholder="Start typing a review..." value={reviewText} onChange={handleInputReview}></textarea>
                            <div className="review-button" onClick={handleAddReview}>Post</div>
                            {reviewAlert && <Alert message={reviewAlert} type="notype" />}
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