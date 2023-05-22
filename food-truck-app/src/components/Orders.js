import React, { useState, useEffect } from "react";
import ApiCallsOwner from "../ApiCallsOwner.js";
import { Button } from "react-bootstrap";
import "./Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const foodTruckId = 4; 
        //foodtruckid should be from current users(owner) truck i think
        const orders = await ApiCallsOwner.getAllOrders(foodTruckId);
        // console.log("ORDERS/FETCHORDERS", orders)
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  
  
    // Set up an interval to periodically update orders every second
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
      setOrders([]);
    };
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const foodTruckId = 4;
      await ApiCallsOwner.acceptOrder(foodTruckId, orderId);
      updateOrderStatus(orderId, 'Accepted');
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  
  const handleDeclineOrder = async (orderId) => {
    try {
      const foodTruckId = 4;
      await ApiCallsOwner.declineOrder(foodTruckId, orderId);
      updateOrderStatus(orderId, 'Declined');
    } catch (error) {
      console.error('Error declining order:', error);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.order_id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
    });
  };

  return (
    <div>
      <h2>My orders</h2>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.order_id} className="individual-order">
            <div className="order-column">
              <p>Order Id: {order.order_id}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>{new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            </div>
            <div className="order-column">
              <div className="menu-items">
                {order.menu_items.map((menuItem) => (
                  <div key={menuItem.item_id}>
                    <p>{menuItem.item_name} - {menuItem.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-column">
              <p>
                <span className={`status status--${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
              <div className="order-status-buttons">
                {order.status === 'Pending' && (
                  <div>
                    <Button variant="success" onClick={() => handleAcceptOrder(order.order_id)}>Accept</Button>
                    <Button variant="danger" onClick={() => handleDeclineOrder(order.order_id)}>Decline</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
