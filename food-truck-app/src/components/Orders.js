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
      <h1>Navbar here with login/logout</h1>
      <h1>Orders page</h1>
      <div className="orders-container">
        {console.log("ALL ORDERS BEFORE MAP", orders)}
        {orders.map((order) => (
          <div>
            <div key={order.order_id} className="individual-order">
              {console.log("ONE ORDER AFTER MAP", order)}
              <p>Order Id: {order.order_id}</p>
              <p>{order.status}</p>
              <div className="order-status-buttons">
              {order.status === 'Pending' && (
                  <div>
                    <Button variant="success" onClick={() => handleAcceptOrder(order.order_id)}>Accept</Button>
                    <Button variant="danger" onClick={() => handleDeclineOrder(order.order_id)}>Decline</Button>
                  </div>
                )}
              </div>
            </div>
            <p>example individual items listed here, with quantity</p>
            <p>example 2nd item here, with quantity</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;