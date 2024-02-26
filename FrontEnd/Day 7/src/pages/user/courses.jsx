import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSearch, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import '/src/assets/css/courses.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from './data.json';

const Courses = () => {
  const [searchValue, setSearchValue] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredProducts = data.filter(item =>
    item.courseName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleEnroll = (courseName) => {
    setEnrolledCourses([...enrolledCourses, courseName]);
    toast.success('Course Enrolled Successfully!!!');
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

  return (
    <div className='coursespage'>
      <ToastContainer />
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
          {filteredProducts.map((item, index) => (
            <div className="menuItem" key={index}>
              <div className="menuItemImg" style={{ backgroundImage: `url(${item.img})` }} />
              <div className='product-img-details'>
                <h2 className="menuItemName">{item.courseName}</h2>
              </div>
              <p className="stock">Duration: {item.ExamLength}</p>
              <div className="menuIcons">
              <div className='levelcontainer'>
                <div>
                    <p>{item.level}</p>
                </div>
              </div>
              <div className='enrollbuttoncontainer'>
              <div className='enroll'>
                {isEnrolled(item.courseName) ? (
                  <p style={{ paddingLeft: "23px", fontSize: "20px", fontFamily: "Satisfy" ,position:"absolute",bottom:"15px"}}>Enrolled</p>
                ) : (
                  <button onClick={() => handleEnroll(item.courseName)} disabled={isEnrolled(item.courseName)}>
                    <p style={{ paddingLeft: "0px" }}>
                      Enroll
                    </p>
                  </button>
                )}
              </div>
              </div>
              <div className='dotcontainer'>
              <FontAwesomeIcon icon={faEllipsisV} className="ellipsisIcon" onClick={() => toggleDropdown(item.courseName)} />
              {dropdownOpen && selectedCourse === item.courseName && (
                <div className="dropdown">
                  <ul>
                    <li>Enquiry</li>
                    <li>Bookmark</li>
                  </ul>
                </div>
              )}
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
