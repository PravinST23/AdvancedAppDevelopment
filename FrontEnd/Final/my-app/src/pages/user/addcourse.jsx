import React, { useState } from "react";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { saveCourse } from "../../services/auth";
import "/src/assets/css/addcourse.css"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    duration: "",
    fees: "",
    level: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleImageChange = (e) => {
    setCourseData({ ...courseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send course data to the backend for storing
      await saveCourse(courseData);
      // console.log("Course saved successfully:", courseData);
      toast.success("Course Added Successfully")
      // Reset form fields
      setCourseData({
        courseName: "",
        duration: "",
        fees: "",
        level: "",
        image: null
      });
    } catch (error) {
      // console.error("Error saving course:", error);
      // Display a meaningful error message to the user
      toast.error("Failed to save course. Please try again later.");
    }
  };
  

  return (
    <div className="add-course-wrapper">
      <div className="enquiry-left">
        <div className="container1234567">
          <h1>BritCertify</h1>
          <div className="photo123"></div>
        </div>
      </div>
      <div className="enquiry-right">
        <div className="enquiry-form">
          <h2>CourseCast</h2>
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
                    value={courseData.courseName}
                    onChange={handleChange}
                    placeholder="Course Name"
                    required
                  />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <HourglassTopIcon style={{ fontSize: "33px" }} />
                  <input
                    className="enquery-input-field"
                    type="text"
                    id="duration"
                    name="duration"
                    value={courseData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                    required
                  />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <CurrencyRupeeIcon style={{ fontSize: "33px" }} />
                  <input
                    className="enquery-input-field"
                    type="text"
                    id="fees"
                    name="fees"
                    value={courseData.fees}
                    onChange={handleChange}
                    placeholder="Fees"
                    required
                  />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <select
                    className="input-select"
                    id="level"
                    name="level"
                    value={courseData.level} 
                    onChange={handleChange}
                    required 
                  >
                    <option value="" disabled>Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <ArrowDropDownIcon style={{ fontSize: "33px", marginLeft: "360px" }} />
                </div>
              </div>
              <div className="enquiry-form-items">
                <div className="input-with-icon">
                  <AddPhotoAlternateIcon style={{ fontSize: "33px" }} />
                  <input
                    className="enquery-input-field"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>
              <div className="form-querry-button">
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;
