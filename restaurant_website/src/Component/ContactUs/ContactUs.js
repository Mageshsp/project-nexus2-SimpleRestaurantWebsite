import React, { useState } from 'react';
import './ContactUs.css';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {assets} from '../../assets/assets'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formData.name) formErrors.name = 'required';
    else if (formData.name.length < 3) formErrors.name = 'Invalid name'
    if (!formData.email) {
      formErrors.email = 'required';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!formData.message) formErrors.message = 'required';

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        await axios.post('http://localhost:3001/newfeedbacks', formData);

        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Slide,
        });

        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } catch (error) {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Slide,
        });
      }
      finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  function copyToClipboard() {
    const phoneNumber = document.getElementById("phoneNumber").innerText;
    navigator.clipboard.writeText(phoneNumber)
    toast.success("Phone number copied!", {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
      transition: Slide,
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We would love to hear from you! Please fill out the form below to get in touch.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:{errors.name && <span className="error">{errors.name}</span>}</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
          />
          
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:{errors.email && <span className="error">{errors.email}</span>}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='ex: contact@gmail.com'
            value={formData.email}
            onChange={handleChange}
          />
          
        </div>

        <div className="form-group">
          <div className='message-container'><label htmlFor="message">Message:{errors.message && <span className="error">{errors.message}</span>}</label><span className='zoom' onClick={() => setIsModalOpen(true)}><img src={assets.zoomimg} alt='' /></span></div>
          <textarea
            id="message"
            name="message"
             placeholder='Describe here...'
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />
          
        </div>

        <button type="submit" className='submitbtn' disabled={loading}>{loading ? "Sending..." : <><img src={assets.sendimg} alt=""  />Send Message</>}</button>
      </form>

      <div className="contact-info">
        <h3>Our Contact Information</h3>
        <ul>
          <li><img src={assets.contact} alt="Phone:"/> <span onClick={()=>copyToClipboard()} id='phoneNumber'>+91 8778676679</span></li>
          <li><img src={assets.emailimg} alt='Email:'/><a href="mailto:contact@gmail.com" id="emailLink">contact@gmail.com</a></li>
          <li>Address: 123 Gourmet Street, Food City, India</li>
        </ul>
      </div>

      <ToastContainer />
      {isModalOpen && (<div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <button className="close-button" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
          <div><label htmlFor="message">Message:</label></div>
          <textarea
            id="message"
            name="message"
            placeholder='Describe here...'
            rows="25"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>)}
    </div>
  );
};

export default ContactUs;