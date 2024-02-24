import React from "react";
import { Link } from 'react-router-dom';
import '/src/assets/css/home.css';

const Home = () => {
  return (
    <div className="homepage">
    <div className='content'>
    <h1 style={{paddingTop: "130px"}}>Empower Your Future: Learn, Grow, Succeed!</h1>
    <div className="type">
    Elevate your skills, earn your certificate, and open doors to endless opportunities.
    </div>
    <Link to="/routeTo/courses">
    <button className='theme' style={{marginTop : "30px"}}>
    View Courses
    </button>
    </Link>
    </div>
    </div>
  );
};

export default Home;