import React, { useState } from "react";
import { GiBookAura } from "react-icons/gi";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, register, fetchUserDetails } from "../../services/auth"; // import fetchUserDetails
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setUserData } from "../../redux/authSlice"; // import setUserDetails action

const Login = () => {
  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (email.trim() === "" || password.trim() === "") {
      toast.warn("Please enter email and password");
      return;
    }
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const res = await login(data);
      const token = res?.data?.access_token;
      sessionStorage.setItem("token", token);
      const decode = jwtDecode(token);
      console.log(decode);
      dispatch(loginSuccess({ ...decode, email: email }));
  
      // Fetch user details
      const userDetailsResponse = await fetchUserDetails(email);
      
      // Ensure user details are found
      if (!userDetailsResponse) {
        throw new Error("User details not found");
      }
  
      // Dispatch user details to Redux store
      dispatch(setUserData(userDetailsResponse));
  
      toast.success("Welcome Back!");
      navigate('/routeTo/home');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 417) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login failed");
      }
    }
  };
  
  

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      name.trim() === "" ||
      mobilenumber.trim() === ""
    ) {
      toast.warn("Please enter all required fields");
      return;
    }

    if (mobilenumber.trim().length !== 10) {
      toast.error("Enter Valid Mobile Number");
      return;
    }

    const data = {
      name: name,
      email: email,
      mobilenumber: mobilenumber,
      password: password,
      role: "ADMIN",
      age:"25",
      address:"",
      "state":"",
      city:"",
      postalcode:"",
      skills:"",
    };

    try {
      const response = await register(data);
      console.log(response);
      navigate('/routeTo/login');
      toast.success("Registration successful");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Email already exists") {
          setEmailError("Email already exists");
          toast.error("Email already exists");
        } else if (errorMessage === "Mobile number already exists") {
          setMobileNumberError("Mobile number already exists");
          toast.error("Mobile number already exists");
        } else {
          console.error("Registration error:", error.response.data);
          toast.error("Registration error");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("Error setting up request");
      }
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <div className="page">
      <div className="logincontainer">
        <div className="logocontainer">
          <div className="Title123">
            <h1>
              <GiBookAura style={{ textShadow: "5px 2px 8px #000000" }} />
            </h1>
            <p>BritCeritfy</p>
          </div>
        </div>
        <div
          className={`fieldcontainer ${
            isVisible ? "sign-in-visible" : "sign-out-visible"
          }`}
        >
          <div className="sign-up-form">
            {isVisible ? (
              <form onSubmit={handleSignIn}>
                <h1>Welcome back!</h1>
                <div className="input-icon">
                  <EmailIcon style={{ fontSize: "33px" }} />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    onBlur={(e) => {
                      if (!validateEmail(e.target.value)) {
                        setEmailError("Invalid Email");
                      } else {
                        setEmailError("");
                      }
                    }}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {emailError && (
                  <p
                    className="required-message"
                    style={{ paddingLeft: "40px", paddingTop: "10px" }}
                  >
                    {emailError}
                  </p>
                )}
                <div className="input-icon">
                  <FingerprintIcon style={{ fontSize: "33px" }} />
                  <input
                    required
                    type="password"
                    placeholder="Password"
                    onBlur={(e) => {
                      if (!validatePassword(e.target.value)) {
                        setPasswordError(
                          "Password should be at least 8 characters long"
                        );
                      } else {
                        setPasswordError("");
                      }
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {passwordError && (
                  <p
                    style={{ paddingLeft: "40px", paddingTop: "10px" }}
                    className="required-message"
                  >
                    {passwordError}
                  </p>
                )}
                <div className="remember-forgot">
                  <input type="checkbox" />
                  <p style={{ background: "transparent" }}>Remember me</p>
                  <a href="/routeTo/forgot">Forgot Password?</a>
                </div>
                <button type="submit" onSubmit={handleSignIn}>
                  Sign In
                </button>
                <br />
                <br />
                <hr />
                <br />
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={handleToggleVisibility}>
                    Sign up
                  </a>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSignUp}>
                <div className="signupfield">
                  <h1>Create Account</h1>
                  <div className="input-icon">
                    <PersonIcon style={{ fontSize: "33px" }} />
                    <input
                      required
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="input-icon">
                    <EmailIcon style={{ fontSize: "33px" }} />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      onBlur={(e) => {
                        if (!validateEmail(e.target.value)) {
                          setEmailError("Invalid Email");
                        } else {
                          setEmailError("");
                        }
                      }}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  {emailError && (
                    <p
                      className="required-message"
                      style={{ paddingLeft: "40px", paddingTop: "10px" }}
                    >
                      {emailError}
                    </p>
                  )}
                  <div className="input-icon">
                    <LocalPhoneIcon style={{ fontSize: "33px" }} />
                    <input
                      required
                      type="text"
                      placeholder="Mobile Number"
                      value={mobilenumber}
                      onChange={handleMobileNumberChange}
                    />
                  </div>
                  <div className="input-icon">
                    <FingerprintIcon style={{ fontSize: "33px" }} />
                    <input
                      required
                      type="password"
                      placeholder="Password"
                      onBlur={(e) => {
                        if (!validatePassword(e.target.value)) {
                          setPasswordError(
                            "Password should be at least 8 characters long"
                          );
                        } else {
                          setPasswordError("");
                        }
                      }}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  {passwordError && (
                    <p
                      style={{ paddingLeft: "40px", paddingTop: "10px" }}
                      className="required-message"
                    >
                      {passwordError}
                    </p>
                  )}
                  <button type="submit" onSubmit={handleSignUp}>
                    Sign Up
                  </button>
                  <br />
                  <br />
                  <hr />
                  <br />
                  <p>
                    Already have an account?{" "}
                    <a href="#" onClick={handleToggleVisibility}>
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
