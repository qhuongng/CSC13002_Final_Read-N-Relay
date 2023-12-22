import "../Home/Home.css";
import { Link } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";
import { useState, useEffect } from "react";
import * as API from "../../utils/API.js";

const SearchResultPage = ({ location }) => {
    // // Xử lí lấy data

    // const searchProduct = () => {
    //     return BooksMightLike.map((books, index) => (
    //         <Link to={`/books/${books.id}`} className="product" key={index}>
    //             <div className="product-photo-container">
    //                 <img src={books.image} alt={books.name} className="product-photo" />
    //             </div>
    //             <div className="product-title">{books.name}</div>
    //             <div className="product-price">{books.price}</div>
    //         </Link>
    //     ));
    // };
    // return (
    //     <div className="home-container">
    //         <div className="you-might-like">
    //             <div className="title-container">
    //                 <div className="title">Result Search</div>
    //             </div>
    //             <div className="product-spread">{spreadProductsMightLike()}</div>
    //         </div>
    //     </div>
    // );
};

export default withRouter(SearchResultPage);