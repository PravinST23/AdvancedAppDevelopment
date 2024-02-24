import React, { useState } from 'react';
import '/src/assets/css/login.css';
import logo from '/src/assets/css/images/img.png';
import { GiBookAura } from "react-icons/gi";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const [role, setRole] = useState('Student');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const roleOptions = [
        { name: 'Student', value: 'Student' },
        { name: 'Institution', value: 'Institution' },
    ];

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleSignIn = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Your sign-in logic here
        // Assuming successful sign-in, navigate to home
        navigate('/routeTo/home');
    };

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Your sign-up logic here
    };

    const validateEmail = (email) => {
        if (!email) {
            setEmailError('*Email is required');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('*Password is required');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div className="page">
            <div className='logincontainer'>
                <div className='logocontainer'>
                    <div className='iconbadge'>
                        <h3 style={{ paddingLeft: '20px' }}><GiBookAura /></h3>
                        <p>BritCertify...</p>
                    </div>
                    <div className='imgcontainer'>
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div className={`fieldcontainer ${isVisible ? 'sign-in-visible' : 'sign-out-visible'}`}>
                    <div className="sign-up-form">
                        {isVisible ? (
                            <form onSubmit={handleSignIn}>
                                <h1>Welcome back!</h1>
                                <div className="input-icon">
                                    <EmailIcon style={{ fontSize: "33px" }} />
                                    <input required type="email" placeholder="Email" onBlur={(e) => validateEmail(e.target.value)} />
                                    </div>
                                    {emailError && <p className="required-message" style={{paddingLeft:"40px",paddingTop:"10px"}}>{emailError}</p>}
                                <div className="input-icon">
                                    <FingerprintIcon style={{ fontSize: "33px" }} />
                                    <input required type="password" placeholder="Password" onBlur={(e) => validatePassword(e.target.value)} />
                                    </div>
                                    {passwordError && <p style={{paddingLeft:"40px",paddingTop:"10px"}} className="required-message">{passwordError}</p>}
                                <div className="remember-forgot">
                                    <input type="checkbox" /><p>Remember me</p>
                                    <a href="#">Forgot Password?</a>
                                </div>
                                <button type="submit">Sign In</button>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <p>Don't have an account? <a href="#" onClick={handleToggleVisibility}>Sign up</a></p>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp}>
                                <div className="signupfield">
                                    <h1>Create Account</h1>
                                    <div className="role-slider">
                                        {roleOptions.map((option) => (
                                            <label key={option.value} className={`role-option ${role === option.value ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="role"
                                                    value={option.value}
                                                    checked={role === option.value}
                                                    onChange={() => handleRoleChange(option.value)}
                                                />
                                                {option.name}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="input-icon">
                                        <PersonIcon style={{ fontSize: "33px" }} />
                                        <input required type="text" placeholder="Name" />
                                    </div>
                                    <div className="input-icon">
                                        <EmailIcon style={{ fontSize: "33px" }} />
                                        <input required type="email" placeholder="Email" onBlur={(e) => validateEmail(e.target.value)} />
                                    </div>
                                    <div className="input-icon">
                                        <LocalPhoneIcon style={{ fontSize: "33px" }} />
                                        <input required type="tel" placeholder="Mobile Number" />
                                    </div>
                                    <div className="input-icon">
                                        <FingerprintIcon style={{ fontSize: "33px" }} />
                                        <input required type="password" placeholder="Password" onBlur={(e) => validatePassword(e.target.value)} />
                                    </div>
                                    <button type="submit">Sign Up</button>
                                    <br />
                                    <br />
                                    <hr />
                                    <br />
                                    <p>Already have an account? <a href="#" onClick={handleToggleVisibility}>Sign in</a></p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
    