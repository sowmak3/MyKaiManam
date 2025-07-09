import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from "axios";
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        alert("Failed to fetch orders from backend");
      }
    } catch (error) {
      console.log("Fetch orders error:", error);
      alert("Something went wrong while fetching orders!");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />

            <p className='order-item-price'>₹{order.amount}</p>

            <div className='order-item-food'>
              {order.items.map((item, idx) => (
                <p key={idx}>{item.name} x {item.quantity}</p>
              ))}
              <p>Items: {order.items.length}</p>
            </div>

            <div>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zip}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
