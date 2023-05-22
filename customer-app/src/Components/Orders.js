import React, { useState, useEffect } from 'react';
import ApiCalls from '../ApiCalls';
import './Orders.scss';

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
    return () => {
      clearInterval(interval);
      setOrders([]);
    };
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
      <h3 className='order-my-orders'>My Orders</h3>
      <div className="orders-container">
        {orders.map((order) => {
          let total = 0; // Initialize total amount for each order
          let tax = 0; // Initialize tax amount for each order

          return (
            <div key={order.id} className="order-item">
              <div className="order-column">
                <h5>Order No. {order.order_id}</h5>
                <p className="status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </p>
                <p>Truck: {order.truck.name}</p> {/* Display truck name */}
               
              </div>
              <div className="order-column">
                <p>
                  Date: {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </p>
                <div>
                  {order.menu_items.map((menuItem) => {
                    const itemTotal = menuItem.quantity * menuItem.price; // Calculate total amount for each item
                    total += itemTotal; // Accumulate the total amount
                    return (
                      <p key={menuItem.item_id}>
                        {menuItem.item_name} - {menuItem.quantity} x ${menuItem.price}
                      </p>
                    );
                  })}
                </div>
                {total > 0 && (
                  <div>
                    <p>Tax: ${(total * 0.1).toFixed(2)}</p>
                    <p>Total: ${(total + total * 0.1).toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
