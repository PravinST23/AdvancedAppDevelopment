import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Email as EmailIcon, LocalPhone as LocalPhoneIcon, Person as PersonIcon } from '@mui/icons-material'; 
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import img from "/src/assets/css/images/man-smoking-cannabis.jpg";
import '/src/assets/css/profile.css';
import { GiBookAura } from "react-icons/gi";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { updateUserDetails } from "../../services/auth";

const Profile = () => {
  const [showProfileLeft, setShowProfileLeft] = useState(false);
  const [profileHeight, setProfileHeight] = useState("92vh"); // State for profile height
  const [buttonText, setButtonText] = useState("View"); // Button text state
  const [userData, setUserData] = useState({}); // State for user data

  // Fetch user data from Redux store
  const authData = useSelector(state => state.auth.userData);

  useEffect(() => {
    // Set user data once when component mounts
    setUserData(authData);
  }, [authData]);

  const handleViewButtonClick = () => {
    setShowProfileLeft(!showProfileLeft);
    setButtonText(showProfileLeft ? "View" : "Update");
    // Toggle profile height between 92vh and auto
    setProfileHeight(profileHeight === "92vh" ? "auto" : "92vh");
  };

  const handleUpdateButtonClick = async () => {
    try {
      const updatedUserData = await updateUserDetails(userData);
      console.log('User details updated successfully:', updatedUserData);
      // setUserData(updatedUserData);
      toast.success('User details updated successfully');
      // You may choose to update the Redux store with the updated user data here if needed
    } catch (error) {
      console.error('Failed to update user details:', error);
      // Handle error or show error message to the user
      toast.error('Failed to update user details');
    }
  };

  return (
    <div className="profile-container" style={{ height: profileHeight }}>
      <div className="profile-left" style={{ display: showProfileLeft ? "block" : "none" }}>
        <div className="profile-header-info">
          <GiBookAura style={{ fontSize: "40px", margin: "0" }} />
          <h1>My Profile</h1>
        </div>
        
        <div className="profile-info-container-wrapper">
          <p>User info</p>
          <div className="profile-info-container">
            <div className="profile-info1">
              <div className="profile-info-row">
                <label className="profile-left-label">Name</label>
                <div className="profile-info-input-container">
                  <div className="input123-icons">
                    <PersonIcon style={{ fontSize: "33px" }} /> {/* Icon */}
                    <input defaultValue={userData.name || ""} placeholder="Enter your name" onChange={(e) => setUserData({...userData, name: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="profile-info-row">
                <label className="profile-left-label">Mobile Number</label>
                <div className="profile-info-input-container">
                  <div className="input123-icons">
                    <LocalPhoneIcon style={{ fontSize: "33px" }} /> {/* Icon */}
                    <input defaultValue={userData.mobilenumber || ""} placeholder="Enter your mobile number" readOnly />
                  </div>
                </div>
              </div>
            
            </div>
            <div className="profile-info2">
              <div className="profile-info-row">
                <label className="profile-left-label">Email</label>
                <div className="profile-info-input-container">
                  <div className="input123-icons">
                    <EmailIcon style={{ fontSize: "33px" }} /> 
                    <input defaultValue={userData.email || ""} placeholder="Enter your email" readOnly />
                  </div>
                </div>
              </div>
              <div className="profile-info-row">
                <label className="profile-left-label">
                  <span> Role </span>
                  <span style={{ paddingLeft: "225px" }}>Age</span>
                </label>
                <div className="profile-info-input-container">
                  <div className="input123-icons">
                    <PersonPinIcon style={{ fontSize: "33px" }} />
                    <input defaultValue={userData.role || ""} style={{ width: "calc(51% - 0px)" }} placeholder="Enter your role" readOnly />
                    <input defaultValue={userData.age || ""} style={{ width: "calc(15% - 0px)", paddingLeft: "20px" }} placeholder="20"  onChange={(e) => setUserData({...userData, age: e.target.value})}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>Contact information</p>
        <div className="profile-contact-wrapper">
          <div className="profile-contact-container">
            <div className="profile-contact-row1">
              <label className="pro-con-label">Address</label>
              <div className="input123-icons">
                <HomeIcon style={{ fontSize: "33px" }} /> {/* Icon */}
                <input type="text" className="pro-con-input" defaultValue={userData.address || ""} placeholder="Enter your address" onChange={(e) => setUserData({...userData, address: e.target.value})} />
              </div>
            </div>

            <div className="profile-contact-row2">
              <div className="profile-contact-row2-items">
                <label className="pro-con-label">State</label>
                <input type="text" defaultValue={userData.state || ""} placeholder="State"  className="pro-con-input" onChange={(e) => setUserData({...userData, state: e.target.value})} />
              </div>
              <div className="profile-contact-row2-items">
                <label className="pro-con-label">City</label>
                  <input type="text" defaultValue={userData.city || ""} placeholder="City" className="pro-con-input" onChange={(e) => setUserData({...userData, city: e.target.value})} />
              </div>
              <div className="profile-contact-row2-items">
                <label className="pro-con-label">Postal code</label>
                <input type="text" defaultValue={userData.postalcode || ""} placeholder="Postal Code" className="pro-con-input" onChange={(e) => setUserData({...userData, postalcode: e.target.value})} />
              </div>
            </div>
          </div>
        </div>
        <p>Skills</p>
        <div className="profile-left-about-container">
          <textarea placeholder="Describe Your Skills!!!" defaultValue={userData.skills || ""} onChange={(e) => setUserData({...userData, skills: e.target.value})}></textarea>
        </div>
      </div>
      <div className="profile-card">
        <div className="gradient-container">
          <button className="left-arrow-btn" onClick={handleViewButtonClick}>
            <FaArrowLeft
              style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px", backgroundColor:"rgb(193, 226, 255)" }}
            />
          </button>
          <BsThreeDotsVertical
            style={{
              fontSize: "20px",
              marginRight: "20px",
              marginTop: "72px",
              fontWeight: "bolder",
            }}
          />
        </div>
        <div
          className="profile-content"
          style={{
            height: "350px",
            color: "black",
          }}
        >
          <div className="profile-image">
            <img src={userData.profilePicture || img} alt="Profile" />
          </div>
          <h1
            className="profile-heading"
            style={{ textAlign: "center", marginTop: "10px", fontFamily: "Protest Guerrilla" }}
          >
            {userData.name || "Name"}
          </h1>
          <p
            className="profile-subheading"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            {userData.state || "Address"}
          </p>

          <div className="profile-info">
            <div className="info-row">
              <p>Age</p>
              <div className="info-row-data">
                <p>: {userData.age || "-"}</p>
              </div>
            </div>
            <div className="info-row">
              <p>Role</p>
              <div className="info-row-data">
                <p>: {userData.role || "Role"}</p>
              </div>
            </div>
            <div className="info-row">
              <p>Email</p>
              <div className="info-row-data">
                <p>: {userData.email || "Email"}</p>
              </div>
            </div>
            <div className="info-row">
              <p>Phone</p>
              <div className="info-row-data">
                <p>: {userData.mobilenumber || "Phone"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <button className="profile-bottom-btn" onClick={showProfileLeft ? handleUpdateButtonClick : handleViewButtonClick}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
