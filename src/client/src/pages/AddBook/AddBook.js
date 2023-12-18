import "./AddBook.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Dropdown from "../../components/Dropdown/Dropdown";
import { useState , useEffect} from "react";
import axios from 'axios';
import api from '../../api/posts';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddBook = () => {
    const navigate = useNavigate();
    const API_URL = '  http://localhost:3500/products';
    const genres = ["Action", "Biography", "Fantasy", "History", "Horror", "Mystery", "Non-fiction", "Romance", "Sci-fi", "Self-help", "Thriller"];
    const [newItem,setNewItem] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [formData,setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const fetchPosts = async() => {
            try{
                const response = await api.get('/posts');
                // setPosts(response.data);
            }
            catch (error) {
                console.log(error)
            }
        }   
        fetchPosts();
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }; 
    
    const findAuthorIdByName = async (authorName) => {
        try {
            const response = await axios.get(`http://localhost:3500/users?name=${authorName}`);
            if (response.data && response.data.length > 0) {
                return response.data[0].id; // giả sử API trả về một mảng các tác giả thì lấy ID của tác giả đầu tiên
            }
        } catch (error) {
            console.error('Error finding author:', error);
        }
        return null; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authorId = await findAuthorIdByName(formData.author);
        if (authorId) {
            // Nếu có ID của tác giả, gửi dữ liệu POST
            axios.post(API_URL, {
                authorId: authorId, // Sử dụng ID tác giả thay vì tên
                name: formData.title,
                description: formData.description,
                price: formData.price
            })
            .then(response => {
                console.log('Book added successfully:', response.data);
                toast.success("Successfully added book!");
                navigate("/");
            })
            .catch(error => {
                console.error('Error adding book:', error);
            });
        } else {
            console.log('Author not found');
        }
    };

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
                    <input
                        type="text"
                        name="title"
                        placeholder="Book title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="add-book-input-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        required
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="add-book-input-group">
                    <label>Genre</label>
                    <div className="genre-selector">
                        <Dropdown array={genres}></Dropdown>
                    </div>
                </div>
                <div className="add-book-input-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Add a synopsis for the book, or any further information..."
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="add-book-input-group">
                    <label>Price</label>
                    <div className="price-input">
                        <input
                            type="number"
                            name="price"
                            placeholder="30000"
                            min="0"
                            required
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <div className="price-label">VND</div>
                    </div>
                </div>
                {/* <Link to="/" state={{ openPopup: true, message: "Successfully published book for sale.", type: "sell" }} className="publish-button">
                    Publish
                </Link> */}
                <button onClick={handleSubmit} className="publish-button">
                    Publish
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddBook;
