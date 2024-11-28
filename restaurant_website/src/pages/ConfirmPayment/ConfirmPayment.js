import React from 'react'
import './ConfirmPayment.css'
const ConfirmPayment = ({street,city,state,pincode}) => {
    
  return (
    <div className="container">
      <h2>Delivery Address</h2>
      <p> {street}</p>
      <p> {city}</p>
      <p> {state} - {pincode}</p>
    </div>
  )
}

export default ConfirmPayment