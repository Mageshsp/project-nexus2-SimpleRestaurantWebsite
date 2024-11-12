import React from 'react';
import './PrivacyPolicy.css'; 
import { Link } from 'react-router-dom';

const PrivacyPolicy = ({setmenu,menu}) => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone number, billing and delivery address, payment details, and order history.
        </li>
        <li>
          <strong>Account Information:</strong> If you create an account, we may collect your username and password.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, operating system, and browsing activity on our Website.
        </li>
        <li>
          <strong>Cookies:</strong> Information about your preferences and usage through cookies and similar technologies.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process your orders, payments, and reservations.</li>
        <li>To provide delivery or pickup services.</li>
        <li>To send order confirmations, receipts, or customer service-related messages.</li>
        <li>To personalize your experience and improve our Website.</li>
        <li>To notify you about promotions, offers, or changes to our services.</li>
        <li>To detect and prevent fraud or unauthorized access.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <ul>
        <li>
          <strong>Service Providers:</strong> We may share your information with trusted third parties to complete transactions (e.g., payment processors, delivery services).
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect our legal rights.
        </li>
        <li>
          <strong>Business Transfers:</strong> In case of a merger, acquisition, or sale, your information may be transferred to the new owners.
        </li>
      </ul>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>We use cookies to enhance your browsing experience on our Website.</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Necessary for the Website to function.</li>
        <li><strong>Analytics Cookies:</strong> Track usage patterns and improve the Website.</li>
        <li><strong>Marketing Cookies:</strong> Help us provide relevant offers and ads.</li>
      </ul>
      <p>You can manage your cookie preferences through your browser settings.</p>

      <h2>5. How We Protect Your Information</h2>
      <p>
        We take reasonable precautions to protect your personal information from unauthorized access, disclosure, or misuse.
        However, no data transmission or storage system can be guaranteed 100% secure.
      </p>

      <h2>6. Your Data Rights</h2>
      <ul>
        <li><strong>Access:</strong> Request a copy of the information we hold about you.</li>
        <li><strong>Correction:</strong> Request corrections to your personal data if it is inaccurate or incomplete.</li>
        <li><strong>Deletion:</strong> Request that we delete your personal data, subject to legal obligations.</li>
        <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used format.</li>
        <li><strong>Withdrawal of Consent:</strong> You can withdraw your consent to data processing at any time.</li>
      </ul>
      <p>To exercise your rights, contact us at delish@gmail.com.</p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our Website may contain links to external websites. We are not responsible for their privacy practices.
        Please review their privacy policies before providing any personal information.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children.
        If we discover that we have collected data from a child, we will delete it immediately.
      </p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
        Continued use of the Website after changes are made constitutes acceptance of the revised policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions, please <span><Link to='/ContactUs' onClick={() => setmenu("ContactUs")} className={menu === "http://localhost:3000/ContactUs" ? "active" : ""}>Contact Us</Link></span>:</p>
      
    </div>
  );
};

export default PrivacyPolicy;