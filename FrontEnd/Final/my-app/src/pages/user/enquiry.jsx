import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { saveEnquiry, fetchCourseDetails } from "../../services/auth";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MessageIcon from '@mui/icons-material/Message';
import { Email as EmailIcon } from '@mui/icons-material'; 
import defaultImage from "/src/assets/css/images/snapedit_1709987019645.jpeg";
import "/src/assets/css/enquiry.css"; // Adjust the path to your CSS file
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnquiryForm = () => {
  const [enquiryData, setEnquiryData] = useState({
    courseName: "",
    description: "",
    email: "",
    enquiryType: "",
    message: "",
  });

  // Access course details from Redux state
  const courseDetails = useSelector((state) => state.auth.courseDetails);

  useEffect(() => {
    // Set the course details when it's available in Redux state
    if (courseDetails) {
      setEnquiryData({
        ...enquiryData,
        courseName: courseDetails.courseName,
        // Add other properties as needed
      });
    }
  }, [courseDetails]); // Make sure to include courseDetails in the dependency array to re-render when it changes

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEnquiryData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Fetch course details when the course name input field changes
    if (name === 'courseName') {
      try {
        const courseData = await fetchCourseDetails(value);
        setEnquiryData(prevData => ({
          ...prevData,
          courseName: courseData.courseName,
          // Update other properties with the fetched course details
        }));
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the enquiry data to the backend
      const response = await saveEnquiry(enquiryData);
      console.log("Enquiry submitted:", response);
      toast.success("Query Sent Successfully!!!");
      // Reset form fields after successful submission
      setEnquiryData({
        courseName: "",
        description: "",
        email: "",
        enquiryType: "",
        message: "",
      });
      // Optionally, you can show a success message or redirect the user after successful submission
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="enquiry-wrapper">
      <div className="enquiry-left">
        <div className="container1234567">
          <div className="cardItem">
            {courseDetails ? (
              <div className="course-card">
                <div className="course-card-header">
                  <div className="course-card-image" style={{ backgroundImage: `url(data:image/jpeg;base64,${courseDetails.image})` }}></div>
                  <h3 className="course-card-title">{courseDetails.courseName}</h3>
                </div>
                <div className="course-card-details">
                  <p className="course-duration">Duration: {courseDetails.duration}</p>
                </div>
              </div>
            ) : (
              <div className="course-card">
                <div className="course-card-header">
                  <div className="course-card-image" style={{ backgroundImage: `url(${defaultImage})` }}></div>
                  <h3 className="course-card-title">Course Name</h3>
                </div>
                <div className="course-card-details">
                  <p className="course-duration">Duration: -</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="enquiry-right">
        <div className="enquiry-form">
          <h2>Query</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <LibraryBooksIcon style={{ fontSize: "33px" }} /> 
                  <input
                    className="enquery-input-field"
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={enquiryData.courseName}
                    onChange={handleChange}
                    placeholder="Course Name"
                    required
                  />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <EmailIcon style={{ fontSize: "33px" }} /> 
                  <input
                    className="enquery-input-field"
                    type="email"
                    id="email"
                    name="email"
                    value={enquiryData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <select
                    className="input-select"
                    id="enquiryType"
                    name="enquiryType"
                    value={enquiryData.enquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>Select Enquiry Type</option>
                    <option value="Course Details">Course Details</option>
                    <option value="Fees">Fees</option>
                    <option value="Other">Other</option>
                  </select>
                  <ArrowDropDownIcon style={{ fontSize: "33px", marginLeft: "360px" }} /> 
                </div>
              </div>
              <div className="enquiry-form-message">
                <div className="input-with-icon">
                  <MessageIcon style={{ fontSize: "33px", marginTop:"-25px" }} /> 
                  <textarea
                    className="textarea-field"
                    id="message"
                    name="message"
                    value={enquiryData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter Your Queries"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-querry-button">
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
