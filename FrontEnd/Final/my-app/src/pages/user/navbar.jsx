import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { GiBookAura } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import RoofingIcon from "@mui/icons-material/Roofing";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportIcon from "@mui/icons-material/Support";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import QueueIcon from "@mui/icons-material/Queue";
import MessageIcon from "@mui/icons-material/Message";
import "/src/assets/css/navbar.css";
import "/src/assets/css/login.css";
import { useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate hook
  const userData = useSelector((state) => state.auth.userData);
  const userRole = userData.role;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Remove token from sessionStorage
    navigate("/routeTo/login"); // Redirect to login page after logout using navigate
  };

  return (
    <div>
      <div className="navbar">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars style={{ fontSize: "23px" }} />
        </button>

        <Link to="/routeTo/home" className="navbar-logo">
          <div className="logohome">
            <h3>
              <GiBookAura />
            </h3>
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
            <Link to="/routeTo/enquiry">Enquires</Link>
          </li>
          <li>
            <Link to="/routeTo/about">About</Link>
          </li>
          {userRole === "ADMIN" ? (
            <li>
              <div className="profile-dropdownnav" ref={profileDropdownRef}>
                <div
                  className="profile-triggernav"
                  onClick={toggleProfileDropdown}
                >
                  <CgProfile />
                </div>
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown-contentnav">
                    <div className="profileIconnav">
                      <Link to="/routeTo/profile">Profile</Link>
                    </div>
                    <div className="profileIconnav" onClick={handleLogout}>
                      <Link to="/routeTo/login">
                        <p>Log Off</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ) : null}
        </ul>
      </div>
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <button className="close-sidebar" onClick={toggleSidebar}>
          <BsArrowLeft />
        </button>
        <div className="sidebar-content">
          <h1 style={{ fontSize: "33px" }}>
            <GiBookAura style={{ position: "relative", marginTop: "4px" }} />{" "}
            BritCertify...
          </h1>
          <hr />

          {userRole === "ADMIN" && (
            <div>
              <Link to="/routeTo/dashboard" onClick={handleSidebarLinkClick}>
                <div className="sidebaricons">
                  <h3>
                    <DashboardCustomizeIcon style={{marginTop:"3px"}}/>
                  </h3>
                  <p>Dashboard</p>
                </div>
              </Link>
              <Link to="/routeTo/addcourse" onClick={handleSidebarLinkClick}>
                <div className="sidebaricons">
                  <h3>
                    <QueueIcon style={{marginTop:"3px"}}/>
                  </h3>
                  <p>CourseCast</p>
                </div>
              </Link>
            </div>
          )}
          {userRole === "USER" && (
            <div>
              <Link to="/routeTo/profile" onClick={handleSidebarLinkClick}>
                <div className="sidebaricons">
                  <h3>
                  <CgProfile style={{marginTop:"5px"}} />
                  </h3>
                  <p>Profile</p>
                </div>
              </Link>
            </div>
          )}

          <Link
            to={userRole === "ADMIN" ? "/routeTo/query" : "/routeTo/message"}
            onClick={handleSidebarLinkClick}
          >
            <div className="sidebaricons">
              <h3>
                <MessageIcon style={{marginTop:"5px"}}/>
              </h3>
              <p>{userRole === "ADMIN" ? "View Queries" : "Message"}</p>
            </div>
          </Link>

          <Link to="/routeTo/payment" onClick={handleSidebarLinkClick}>
            <div className="sidebaricons">
              <h3>
                <PaymentIcon style={{marginTop:"3px"}}/>
              </h3>
              <p>Payment History</p>
            </div>
          </Link>
          <Link to="/routeTo/support" onClick={handleSidebarLinkClick}>
            <div className="sidebaricons">
              <h3>
                <SupportIcon style={{marginTop:"4px"}}/>
              </h3>
              <p>Support</p>
            </div>
          </Link>
          <Link to="/routeTo/login" onClick={handleSidebarLinkClick}>
            <div className="sidebaricons">
              <h3>
                <LogoutIcon style={{marginTop:"4px"}}/>
              </h3>
              <p>Log Off</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
