import { Outlet, NavLink } from "react-router-dom";
import "./UserLayout.css";

const UserLayout = () => {
    return (
        <div>
            <div className="user-container">
                <div className="side-bar">
                    <div className="side-bar-section">
                        <div className="section-heading">
                            <NavLink to="/user/profile" className={({ isActive }) => ["nav-link", isActive ? "active-nav-link" : null].filter(Boolean).join(" ")}>
                                Manage account
                            </NavLink>
                        </div>
                    </div>
                    <div className="side-bar-section">
                        <div className="section-heading">Books</div>
                        <div className="side-bar-subsection">
                            <NavLink to="/user/selling" className={({ isActive }) => ["nav-link", isActive ? "active-nav-link" : null].filter(Boolean).join(" ")}>
                                Books for sale
                            </NavLink>
                        </div>
                        <div className="side-bar-subsection">
                            <NavLink to="/user/purchased" className={({ isActive }) => ["nav-link", isActive ? "active-nav-link" : null].filter(Boolean).join(" ")}>
                                Books purchased
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
