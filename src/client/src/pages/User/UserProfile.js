import "./UserProfile.css";
import * as API from "../../utils/API.js"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const {userId}=useParams();
    const [userProfile,setUserProfile] =useState(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            //Fetch cart
            const Profile=await API.getUserProfileByAttributes({userId: userId})
            setUserProfile(Profile)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, [userId]);
    return (
        <div className="profile-container">
            <div className="profile-photo-group">
                <div className="edit-overlay">
                    <div className="overlay-icon"></div>
                    <div className="overlay-bg"></div>
                </div>
                <div className="profile-photo"></div>
            </div>
            <div className="info-group">
                <div className="info-group-item">
                    <label htmlFor="fname">First name</label>
                    <input type="text" id="fname" placeholder="First name" required />
                </div>
                <div className="info-group-item">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" id="lname" placeholder="Last name" required />
                </div>
            </div>
            <div className="info-group">
                <div className="info-group-item">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" required />
                </div>
                <div className="info-group-item">
                    <label htmlFor="addr">Address</label>
                    <input type="text" id="addr" placeholder="Address" required />
                </div>
            </div>
            <div className="password-group">
                <label>Change password</label>
                <input type="password" id="cur-psw" placeholder="Current password" required />
                <input type="password" id="new-psw" placeholder="New password" required />
                <input type="password" id="conf-psw" placeholder="Confirm new password" required />
                <div className="save-button">Save changes</div>
            </div>
        </div>
    );
};

export default UserProfile;
