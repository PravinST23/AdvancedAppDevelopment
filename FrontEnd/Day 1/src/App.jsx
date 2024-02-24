import React, { lazy} from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import UserLayout from "./pages/user/userLayout";
import LazyLayout from "./pages/lazyLayout";
const LazyLogin = lazy(() => import("./pages/user/login"));
const LazyHome = lazy(() => import("./pages/user/home"));
const LazySupport = lazy(() => import("./pages/user/support"));
const LazyAbout = lazy(() => import("./pages/user/about"));
const LazyCourses = lazy(() => import("./pages/user/courses"));
const LazyProfile = lazy(() => import("./pages/user/profile"));


const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/home" element={<LazyLayout component={LazyHome} />} />
        <Route path="/support" element={<LazyLayout component={LazySupport} />} />
        <Route path="/about" element={<LazyLayout component={LazyAbout} />} />
        <Route path="/courses" element={<LazyLayout component={LazyCourses} />} />
        <Route path="/profile" element={<LazyLayout component={LazyProfile} />} />
      </Routes>
    </UserLayout>
  );
};
const App = () => {
  return (
    <div className="App">
    <Routes>
    <Route exact path="/" element={<Navigate to="/routeTo/login" />} />
    <Route path="/routeTo/login"  element={<LazyLayout component={LazyLogin}/>}/>
    <Route path="/routeTo/*" element={<UserRoutes/>}/>
    </Routes>

    </div>
  );
};

export default App;