import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import img from "/src/assets/css/images/man-smoking-cannabis.jpg";
import "/src/assets/css/profile.css";

const Profile = () => {
  const userData = {
    name: "Shankar",
    address: "Coimbatore, Tamil Nadu",
    Role: "Admin",
    Email_Address: "gowrishankardivakar7@gmail.com",
    Phone_Number: "1234567890",
    age: "20",
    profilePicture: img,

  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="gradient-container">
          <FaArrowLeft
            style={{ fontSize: "20px", marginLeft: "20px", marginTop: "30px" }}
          />
          <BsThreeDotsVertical
            style={{
              fontSize: "20px",
              marginRight: "20px",
              marginTop: "30px",
              fontWeight: "bolder",
            }}
          />
        </div>

        <div
          className="profile-content"
        >
        <div className="profile-image">
        <img src={userData.profilePicture} alt="Profile" />
      </div>

          <h1
            className="profile-heading"
            style={{ textAlign: "center", marginTop: "10px" ,fontFamily:"Protest Guerrilla", fontStyle:"normal",fontWeight:"50"}}
          >
            {userData.name}
          </h1>
          <p
            className="profile-subheading"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            {userData.address}
          </p>

          <div className="profile-info">
            <div className="info-row">
              <p>Age</p>
              <div className="info-row-data">
                <p>: {userData.age}</p>
              </div>
            </div>
            <div className="info-row">
              <p>Role</p>
              <div className="info-row-data"><p>: {userData.Role}</p></div>
            </div>
            <div className="info-row">
              <p>Email</p>
              <div className="info-row-data"><p>: {userData.Email_Address}</p></div>
            </div>
            <div className="info-row">
              <p>Phone</p>
              <div className="info-row-data"><p>: {userData.Phone_Number}</p></div>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <button className="profile-bottom-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;