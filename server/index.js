require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { CustomerModel, ContactModel } = require("./models/Customer");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect("mongodb://localhost:27017/CustomerInformation")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));


app.post("/customerdetails",async (req, res) => {
  const { existingemail, existingpass } = req.body;
  try {
    const user = await CustomerModel.findOne({ email: existingemail });
    if (user) {
      const isMatch = await bcrypt.compare(existingpass, user.password); 
      if (isMatch) {
        res.json("Success");
        console.log("Login attempt with email:", existingemail);
      } else {
        res.json("Password is incorrect");
        console.log("Failed login attempt with password:", existingpass);
      }
    } else {
      res.status(401).json("No Record is Existed");
    }
  } catch (err) {
    res.status(500).json("Error occurred: " + err.message);
  }
});


const checkEmailExists = async (email) => {
  try {
    const user = await CustomerModel.findOne({ email });
    return !!user;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
};

app.post("/newregister", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await CustomerModel.create({
      ...req.body,
      password: hashedPassword 
    });
    res.status(201).json(newCustomer); 
  } catch (err) {
    res.status(500).json({ error: "Error occurred: " + err.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});


app.post("/newfeedbacks",async (req, res) => {
  try {
    const contact = await ContactModel.create(req.body);

    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: req.body.email, 
        subject: 'Contact Form Submission',
        text: `Hello ${req.body.name},\n\nThank you for reaching out to us! We’ve received your message and will get back to you as soon as possible. In the meantime, if you have any further questions, feel free to reply to this email.\n\nBest regards,\nThe ContactForm Team`,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Success' });
} catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ message: 'An error occurred', error: error.message });
}
});

app.put("/update-delivery", async (req, res) => {
  const { email, delivery } = req.body;
  try {
    const customer = await CustomerModel.findOneAndUpdate(
      { email },
      { delivery },
      { new: true, upsert: true }
    );
    if (customer) {
      res.status(200).json({ message: "Delivery information updated", customer });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating delivery information", error });
  }
});

app.get("/userdetails/:email", (req, res) => {
  const { email } = req.params;
  CustomerModel.findOne({ email })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => res.status(500).json("Error occurred: " + err.message));
});



const generateOTP = () =>Math.floor(1000 + Math.random() * 9000).toString();

const otpStore = {};

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = generateOTP();
  const expiration = Date.now() + 1 * 60 * 1000*0.5; 
  otpStore[email] = { otp, expiration };
  
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Your OTP Code - [Delish]',
    text: `Your OTP code is ${otp}. It is valid for 30 seconds.`,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error); 
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});


app.post('/verify-otp',async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const { otp: storedOtp, expiration } = otpStore[email];
  if (storedOtp === otp && Date.now() < expiration) {
    await CustomerModel.updateOne({ email }, { otpVerified: true });
    delete otpStore[email]; 
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    delete storedOtp;
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
   


});

app.post('/change-password', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await CustomerModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'No account found with this email' });
  }

  if (!user.otpVerified) {
    return res.status(403).json({ message: 'OTP verification required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.otpVerified = false; 
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
});


app.listen(3001, () => {
  console.log("Server is running successfully on port 3001");
});