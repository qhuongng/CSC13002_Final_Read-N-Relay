import { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState("Select...");
    const dropdownOptions = props.array.map((item) => (
        <div
            onClick={(e) => {
                setIsSelected(e.target.textContent);
                setIsActive(!isActive);
            }}
            className="item"
        >
            {item}
        </div>
    ));

    return (
        <div className="dropdown">
            <div
                onClick={(e) => {
                    setIsActive(!isActive);
                }}
                className="dropdown-btn"
            >
                {selected}
                <span className={isActive ? "caret-up" : "caret-down"} />
            </div>
            <div className="dropdown-content" style={{ display: isActive ? "block" : "none" }}>
                {dropdownOptions}
            </div>

            {isActive ? <div className="overlay" onClick={() => setIsActive(false)} /> : null}
        </div>
    );
};

export default Dropdown;
