import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import cross from '../../assets/cross_icon.png'

const Login = ({ setlogin, setisLogged, setmenu, menu, existingemail, setexistingemail, setCustomerData }) => {
    const [currentState, setcurrentState] = useState("Login");
    const [existingpass, setexistingpass] = useState("");
    const [Serror, setSerror] = useState({});
    const [Lerror, setLerror] = useState({});
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [agree, setagree] = useState(false);
    const [modalOpacity, setModalOpacity] = useState(1);

    const validateSignup = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = "Full name is required.";
        }

        if (!email) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.(com|in)$/.test(email) || /[A-Z]/.test(email)) {
            errors.email = "Enter a valid email address.";
        }

        if (!password) {
            errors.password = "Password is required.";
        } else if (
            password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)
        ) {
            errors.password = "Password must be at least 8 characters long, with one uppercase, one lowercase, one special character, and one numeric value.";
        }

        if (!agree) {
            errors.agree = "You must agree to the terms.";
        }

        return errors;
    };

    const addCredential = async (e) => {
        e.preventDefault();

        const signupError = validateSignup();
        if (Object.keys(signupError).length === 0) {
            try {

                await axios.post("http://localhost:3001/newregister", { name, email, password });
                toast.success("Account Created Successfully!", {
                    position: "top-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    autoClose: 3500,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });

                setname("");
                setemail("");
                setpassword("");
                setcurrentState("Login");
                setSerror({});
                //setTimeout(() => setlogin(false), 30000);
            } catch (error) {
                const errorMessage = error.response?.status === 400 ? "This Email is already registered" : "" || "Something went wrong. Please try again.";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
            }
        } else {
            setSerror(signupError);
        }
    };

    const validateLogin = () => {
        const errors = {};
        if (!existingemail) errors.existingemail = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.(com|in)$/.test(existingemail)) {
            errors.existingemail = "Enter a valid email address.";
        }
        if (!existingpass) errors.existingpass = "Password is required.";
        else if (existingpass.length < 8) {
            errors.existingpass = "Invalid Password.";
        }
        
        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginError = validateLogin();
        const userlogin = { existingemail, existingpass };

        if (Object.keys(loginError).length === 0) {
            try {
                const response = await axios.post("http://localhost:3001/customerdetails", userlogin);

                if (response.data === "Success") {
                    const response1 = await axios.get(`http://localhost:3001/userdetails/${existingemail}`);
                    setCustomerData(response1.data);

                    localStorage.setItem("user", JSON.stringify(response1.data));
                    toast.success("Login Successfully!", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Slide,
                    });

                    setModalOpacity(0);
                    setTimeout(() => {
                        setlogin(false);
                        setisLogged(true);
                    }, 1500);
                } else {
                    toast.error("Invalid credentials. Please try again.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Slide,
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("Login Failed. Please try again later.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
            }
        } else {
            setLerror(loginError);
        }
    };



    const handlePolicy = () => {
        setlogin(false);
        setmenu("Policy");
    }

    return (
        <>
            <div className='login'>
                <form className='login-container' style={{ opacity: modalOpacity, transition: 'opacity 1s ease' }}>
                    <div className='login-title'>
                        <h2>{currentState}</h2>
                        <img
                            onClick={() => setlogin(false)}
                            src={cross}
                            alt="Close"
                        />
                    </div>

                    <div className='login-input' >
                        {currentState === "Login" ? (
                            <>
                                <input
                                    type='email'
                                    placeholder='Enter Email Address'
                                    value={existingemail}
                                    onChange={(e) => setexistingemail(e.target.value)}
                                    required
                                />
                                {Lerror.existingemail && <div id='error'>{Lerror.existingemail}</div>}

                                <input
                                    type='password'
                                    placeholder='Enter Password'
                                    value={existingpass}
                                    onChange={(e) => setexistingpass(e.target.value)}
                                    required
                                />
                                {Lerror.existingpass && <div id='error'>{Lerror.existingpass}</div>}
                                <span>
                                    <Link to="/ChangePassword" onClick={() => handlePolicy()} className={menu === "http://localhost:3000/ChangePassword" ? "active" : ""}>forgot password?</Link>
                                </span>
                                <button type='submit' onClick={handleLogin}>Sign In</button>
                            </>
                        ) : (
                            <>
                                <input
                                    type='text'
                                    placeholder='Fullname'
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    required
                                />
                                {Serror.name && <div id='error'>{Serror.name}</div>}

                                <input
                                    type='email'
                                    placeholder='eg: mahi@gmail.com'
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                                {Serror.email && <div id='error'>{Serror.email}</div>}

                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    // maxLength={8}
                                    required
                                />
                                {Serror.password && <div id='error'>{Serror.password}</div>}

                                <button type='submit' onClick={addCredential}>Create Account</button>

                                <div className='login-condition'>
                                    <label className='login-conditon-input'>
                                        <input type='checkbox'
                                            onChange={() => setagree(true)}
                                            required />
                                        <p>By continuing, I agree to the <span><Link to='/TermsAndCondition' onClick={() => handlePolicy()} className={menu === "http://localhost:3000/TermsAndCondition" ? "active" : ""}>Terms</Link></span> of use & <span><Link to='/PrivacyPolicy' onClick={() => handlePolicy()} className={menu === "http://localhost:3000/PrivacyPolicy" ? "active" : ""}>Privacy policy</Link></span>.</p>


                                    </label>
                                </div>
                                {Serror.agree && <div id='error'>{Serror.agree}</div>}

                            </>
                        )}
                    </div>

                    <p>
                        {currentState === "Login" ? (
                            <>Create a new account? <span onClick={() => setcurrentState("Sign Up")}>Click here</span><br />
                                
                            </>
                        ) : (
                            <>Already have an account? <span onClick={() => setcurrentState("Login")}>Login here</span></>
                        )}
                    </p>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;