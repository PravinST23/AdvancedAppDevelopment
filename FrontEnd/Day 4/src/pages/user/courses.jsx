import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '/src/assets/css/courses.css';
import { faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import data from './data.json';

const Courses = () => {
  const [searchValue, setSearchValue] = useState(''); // Define searchValue state

  const filteredProducts = data.filter(item =>
    item.courseName.toLowerCase().includes(searchValue.toLowerCase())
  );

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
                onChange={(e) => setSearchValue(e.target.value)} // Update searchValue on input change
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
               
              <div className="menuIcons">
              <div>
              <FontAwesomeIcon icon={faBookmark} />
              </div>
              </div>
              
                <p style={{ paddingLeft: "0px" }} className="stock">Duration: {item.ExamLength}</p>
              <div className='enroll'>
              <button><p style={{paddingLeft:"0px"}}>
              Enroll
              </p>
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
