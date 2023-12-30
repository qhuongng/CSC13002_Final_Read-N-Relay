import "./AddBook.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import axios from "axios";
import * as API from "../../utils/API.js";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const AddBook = () => {
    const navigate = useNavigate();
    const genres = ["Action", "Biography", "Fantasy", "History", "Horror", "Mystery", "Non-fiction", "Romance", "Sci-fi", "Self-help", "Thriller"];
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        price: "",
        image: ""
    });
    const [addAlert, setAddAlert] = useState("");

    useEffect(() => { }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemSelected = (selectedItem) => {
        console.log("Selected Item:", selectedItem);
        setFormData({ ...formData, genre: selectedItem });
    };


    const handleSubmit = async (e) => {
        setAddAlert("");
        formData.image = imgUrl;
        e.preventDefault();
        try {
            const currentUser = await API.getCurrentUser();
            // check img
            console.log(formData.image);
            // kiểm tra có fill đầy đủ thông tin không
            var checkEmpty = false;
            for (const key in formData) {
                if (formData[key] === '') {
                    checkEmpty = true;
                    break;
                }
            }
            // không fill đủ thông tin
            if (checkEmpty == true) {
                setAddAlert('Please fill in all fields !');
                return;
            }
            // kiểm tra giới hạn độ dài description
            if (formData.description.length > 300) {
                setAddAlert('Description should not exceed 300 words!');
                return;
            }

            // kiểm tra xem người dùng này đã post sách này chưa ? cùng tên cùng giá
            const book = await axios.get(`${API.API_BASE_URL}/products`, {
                params: {
                    userId: currentUser[0].userId,
                    name: formData.title,
                    price: formData.price
                }
            });
            if (book.status === 200 && book.data && book.data.length > 0)
            {
                setAddAlert('This book already exists!');
                return;
            }

            // post book
            const response = await API.addBook({
                userId: currentUser[0].userId,
                name: formData.title,
                price: parseFloat(formData.price), // convert to float num
                status: "available",
                description: formData.description,
                genre: formData.genre,
                author: formData.author,
                image: imgUrl,
            });
            // pop up notification
            setAddAlert('Added book successfully !');
            // navigate to home page
            navigate("/");
        } catch (error) {
            console.error("Error adding book:", error);
            setAddAlert('Error adding book !');
        }
    };

    const [imgUrl, setImgUrl] = useState("");

    const retrieveCover = async () => {
        try {
            var proxyUrl = "http://localhost:8080/";
            const apiKey = process.env.REACT_APP_IMAGE_API_KEY;
            const apiUrl = `https://serpapi.com/search.json?q=${formData.title.replace(/ /g, "+")}+cover&engine=google_images&ijn=0&key=${apiKey}`;

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

                    <input type="text" name="title" placeholder="Book title" required value={formData.title} onChange={handleChange} />

                    <p className="hint">
                        <em>After entering the book title, click on the empty image on the left to automatically retrieve a cover image</em>
                    </p>
                </div>
                <div className="add-book-input-group">
                    <label>Author</label>
                    <input type="text" name="author" placeholder="Author" required value={formData.author} onChange={handleChange} />
                </div>
                <div className="add-book-input-group">
                    <label>Genre</label>
                    <div className="genre-selector">
                        <Dropdown array={genres} onItemSelected={handleItemSelected} />
                    </div>
                </div>
                <div className="add-book-input-group">
                    <label>Description</label>
                    <textarea name="description" placeholder="Add a synopsis for the book, or any further information..." value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="add-book-input-group">
                    <label>Price</label>
                    <div className="price-input">
                        <input type="number" name="price" placeholder="30000" min="0" required value={formData.price} onChange={handleChange} />
                        <div className="price-label">VND</div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="publish-button">
                    Publish
                </button>
                {addAlert && <Alert message={addAlert} type="notype" />}
            </div>
        </div>
    );
};

export default AddBook;
