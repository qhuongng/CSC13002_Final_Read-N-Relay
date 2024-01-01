import "./Alert.css";
import React, { Component, useEffect, useState  } from "react";
import { Link } from "react-router-dom";

// class Alert extends Component {
//     timer;

//     constructor(props) {
//         super(props);
//         this.state = {
//             isActive: true,
//         };
//     }

//     hideAlert = () => {
//         this.setState({
//             isActive: false,
//         });
//     };

//     componentDidMount = () => {
//         this.timer = setTimeout(() => this.hideAlert(), 5000);
//     };

//     render() {
//         if (this.state.isActive) {
//             return (
//                 <div className="alert-container">
//                     <div className={this.state.isActive ? "visible" : "hidden"}></div>
//                     <div className="close-alert-button" onClick={() => this.hideAlert()}></div>
//                     <div className="alert-message">{this.props.message}</div>
//                     {this.props.type === "order" ? (
//                         <Link to="/user/purchased" className="view-button" onClick={() => this.hideAlert()}>
//                             View purchases
//                         </Link>
//                     ) : this.props.type === "notype" ? (
//                         <></>
//                     ) : (
//                         <Link to="/user/selling" className="view-button" onClick={() => this.hideAlert()}>
//                             View published books
//                         </Link>
//                     )}
//                 </div>
//             );
//         }
//     }
// }

// export default Alert;


const Alert = ({message,type}) =>{
    const [isActive, setIsActive] = useState(true);

  const hideAlert = () => {
    setIsActive(false);
  };

  useEffect(() => {
    setIsActive(true); // nếu prop message thay đổi, set lại isActive thành true để hiển thị Alert
    const timer = setTimeout(() => hideAlert(), 5000);
    return () => clearTimeout(timer);
  }, [message]); 

  if (isActive) {
    return (
      <div className="alert-container">
        <div className={isActive ? "visible" : "hidden"}></div>
        <div className="close-alert-button" onClick={hideAlert}></div>
        <div className="alert-message">{message}</div>
        {type === "order" ? (
          <Link to="/user/purchased" className="view-button" onClick={hideAlert}>
            View purchases
          </Link>
        ) : type === "notype" ? (
          <></>
        ) : (
          <Link to="/user/selling" className="view-button" onClick={hideAlert}>
            View published books
          </Link>
        )}
      </div>
    );
  } else {
    return null; // Nếu isActive là false, không render gì cả
  }
};

export default Alert;
