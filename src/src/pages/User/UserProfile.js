import "./UserProfile.css";
import * as API from "../../utils/API.js"
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [inputNameValue, setNameValue] = useState('')
  const [inputEmailValue, setEmailValue] = useState('')
  const [inputAddressValue, setAddressValue] = useState('')
  const [inputOldPasswordValue, setOldPasswordValue] = useState('')
  const [inputNewPasswordValue, setNewPasswordValue] = useState('')
  const [inputConfirmPasswordValue, setConfirmPasswordValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetch Current User
        const user = await API.getCurrentUser();
        //Fetch cart
        const Profile = await API.getUserProfileByAttributes({ id: user[0].userId })
        setUserProfile(Profile);
        setNameValue(Profile[0].name)
        setEmailValue(Profile[0].email)
        setAddressValue(Profile[0].address)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNameValue(newName); // Update the input value as the user types
  };
  const handleEmailChange = (event) => {
    const newName = event.target.value;
    setEmailValue(newName); // Update the input value as the user types
  };
  const handleAddressChange = (event) => {
    const newName = event.target.value;
    setAddressValue(newName); // Update the input value as the user types
  };
  const handleOldPWChange = (event) => {
    const newName = event.target.value;
    setOldPasswordValue(newName); // Update the input value as the user types
  };
  const handleNewPWChange = (event) => {
    const newName = event.target.value;
    setNewPasswordValue(newName); // Update the input value as the user types
  };
  const handleConfirmPWChange = (event) => {
    const newName = event.target.value;
    setConfirmPasswordValue(newName); // Update the input value as the user types
  };
  const handleUserChange = ({ name, email, address, Opassword, Npassword, Cpassword }) => {
    if (Opassword == userProfile[0].password) {
      if (Npassword == Cpassword) {
        API.UpdateUserProfileByID({
          id: userProfile[0].id,
          name: name,
          email: email,
          address: address,
          password: Npassword, // Use the new password for updating
        });
        console.log("Change Completed!")
      }
      else console.log("Confirm not match New!")
    }
    else console.log("Wrong Password!")
  };

  return (
    <div className="profile-container">
      <div className="info-group">
        <div className="info-group-item-name">
          <label>Full name</label>
          <input type="text" id="fname" placeholder="Full name" required value={inputNameValue} onChange={handleNameChange} />
        </div>
      </div>
      <div className="info-group">
        <div className="info-group-item">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required value={inputEmailValue} onChange={handleEmailChange} />
        </div>
        <div className="info-group-item">
          <label htmlFor="addr">Address</label>
          <input type="text" id="addr" placeholder="Address" required value={inputAddressValue} onChange={handleAddressChange} />
        </div>
      </div>
      <div className="password-group">
        <label>Change password</label>
        <input type="password" id="cur-psw" placeholder="Current password" required value={inputOldPasswordValue} onChange={handleOldPWChange} />
        <input type="password" id="new-psw" placeholder="New password" required value={inputNewPasswordValue} onChange={handleNewPWChange} />
        <input type="password" id="conf-psw" placeholder="Confirm new password" required value={inputConfirmPasswordValue} onChange={handleConfirmPWChange} />
        <div className="save-button" onClick={() => {
          handleUserChange(
            {
              name: inputNameValue,
              email: inputEmailValue,
              address: inputAddressValue,
              Opassword: inputOldPasswordValue,
              Npassword: inputNewPasswordValue,
              Cpassword: inputConfirmPasswordValue
            })
        }}>Save changes</div>
      </div>
    </div>
  );
};
export default UserProfile;