import React from "react";
import '/src/assets/css/support.css';
// import '/src/assets/css/login.css';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';

const Support = () => {

  return (
    <div>
    <div className="ground">
    <div className="contact-container">
    <div className="content123-tn">
    Reach Us      Here
    </div>
    <form className="contact-form">
        <h3>Get in touch</h3>
        <div className="inputfieldcontainers">
        <div className="input-icon">
        <PersonIcon style={{ fontSize: "33px" }} />
        <input required type="text" placeholder="Name" />
        </div>
        <div className="input-icon">
            <EmailIcon style={{ fontSize: "33px" }} />
            <input required type="text" placeholder="Email" />
        </div>
        <div className="input-icon">
            <LocalPhoneIcon style={{ fontSize: "33px" }} />
            <input required type="tel" placeholder="Mobile Number" />
            </div>
            <textarea name='message' id="message" rows={6} placeholder ="...how can we help?" />
        </div>
        <div className="support">
        <button type="submit" className="contact-btn">Submit</button>
        </div>
        </form>
        </div>
        </div>
        
        </div>
  );
};

export default Support;