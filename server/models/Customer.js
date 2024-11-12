const mongoose = require("mongoose")

const CustomerSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    otpVerified: Boolean,
    delivery: {
      firstName: String,
      lastName: String,
      email:String,
      street: String,
      city: String,
      state: String,
      pinCode: String,
      country: String,
      phone: String,
  },
})

const CustomerModel = mongoose.model("customerdetails",CustomerSchema)

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });

  const ContactModel = mongoose.model('feedbacks',ContactSchema );

  module.exports = {
    CustomerModel,
    ContactModel,
  };