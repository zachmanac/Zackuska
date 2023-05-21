import React, { useState, useEffect } from 'react';
import ApiCalls from "../ApiCalls"
import "./Orders.scss"
function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 1; // hardcoded userId for test until session works

  useEffect(() => {
    // Function to retrieve orders
    const fetchOrders = async () => {
      try {
        const orders = await ApiCalls.getOrders();
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
    return () => {clearInterval(interval);
    setOrders([]);}
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Pending') {
      return 'rgba(255, 255, 0, 0.3)'; // Light yellow
    } else if (status === 'Accepted') {
      return 'rgba(0, 255, 0, 0.3)'; // Light green
    } else if (status === 'Declined') {
      return 'rgba(255, 0, 0, 0.3)'; // Light red
    } else if (status === 'ready') {
      return 'rgba(0, 0, 255, 0.3)'; // Light blue
    } else {
      return 'rgba(255, 255, 255, 0.3)'; // Light white
    }
  };
  useEffect(() => {
    // Clean up orders when user logs out
    if (!userId) {
      setOrders([]);
    }
  }, []);

  // Render the orders with dynamic styling based on status
  return (
    <div>
      <h1>Your Orders</h1>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <h5>Order No. {order.order_id}</h5>
            <p className="status" style={{ backgroundColor: getStatusColor(order.status) }}>{order.status}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
            <p>Response: {order.response}</p>
            <p>Total: ${order.total_amount}</p>
            <p>Truck Name: {order.truck.name}</p> {/* Display truck name */}
            <p>Truck Photo: <img src={order.truck.picture} alt="Truck Photo" /></p> {/* Display truck photo */}
            <p>Truck Phone: {order.truck.phone_number}</p> {/* Display truck phone */}
            <div>
              {order.menu_items.map((menuItem) => (
                <p key={menuItem.item_id}>
                  {menuItem.item_name} - Quantity: {menuItem.quantity} - Price: ${menuItem.price}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
