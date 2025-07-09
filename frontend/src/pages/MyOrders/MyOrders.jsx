import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      console.log("Orders fetched:", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel" />
            <p><b>Amount:</b> ₹{order.amount}</p>
            <p><b>Items:</b> {order.items.length}</p>
            <div className="items-list">
              {order.items
                .filter(item => item.quantity > 0)
                .map(item => (
                  <div key={item.id}>{item.name} x {item.quantity}</div>
                ))}
            </div>
            <p>
              <b>Status:</b> {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
