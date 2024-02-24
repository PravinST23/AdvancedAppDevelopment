import React from "react";
import propTypes from "prop-types";
import Navbar from "./navbar";
import Footer from "./footer";
const UserLayout = ({children}) => {
  return (
    <div className="user_container">
      <header>
        <Navbar/>
      </header>
      <main>{children}</main>
      <footer>
      <Footer/>
      </footer>
    </div>
  );
};

UserLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default UserLayout;