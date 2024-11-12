import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import './ChangePassword.css';

const ChangePassword = () => {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [Lerror, setLerror] = useState({});
    const [resendTimeout, setResendTimeout] = useState(false);
    const [timer, setTimer] = useState(30);
    const [updatepass,setUpdatepass]=useState(false)

    useEffect(() => {
        let interval = null;
        if (resendTimeout && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (!resendTimeout && timer !== 30) {
            clearInterval(interval);
            setTimer(30); 
        }
        return () => clearInterval(interval);
    }, [resendTimeout, timer]);

    const validate = () => {
        const errors = {};
        if (!email) errors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.(com|in)$/.test(email)) {
            errors.email = "Enter a valid email address.";
        }
        return errors;
    };

    const sendOTP = async (e) => {
        e.preventDefault();
        const loginError = validate();

        if (Object.keys(loginError).length === 0) {
            setResendTimeout(true);
            setTimer(30);
            setTimeout(() => setResendTimeout(false), 30000); 

            try {
                const response1 = await axios.get(`http://localhost:3001/userdetails/${email}`);

                if (response1) {

                    await axios.post("http://localhost:3001/send-otp", { email });

                    toast.success("OTP sent to your email!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Slide,
                    });
                }

                setLerror("");

            } catch (error) {
                if (error.response && error.response.status === 404) {

                    toast.error("No account found.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Slide,
                    });

                } else {
                    toast.error("Failed to send OTP. Please try again.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Slide,
                    });
                }
            }
        } else {
            setLerror(loginError);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response1 = await axios.post("http://localhost:3001/verify-otp", { email, otp });
            if (response1.status === 200) {
                toast.success("OTP verified successfully!");
                setOtpVerified(true);
            } else {
                throw new Error("Incorrect OTP");

            }

        } catch (error) {
            toast.error("Incorrect or expired OTP. Please try again.");
        }

    };

    const validatePasswords = () => {
        const errors = {};
        if (!newPassword) {
            errors.newPassword = "New password is required.";
        } else if (
            newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) ||
            !/[0-9]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)
        ) {
            errors.newPassword = "Password must be at least 8 characters long, with one uppercase, one lowercase, one special character, and one numeric value.";
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setLerror(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePassword = async () => {
        if (validatePasswords() && otpVerified) {
            try {
                await axios.post("http://localhost:3001/change-password", { email, password: newPassword });
                toast.success("Password updated.");
                setNewPassword("");
                setConfirmPassword("");
                setOtp("");
                setOtpVerified(false);
                setUpdatepass(true);
                // navigate('/')
            } catch (error) {
                toast.error("Failed to update password. Please try again.");
            }
        }
    };

    return (
        <><ToastContainer />
            {!updatepass ? (
                <div className='ChangePassword'>
                <h1>Change Password</h1>
                <div className='changePassword-container'>
                    <div>
                        <input
                            type='email'
                            placeholder='Enter Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Enter Email Address"
                            readOnly={otpVerified}
                        />
                        {Lerror.email && <div id='error'>{Lerror.email}</div>}
                        {!otpVerified && (
                            <button type='button' onClick={sendOTP} disabled={resendTimeout}>
                                {/* {resendTimeout ? "Wait to resend OTP" : "Send OTP"} */}
                                {resendTimeout ? `Wait ${timer}s to resend OTP` : "Send OTP"}
                            </button>
                        )}
                    </div>
                    {!otpVerified && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                maxLength='4'
                                className='enterOTP'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                aria-label="Enter OTP"
                            />
                            
                            <button type='button' onClick={verifyOTP}>Verify OTP</button>
                        </div>
                    )}
                    {otpVerified && (
                        <>
                            <div>
                                <input
                                    type='password'
                                    placeholder='Enter new password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    aria-label="Enter new password"
                                />
                                {Lerror.newPassword && <div id='error'>{Lerror.newPassword}</div>}
                            </div>

                            <div>
                                <input
                                    type='password'
                                    placeholder='Confirm new password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    aria-label="Confirm new password"
                                />
                                {Lerror.confirmPassword && <div id='error'>{Lerror.confirmPassword}</div>}
                                <button type='button' onClick={handleChangePassword}>Update Password</button>
                            </div>
                        </>)}


                </div>
                        
            </div>):
            (
                <div className='AfterPassUpdate'>
                    <h2>Your Password has been updated successfully...</h2>
                </div>
            )}
            
        </>
    );
};

export default ChangePassword;