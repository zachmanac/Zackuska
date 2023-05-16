import React, { useEffect, useState } from "react";
import ApiCallsOwner from "../ApiCallsOwner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const foodTruckId = 1; // hardcoded in, need it based off user(owner) who is logged in i think
        const fetchedOrders = await ApiCallsOwner.getAllOrders(foodTruckId);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History Page</h1>
        {orders.map((order) => (
          <div key={order.id}>
            <p>{order.order_id}</p>
            <p>{order.total_amount}</p>
            {console.log("ORDER IN HISTORY PAGE", order)}

          </div>
        ))}
    </div>
  );
};

export default OrderHistory;