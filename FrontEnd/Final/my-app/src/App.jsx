import React, { lazy} from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import UserLayout from "./pages/user/userLayout";
import LazyLayout from "./pages/lazyLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LazyLogin = lazy(() => import("./pages/user/login"));
const LazyHome = lazy(() => import("./pages/user/home"));
const LazySupport = lazy(() => import("./pages/user/support"));
const LazyAbout = lazy(() => import("./pages/user/about"));
const LazyCourses = lazy(() => import("./pages/user/courses"));
const LazyProfile = lazy(() => import("./pages/user/profile"));
const LazyDashboard = lazy(() => import("./pages/user/dashboard"));
const LazyEnquiry = lazy(() => import("./pages/user/enquiry"));
const LazyAddCourse = lazy(() => import("./pages/user/addcourse"));
const LazyQuery = lazy(() => import("./pages/user/query"));
const LazyReply = lazy(() => import("./pages/user/reply"));
const LazySave = lazy(() => import("./pages/user/Save"));
const LazyPayment = lazy(() => import("./pages/user/payment"));
const LazyMessage = lazy(() => import("./pages/user/message"));
const LazyForgot = lazy(() => import("./pages/user/forgot"));


const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/home" element={<LazyLayout component={LazyHome} />} />
        <Route path="/support" element={<LazyLayout component={LazySupport} />} />
        <Route path="/about" element={<LazyLayout component={LazyAbout} />} />
        <Route path="/courses" element={<LazyLayout component={LazyCourses} />} />
        <Route path="/profile" element={<LazyLayout component={LazyProfile} />} />
        <Route path="/dashboard" element={<LazyLayout component={LazyDashboard} />} />
        <Route path="/enquiry" element={<LazyLayout component={LazyEnquiry} />} />
        <Route path="/addcourse" element={<LazyLayout component={LazyAddCourse} />} />
        <Route path="/query" element={<LazyLayout component={LazyQuery} />} />
        <Route path="/reply" element={<LazyLayout component={LazyReply} />} />
        <Route path="/saved" element={<LazyLayout component={LazySave} />} />
        <Route path="/payment" element={<LazyLayout component={LazyPayment} />} />
        <Route path="/message" element={<LazyLayout component={LazyMessage} />} />
        
      </Routes>
    </UserLayout>
  );
};
const App = () => {
  return (
    <div className="App">
    <ToastContainer />
    <Routes>
    <Route exact path="/" element={<Navigate to="/routeTo/login" />} />
    <Route path="/routeTo/login"  element={<LazyLayout component={LazyLogin}/>}/>
    <Route path="/routeTo/forgot" element={<LazyLayout component={LazyForgot} />} />
    <Route path="/routeTo/*" element={<UserRoutes/>}/>
    </Routes>

    </div>
  );
};

export default App;