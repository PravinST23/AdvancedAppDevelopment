import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '/src/assets/css/courses.css';
import { fetchCourses, savePaymentDetails } from '../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseDetails, setSaveCourse } from '/src/redux/authSlice'; // Import action
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [searchValue, setSearchValue] = useState('');
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  
  useEffect(() => {
    fetchCoursesData(); // Fetch courses when the component mounts
  }, []);
  
  const fetchCoursesData = async () => {
    try {
      const coursesData = await fetchCourses(); 
      const coursesWithFees = coursesData.data.map(course => ({
        ...course,
        courseFees: course.fees 
      }));
      setCourses(coursesWithFees); // Set the fetched courses to state
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.tagName !== "LI") {
      setDropdownOpen(false);
    }
  };
  
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchValue.toLowerCase())
  );
    
  const handleEnroll = (courseName, courseFees) => {
    // Prepare options for Razorpay payment
    const fees = parseInt(courseFees);  
    const options = {
      key: 'rzp_test_uSqWKFv7vJJ5Ul', 
      key_secret:'0j6473bIufMhq7j32toMMbDK',
      amount:fees*100, 
      currency: 'INR',
      name: userData.name, // Prefill user's name
      description: `Enrollment for ${courseName}`,
      // image: '"D:\App Development\my-app\src\assets\css\images\logo.jpeg"', // Your logo URL
      handler: function (response) {
        // Handle successful payment
        toast.success('Payment Successful!!!');
        savePaymentDetails({
          name: userData.name,
          email: userData.email,
          mobileNumber: userData.mobilenumber,
          date: new Date().toISOString(), 
          courseName: courseName,
          fees: courseFees,
          paymentId: response.razorpay_payment_id,
          status: 'Paid'
        });
        setEnrolledCourses([...enrolledCourses, courseName]);
      },
      prefill: {
        name: userData.name, // Prefill user's name
        email: userData.email, // Prefill user's email
        contact: userData.mobilenumber, // Prefill user's mobile number
      },
      theme: {
        color: '#3399cc'
      }
    };

    // Open Razorpay payment dialog
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const toggleBookmark = (courseName) => {
    if (bookmarkedCourses.includes(courseName)) {
      setBookmarkedCourses(bookmarkedCourses.filter(course => course !== courseName));
      toast.warning(`Removed "${courseName}" BookMark`);
    } else {
      setBookmarkedCourses([...bookmarkedCourses, courseName]);
      toast.success(`"${courseName}" Added ! 🌟`);
    }
  };

  const toggleDropdown = (courseName) => {
    if (selectedCourse === courseName) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setSelectedCourse(courseName);
      setDropdownOpen(true);
    }
  };

  const isEnrolled = (courseName) => {
    return enrolledCourses.includes(courseName);
  };

  const isBookmarked = (courseName) => {
    return bookmarkedCourses.includes(courseName);
  };

  const handleEnquiry = (course) => {
    // Dispatch action to store course details in Redux
    dispatch(setCourseDetails(course));
    // Navigate to the enquiry page
    navigate('/routeTo/enquiry');
  };

  const handleSave = (course, actionName) => {
    // Dispatch action to store the entire course value in Redux
    dispatch(setSaveCourse(course));
    toast.success(`${actionName} Successful!`);
  };

  return (
    <div className='coursespage'>
      <div className="menu">
        <div className="menuHeader">
          <h1 className="menuTitle">Courses</h1>
          <div className='search-container'>
            <div className='search'>
              <div className="searchIcon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="menuList">
          {filteredCourses.map((course, index) => (
            <div className='blur-color ' key={index}>
              <div className="menuItem">
                <div className="menuItemImg" style={{ backgroundImage: `url(data:image/jpeg;base64,${course.image})` }} />
                <div className='product-img-details'>
                  <h2 className="menuItemName">{course.courseName}</h2>
                </div>
                <p className="stock">Duration: {course.duration}</p>
                <div className="menuIcons">
                  <div className='levelcontainer'>
                    <div>
                      <p>{course.level}</p>
                    </div>
                  </div>
                  <div className='enrollbuttoncontainer'>
                    <div className='enroll'>
                      {isEnrolled(course.courseName) ? (
                        <p style={{ paddingLeft: "23px", fontSize: "20px", fontFamily: "Satisfy", position: "absolute", bottom: "15px" }}>Enrolled</p>
                      ) : (
                        <button onClick={() => handleEnroll(course.courseName, course.courseFees)} disabled={isEnrolled(course.courseName)}>
                          <p style={{ paddingLeft: "0px" }}>
                            Enroll
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className='dotcontainer' ref={dropdownRef}>
                    <FontAwesomeIcon icon={faEllipsisV} className="ellipsisIcon" onClick={() => toggleDropdown(course.courseName)} />
                    {dropdownOpen && selectedCourse === course.courseName && (
                      <div className="dropdown">
                        <ul>
                          <li onClick={() => handleSave(course, "Save")}>Save</li>
                          <li onClick={() => { handleEnquiry(course); setSelectedCourse(null); }}>Enquiry</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
