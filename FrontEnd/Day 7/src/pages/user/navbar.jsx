import React, { useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { GiBookAura } from "react-icons/gi";
import '/src/assets/css/navbar.css';
import '/src/assets/css/login.css';
import { CgProfile } from "react-icons/cg";
import RoofingIcon from '@mui/icons-material/Roofing';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportIcon from '@mui/icons-material/Support';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarLinkClick = () => {
    setIsSidebarOpen(false);
  };
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
 

  return ( 
    <div>
      <div className="navbar">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        
        <Link to="/routeTo/home" className="navbar-logo">
        <div className='logohome'>
          <h3 ><GiBookAura /></h3>
           <p>BritCertify...</p>
           </div>
        </Link>
       
        <ul className="nav-items">
          <li>
            <Link to="/routeTo/home">Home</Link>
          </li>
          <li>
            <Link to="/routeTo/courses">Courses</Link>
          </li>
          <li>
            <Link to="/kids">Enquires</Link>
          </li>
          <li>
            <Link to="/routeTo/about">About</Link>
          </li>
          <li>
          <div className="profile-dropdownnav">
            <div className="profile-triggernav"  onClick={toggleProfileDropdown}>
              <CgProfile />
            </div>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown-contentnav">
                <div className='profileIconnav'>
                  <Link to="/routeTo/profile">Profile</Link>
                </div>
                <div className='profileIconnav'>
                  <Link to="/routeTo/login">
                  <p >Log Off</p></Link>
                </div>
              </div>
            )}
          </div>
          </li>
        </ul>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <BsArrowLeft/>
        </button>
        <div className="sidebar-content">
          <h1 style={{fontSize:"35px"}}><GiBookAura /> BritCertify...</h1>
          <hr/>
          <div className='sidebaricons'>
          <h3><PersonIcon /></h3><p>Hello Pravin...</p>
          </div>
            <Link to="/profile" onClick={handleSidebarLinkClick}>
            <div className='sidebaricons'>
            <h3><RoofingIcon /></h3><p>Home</p>
            </div>
          </Link>
          <Link to="/profile" onClick={handleSidebarLinkClick}>
          <div className='sidebaricons'>
          <h3><DashboardCustomizeIcon /></h3><p>Dashboard</p>
          </div>
        </Link>
          <Link to="/profile" onClick={handleSidebarLinkClick}>
          <div className='sidebaricons'>
          <h3><LibraryBooksIcon /></h3><p>Courses</p>
          </div>
          </Link>
          <Link to="/wishlist" onClick={handleSidebarLinkClick}>
          <div className='sidebaricons'>
          <h3><BookmarkIcon /></h3><p>Bookmark</p>
          </div>
          </Link>
          <Link to="/wishlist" onClick={handleSidebarLinkClick}>
          <div className='sidebaricons'>
          <h3><PaymentIcon /></h3><p>Payment History</p>
          </div>
          </Link>
          <Link to="/routeTo/support" onClick={handleSidebarLinkClick}>
          <div className='sidebaricons'>
          <h3><SupportIcon /></h3><p>Support</p>
          </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
