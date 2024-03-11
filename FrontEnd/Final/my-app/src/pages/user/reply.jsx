import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MessageIcon from '@mui/icons-material/Message';
import { Email as EmailIcon } from '@mui/icons-material'; 
import defaultImage from "/src/assets/css/images/snapedit_1709987019645.jpeg";
import "/src/assets/css/reply.css"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEnquiryReply } from "../../services/auth";

const ReplyForm = () => {
  const courseDetails = useSelector((state) => state.auth.courseDetails);
  const enquiryDetails = useSelector((state) => state.auth.enquiryDetails);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    reply: "",
  });

 
  useEffect(() => {
    // Set the course details when it's available in Redux state
    if (courseDetails) {
      setMessage({
        courseName: courseDetails.courseName,
        email: enquiryDetails.email,
        enquiryType: enquiryDetails.enquiryType,
        // Add other properties as needed
      });
    }
  }, [courseDetails, enquiryDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEnquiryReply(enquiryDetails.id, formData);
      console.log("Enquiry reply updated:", formData.reply);
      toast.success("Reply updated successfully!!!");
      setFormData(prevState => ({
        ...prevState,
        reply: "",
      }));
    } catch (error) {
      console.error("Error updating enquiry reply:", error);
    }
  };


  return (
    <div className="reply-wrapper">
      <div className="reply-left">
        <div className="reply-container1234567">
          <div className="reply-cardItem">
            {courseDetails ? (
              <div className="reply-course-card">
                <div className="reply-course-card-header">
                  <div className="reply-course-card-image" style={{ backgroundImage: `url(data:image/jpeg;base64,${courseDetails.image})` }}></div>
                  <h3 className="reply-course-card-title">{courseDetails.courseName}</h3>
                </div>
                <div className="reply-course-card-details">
                  <p className="reply-course-duration">Duration: {courseDetails.duration}</p>
                </div>
              </div>
            ) : (
              <div className="reply-course-card">
                <div className="reply-course-card-header">
                  <div className="reply-course-card-image" style={{ backgroundImage: `url(${defaultImage})` }}></div>
                  <h3 className="reply-course-card-title">Course Name</h3>
                </div>
                <div className="reply-course-card-details">
                  <p className="reply-course-duration">Duration: -</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="reply-right">
        <div className="reply-form">
          <h2>Reply</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="reply-form-items">
                <div className="reply-form-input">
                  <p style={{fontFamily: "Satisfy",fontSize:"20px"}}>Course Name  :</p> <p style={{fontFamily:'',fontSize:"18px"}}> - {message.courseName}</p>
                </div>
              </div>
              <div className="reply-form-items">
                <div className="reply-form-input">
                  <p style={{fontFamily: "Satisfy",fontSize:"20px"}}><strong>Email :</strong></p> <p style={{fontFamily:'Times New Roman',fontSize:"18px"}}> - {message.email}</p>
                </div>
              </div>
              <div className="reply-form-items">
                <div className="reply-form-input">
                  <p style={{fontFamily: "Satisfy",fontSize:"20px"}}><strong>EnquiryType  :</strong></p> <p style={{fontFamily:'Times New Roman',fontSize:"18px"}}> - {message.enquiryType}</p>
                </div>
              </div>
              <div className="reply-form-items">
                <div className="reply-form-input">
                  <p style={{fontFamily: "Satisfy",fontSize:"20px"}}><strong>Message  :</strong></p> <p style={{fontFamily:'Times New Roman',fontSize:"18px"}}> - {enquiryDetails.message}</p>
                </div>
              </div>
              <div className="reply-form-message">
                <div className="input-with-icon">
                  <MessageIcon style={{ fontSize: "33px", marginTop:"-25px" }} /> 
                  <textarea
                    className="textarea-field"
                    id="reply"
                    name="reply"
                    value={formData.reply}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter Your reply"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-querry-button">
                <button type="submit" onSubmit={handleSubmit}>Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
