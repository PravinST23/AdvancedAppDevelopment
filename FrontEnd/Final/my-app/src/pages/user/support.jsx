import React, { useState } from "react";
import "/src/assets/css/support.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import emailjs from "emailjs-com";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5jjfxih",
        "template_qcltqy2",
        e.target,
        "WHVDoLNCZ01fkh6s0"
      )
      .then(
        (result) => {
          toast.success("Email sent successfully!!!");
          // Clear the form after successful submission
          setFormData({
            name: "",
            email: "",
            mobileNumber: "",
            message: "",
          });
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send email. Please try again later.");
        }
      );
  };

  return (
    <div>
      <div className="ground">
        <div className="contact-container">
          <div className="content123-tn">Reach Us Here</div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Get in touch</h3>
            <div className="inputfieldcontainers">
              <div className="input-icon">
                <PersonIcon style={{ fontSize: "33px" }} />
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="input-icon">
                <EmailIcon style={{ fontSize: "33px" }} />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="input-icon">
                <LocalPhoneIcon style={{ fontSize: "33px" }} />
                <input
                  required
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
              <textarea
                name="message"
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="...how can we help?"
              />
            </div>
            <div className="support">
              <button type="submit" className="contact-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
