import React, { useState, useEffect } from "react";
import ApiCallsOwner from "../ApiCallsOwner.js";
import { Button } from "react-bootstrap";
import "./Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userTruckId, setUserTruckId] = useState(null);

  useEffect(() => {
    const fetchUserTruckId = async () => {
      try {
        const truckData = await ApiCallsOwner.getTruckData();
        
        const truckId = truckData ? truckData.truck_id : null;
        
        setUserTruckId(truckId);
      } catch (error) {
        console.error('Error fetching user truck:', error);
      }
    };

    fetchUserTruckId();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("usertruckid in fetchorders", userTruckId);
      try {
        // const foodTruckId = 1; 
        //foodtruckid should be from current users(owner) truck i think
        if(userTruckId) {
          const orders = await ApiCallsOwner.getAllOrders(userTruckId);
          console.log("ORDERS/FETCHORDERS", orders);
          setOrders(orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if(userTruckId) {
      fetchOrders();
    }

    // Set up an interval to periodically update orders every second
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
      setOrders([]);
    };
  }, [userTruckId]);

  const handleAcceptOrder = async (orderId) => {
    try {
      // const foodTruckId = 1;
      await ApiCallsOwner.acceptOrder(userTruckId, orderId);
      updateOrderStatus(orderId, 'Accepted');
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  
  const handleDeclineOrder = async (orderId) => {
    try {
      // const foodTruckId = 1;
      await ApiCallsOwner.declineOrder(userTruckId, orderId);
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
      <h2>My Orders</h2>
      <div className="orders-container">
        {orders.length > 0 && orders.map((order) => (
          <div key={order.order_id} className="individual-order">
            <div className="order-column">
              <p>Order ID: {order.order_id}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Created At: {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            </div>
            <div className="order-column middle">
              <div className="menu-items">
                {order.menu_items.map((menuItem) => (
                  <div key={menuItem.item_id}>
                    <p>{menuItem.item_name} - {menuItem.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-column status-right">
              <p>
                <span className={`status status--${order.status.toLowerCase()} pending`}>
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
