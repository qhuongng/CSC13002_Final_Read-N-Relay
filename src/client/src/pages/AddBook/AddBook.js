import "./AddBook.css";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";

const AddBook = () => {
    const genres = ["Action", "Biography", "Fantasy", "History", "Horror", "Mystery", "Non-fiction", "Romance", "Sci-fi", "Self-help", "Thriller"];

    return (
        <div className="add-container">
            <div className="add-book-photo-group">
                <div className="book-photo-overlay">
                    <div className="book-overlay-icon"></div>
                    <div className="book-overlay-bg"></div>
                </div>
                <div className="add-book-photo"></div>
            </div>
            <div className="add-book-form">
                <div className="add-book-input-group">
                    <label>Book title</label>
                    <input type="text" placeholder="Book title" required />
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
