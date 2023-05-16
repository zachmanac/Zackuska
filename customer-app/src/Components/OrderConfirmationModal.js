import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './OrderConfirmationModal.scss'; // assuming that's the name of your SCSS file

function OrderConfirmationModal({ orderId, onOrderAccepted }) {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      
      onOrderAccepted();

      navigate('/orders');

    } else {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId); // Clear timeout if the component is unmounted
    }
  }, [countdown, onOrderAccepted, navigate]);

  return (
    <div className="order-confirmation-modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2>Order Confirmation</h2>
        <p>Your order has been placed!</p>
        {countdown > 0 ? (
          <p>Order will be accepted in {countdown} seconds...</p>
        ) : (
          <p>Your order is accepted!</p>
        )}
      </div>
    </div>
  );
}

export default OrderConfirmationModal;
