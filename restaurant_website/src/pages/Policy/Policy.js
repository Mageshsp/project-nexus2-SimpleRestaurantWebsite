import './Policy.css'
import { Link } from 'react-router-dom';
export const Policy = ({setmenu,menu}) => {
    
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} className='policy'>
      <h1>Terms and Conditions</h1>
      <h2>1. General Use</h2>
      <ul>
        <li>You must be at least 18 years old or have parental consent to use this Website.</li>
        <li>We reserve the right to modify or update these Terms at any time without prior notice.</li>
        <li>The content on this Website is provided for informational purposes and may change without notice.</li>
      </ul>

      <h2>2. Orders and Payment</h2>
      <ul>
        <li>All orders placed through the Website are subject to availability and confirmation.</li>
        <li>Prices listed may vary and are subject to change without notice.</li>
        <li>Payments are processed securely through payment processor.</li>
      </ul>

      <h2>3. Reservations and Cancellation Policy</h2>
      <ul>
        <li>Reservations are subject to availability.</li>
        <li>Modifications or cancellations must be made within time frame.</li>
        <li>We may charge a cancellation fee for late cancellations or no-shows.</li>
      </ul>

      <h2>4. Delivery and Pickup Policy</h2>
      <ul>
        <li>Delivery is available only within service area.</li>
        <li>Estimated delivery times are approximate and may vary.</li>
        <li>Pickup orders should be collected within the designated time frame.</li>
      </ul>

      <h2>5. Allergies and Dietary Restrictions</h2>
      <p>
        We strive to accommodate dietary needs, but cannot guarantee our dishes will be allergen-free. 
        Please inform us of specific requirements when placing orders.
      </p>

      <h2>6. Intellectual Property Rights</h2>
      <p>
        All content on the Website is owned by Delish Restaurant or its licensors. Unauthorized use of content 
        is prohibited.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        We may provide links to third-party websites. Delish Restaurant is not responsible for the content or 
        policies of these websites.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Delish Restaurant is not liable for any damages arising from the use of this Website or related services.
      </p>

      <h2>9. Privacy Policy</h2>
      <p>
        Your use of the Website is governed by our <span><Link to='/PrivacyPolicy' onClick={() => setmenu("Privacy")} className={menu === "http://localhost:3000/PrivacyPolicy" ? "active" : ""}>Privacy policy</Link></span> . 
        Please review it to understand how we collect and use your information.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms and Conditions are governed by the laws of jurisdiction. Any disputes shall be 
        resolved in the courts of jurisdiction.
      </p>

      <h2>11. Contact Us</h2>
      <p>If you have any questions, please <span><Link to='/ContactUs' onClick={() => setmenu("ContactUs")} className={menu === "http://localhost:3000/ContactUs" ? "active" : ""}>Contact Us</Link></span>:</p>
      
    </div>
  );
};