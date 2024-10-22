import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setlogin,setisLogged}) => {
    const [currentState,setcurrentState]=useState("Login")
    const [existingemail,setexistingemail]=useState("")
    const [existingpass,setexistingpass]=useState("")
    const [Serror,setSerror] = useState({})
    const [Lerror,setLerror] = useState({})
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword] =useState("")
    const validateSignup=()=>{
        let signupError={};
        if(!name.trim()){
            signupError.name="Fullname is required";
        }
        if(!email){
            signupError.email="Email is required";
        }
        else if(!email.includes("@") || !(email.endsWith(".com") || email.endsWith(".in"))){
            signupError.email="Enter valid email address"
        }
        if(!password){
            signupError.password="Password is required"
        }
        else if(password.length < 8){
            signupError.password="Password must contain eight characters"
        }
        return signupError;
    }
    const validateLogin = ()=>{
        let loginError={};
        if(!existingemail){
            loginError.existingemail="Email is required";
        }
        else if(!existingemail.includes("@") || !(existingemail.endsWith(".com") || existingemail.endsWith(".in"))){
            loginError.existingemail="Enter valid email address"
        }
        if(!existingpass){
            loginError.existingpass="Password is required"
        }
        else if(existingpass.length < 8){
            loginError.existingpass="Invalid Password"
        }
        return loginError;
    }

    function addCredential(e){
        e.preventDefault();
        const signupError=validateSignup();
        if(Object.keys(signupError).length ===0){
            axios.post("http://localhost:4001/newregister",{name, email, password})
        .then((response)=>{
            toast.success('Account Created Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
                setTimeout(()=>{
                    setSerror(" ")
                },500);
        })
        .catch((error)=>{
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide, 
            });
        })
        }
        else{
            setSerror(signupError)
        }
        
    }
    function handleLogin(e){
        e.preventDefault();
        const loginError = validateLogin();
        axios.post('http://localhost:4001/credential', {existingemail:existingemail,existingpass:existingpass})
        .then(result =>{
            console.log(result)
            toast.success('Login Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
                setTimeout(() => {
                    setlogin(false)
                }, 500);
                setisLogged(true);
        })
        .catch(err => {
            console.log(err)
            toast.error("Login Failed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide, 
            });
        })
        
    }
  return (
    <>
    <div className='login'>
        <form className='login-container'>
            <div className='login-title'>
                <h2>{currentState}</h2>
                <img onClick={()=>setlogin(false)} src={assets.cross_icon}/>
            </div>
            <div className='login-input'>
                {currentState==="Login"? (<>
                <input type='email' placeholder='Enter Email Address' required value={existingemail} onChange={(e)=>setexistingemail(e.target.value)} />
                {Lerror.existingemail && <div id='error'>{Lerror.existingemail}</div>}
                <input type='password' placeholder='Enter password' required value={existingpass} onChange={(e)=>setexistingpass(e.target.value)} />
                {Lerror.existingpass && <div id='error'>{Lerror.existingpass}</div>}
                <button type='submit' onClick={handleLogin}>{currentState==="Login"?"Sign in":"Sign Up"}</button>
                
                </>):(
                <>
                    <input type='text' placeholder='Fullname' value={name}  required onChange={(e)=>setname(e.target.value)} />
                    {Serror.name &&<div id='error'>{Serror.name}</div>}
                    <input type='email' placeholder='eg:mahi@gmail.com' value={email}  required onChange={(e)=>setemail(e.target.value)} />
                    {Serror.email && <div id='error'>{Serror.email}</div>}
                    <input type='password' placeholder='Password' value={password}  required onChange={(e)=>setpassword(e.target.value)} maxLength={8}/>
                    {Serror.password && <div id='error'>{Serror.password}</div>}
                    <button type='submit' onClick={addCredential}>{currentState==="Sign Up"?"Create Account":"Login"}</button>
                </>)}
            </div>
            
            <div className='login-condition'>
                <input type='checkbox' required/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currentState==="Login"? <p>Create a new account?<span onClick={()=>setcurrentState("Sign Up")}>Click here</span></p>:<p>Already have an account?<span onClick={()=>setcurrentState("Login")}>Login here</span></p>}
           
            
        </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default Login