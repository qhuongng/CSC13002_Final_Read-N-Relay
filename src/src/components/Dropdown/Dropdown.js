import { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState("Select...");

    const handleItemClick = (item) => {
        setSelected(item);
        setIsActive(false);

        // Call the callback function with the selected item
        if (props.onItemSelected) {
            props.onItemSelected(item);
        }
    };

    const dropdownOptions = props.array.map((item) => (
        <div
            key={item} // Adding a unique key for each item
            onClick={() => handleItemClick(item)}
            className="item"
        >
            {item}
        </div>
    ));

    return (
        <div className="dropdown">
            <div
                onClick={() => setIsActive(!isActive)}
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