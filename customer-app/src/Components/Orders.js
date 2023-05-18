import React, { useState, useEffect } from 'react';
import ApiCalls from "../ApiCalls"

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 1; // hardcoded userId for test until session works

  useEffect(() => {
    // Function to retrieve orders
    const fetchOrders = async () => {
      try {
        const orders = await ApiCalls.getOrders(userId);
        setOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Fetch initial orders
    fetchOrders();

    // Set up an interval to periodically update orders every second
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'pending') {
      return 'yellow';
    } else if (status === 'accepted') {
      return 'green';
    } else if (status === 'declined') {
      return 'red';
    } else if (status === 'completed') {
      return 'blue';
    } else {
      return 'white';
    }
  };

  // Render the orders with dynamic styling based on status
  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} style={{ backgroundColor: getStatusColor(order.status) }}>
          <p>{order.order_id}</p>
          <p>{order.status}</p>
          <p>{order.response}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
