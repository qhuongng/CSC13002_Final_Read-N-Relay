import "./BooksSelling.css";
import { Link } from "react-router-dom";
import * as API from "../../utils/API.js";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert/Alert";

const BooksSelling = () => {
    const [sellingbooks, setSellingBooks] = useState([]);
    const [alert, setAlert] = useState("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Fetch CurrentUserId
    //             const user = await API.getCurrentUser();

    //             //Fetch SellBooks
    //             const SellBooks = await API.getBooksByAttributes({ userId: user[0].userId });
    //             setSellingBooks(SellBooks);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // mình cần tách fetchdata vs useEffect ra riêng để tái sử dụng fetchData sau khi xóa products. Phần comment phía trên là code cũ. 
    const fetchData = async () => {
        try {
            // Fetch CurrentUserId
            const user = await API.getCurrentUser();

            // Fetch SellBooks
            const SellBooks = await API.getBooksByAttributes({ userId: user[0].userId });
            setSellingBooks(SellBooks);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleRemoveBook = async (productId, userId) => {
        setAlert("");
        try {
            console.log(productId);
            console.log(userId)
            await API.DeleteBook({ productId, userId });
            // Sau khi xóa sách thành công, cập nhật lại danh sách sách đang bán
            const updatedSellBooks = sellingbooks.filter(book => book.productId !== productId);
            setSellingBooks(updatedSellBooks);
            // push noti
            setAlert("Removed book successfully.");
            // fetch lại data sau khi xóa sách
            fetchData();
        } catch (error) {
            console.error('Error delete book!', error);
        }
    };



    const spreadSaleItems = () => {
        return sellingbooks.map((book, index) => (
            <div className="sales-table-row" key={index}>
                <div className="sales-table-row-item">
                    <div className="sales-item-photo-container">
                        <img src={book.image} alt={book.name} className="sales-item-photo" />
                    </div>
                    <div className="sales-item-name">{book.name}</div>
                </div>
                <div className="sales-table-row-item">{book.price} VND</div>
                <div className="sales-table-row-item">For sale</div>
                <div className="sales-table-row-item">
                    <div className="sales-button-group">
                        <Link to="/add" className="edit-button">
                            Edit
                        </Link>
                        <div className="remove-button" onClick={() => handleRemoveBook(book.id, book.userId)}>Remove</div>
                        {alert && <Alert message={alert} type="notype" />}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="sales-container">
            <div className="sales-table">
                <div className="sales-table-header">
                    <div className="sales-table-header-item">Book</div>
                    <div className="sales-table-header-item" id="price">
                        Price
                    </div>
                    <div className="sales-table-header-item">Status</div>
                    <div className="sales-table-header-item">
                        <div className="sales-blank"></div>
                    </div>
                </div>
                <div className="sale-table-rows">{spreadSaleItems()}</div>
            </div>
        </div>
    );
};

export default BooksSelling;