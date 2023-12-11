import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserLayout from "./UserLayout/UserLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Books from "../pages/Books/Books";
import BookInfo from "../pages/BookInfo/BookInfo";
import Error404 from "../pages/Error404/Error404";
import UserProfile from "../pages/User/UserProfile";
import BooksSelling from "../pages/User/BooksSelling";
import BooksPurchased from "../pages/User/BooksPurchased";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import AddBook from "../pages/AddBook/AddBook";

const MainLayout = () => {
    return (
        <div>
            <Header isLoggedIn={true} />
            {/* cái bên dưới là dòng mặc định
                dòng trên là tui truyền props cứng để test thêm route
                <Header />
            */}
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/id" element={<BookInfo />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserLayout />}>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="selling" element={<BooksSelling />} />
                    <Route path="purchased" element={<BooksPurchased />} />
                </Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainLayout;
