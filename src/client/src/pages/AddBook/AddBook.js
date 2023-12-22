import "./AddBook.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";

const AddBook = () => {
    const genres = ["Action", "Biography", "Fantasy", "History", "Horror", "Mystery", "Non-fiction", "Romance", "Sci-fi", "Self-help", "Thriller"];

    const [bookTitle, setBookTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const handleInputChange = (e) => {
        setBookTitle(e.target.value);
    };

    const retrieveCover = async () => {
        try {
            var proxyUrl = "http://localhost:8080/";
            const apiKey = process.env.REACT_APP_IMAGE_API_KEY;
            const apiUrl = `https://serpapi.com/search.json?q=${bookTitle.replace(/ /g, "+")}+cover&engine=google_images&ijn=0&key=${apiKey}`;

            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();

            if (data && data.images_results && data.images_results.length > 0) {
                const firstImageURL = data.images_results[0].original;
                setImgUrl(firstImageURL);
            } else {
                console.log("No images found");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="add-container">
            <div className="add-book-photo-group">
                <div className="book-photo-overlay" onClick={retrieveCover}>
                    <div className="book-overlay-text">Get cover photo</div>
                    <div className="book-overlay-bg"></div>
                </div>
                <div className="add-book-photo-container">{imgUrl != "" && <img className="add-book-photo" src={imgUrl} alt="book-cover" />}</div>
            </div>
            <div className="add-book-form">
                <div className="add-book-input-group">
                    <label>Book title</label>
                    <input type="text" placeholder="Book title" value={bookTitle} onChange={handleInputChange} required />
                    <p className="hint">
                        <em>After entering the book title, click on the empty image on the left to automatically retrieve a cover image</em>
                    </p>
                </div>
                <div className="add-book-input-group">
                    <label>Author</label>
                    <input type="text" placeholder="Author" required />
                </div>
                <div className="add-book-input-group">
                    <label>Genre</label>
                    <div className="genre-selector">
                        <Dropdown array={genres}></Dropdown>
                    </div>
                </div>
                <div className="add-book-input-group">
                    <label>Description</label>
                    <textarea name="book-description" placeholder="Add a synopsis for the book, or any further information..."></textarea>
                </div>
                <div className="add-book-input-group">
                    <label>Price</label>
                    <div className="price-input">
                        <input type="number" placeholder="30000" min="0" required />
                        <div className="price-label">VND</div>
                    </div>
                </div>
                <Link to="/" state={{ openPopup: true, message: "Successfully published book for sale.", type: "sell" }} className="publish-button">
                    Publish
                </Link>
            </div>
        </div>
    );
};

export default AddBook;
