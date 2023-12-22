import "./Home.css";
import { Link } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";
import Alert from "../../components/Alert/Alert";
import { useState, useEffect } from "react";
import * as API from "../../utils/API.js"

const Home = ({ location }) => {
    const[recentlyPost,setRecentlyPost]=useState([]);
    const[BooksMightLike,setBooksMightLike]=useState([])
    useEffect(() => {
        const fetchData = async() => {
            try {
                // Fetch CurrentUserId
                const user = await API.getCurrentUser();

                //Fetch recentlyPost
                const RecentlyPostBooks=await API.getBooksByAttributes({userId : user[0].userId})
                setRecentlyPost(RecentlyPostBooks)

                //Fetch mightLike
                const BookMightLike=await API.getBooksByPage(1,4)
                setBooksMightLike(BookMightLike)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        fetchData();
    }, []);
    const { openPopup = false, message = "nomessage", type = "notype" } = location.state || {};

    const spreadProductsRecentlyPost = () => {
        const n = 4;
        const limitedRecentlyPost = recentlyPost.slice(0, n);
    
        return limitedRecentlyPost.map((books, index) => (
            <Link to={`/books/${books.id}`} className="product" key={index}>
                <div className="product-photo">{/* <img src={books.image} alt={books.name} className="product-image" /> */}</div>
                <div className="product-title">{books.name}</div>
                <div className="product-price">{books.price}</div>
            </Link>
        ));
    };

    const spreadProductsMightLike = () => {
        return BooksMightLike.map((books, index) => (
            <Link to={`/books/${books.id}`} className="product"key={index}>
                <div className="product-photo">{/*<img src={books.image} alt={books.name} className="product-image" />*/}</div>
                <div className="product-title">{books.name}</div>
                <div className="product-price">{books.price}</div>
            </Link>
        ));
    };
    return (
        <div className="home-container">
            {openPopup && <Alert message={message} type={type} />}
            <div className="top-banner">
                <div className="top-banner-illust"></div>
                <div className="top-banner-content">
                    <div className="top-banner-heading">Less money spent,</div>
                    <div className="top-banner-heading">more knowledge gained</div>
                    <div className="top-banner-body">With Read & Relay, reselling and buying old books with fellow bookworms has never been easier.</div>
                    <Link to="/books" className="start-relay-btn">
                        Start relaying
                    </Link>
                </div>
            </div>
            <div className="recently-posted">
                <div className="title-container">
                    <div className="title">Recently posted</div>
                    <Link to="/books" className="view-all-btn">
                        View all
                    </Link>
                </div>
                <div className="product-spread">{spreadProductsRecentlyPost()}</div>
            </div>
            <div className="you-might-like">
                <div className="title-container">
                    <div className="title">You might like</div>
                </div>
                <div className="product-spread">{spreadProductsMightLike()}</div>
            </div>
        </div>
    );
};

export default withRouter(Home)