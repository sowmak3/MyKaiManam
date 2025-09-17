import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      if (!token) return setLoading(false);
      try {
        // adjust to your backend (GET or POST). Here we assume GET:
        const res = await axios.get(`${url}/api/order/userorders`, {
          headers: { token }, // if your backend expects Bearer: Authorization: `Bearer ${token}`
        });
        if (res.data?.success) setOrders(res.data.orders || []);
      } catch (e) {
        console.error("Error fetching orders:", e);
      } finally {
        setLoading(false);
      }
    };
    go();
  }, [token]);

  if (!token) return <div style={{ padding: 24 }}>Please log in to view orders.</div>;
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o._id}>
              <b>#{o._id}</b> — ₹{o.amount} — {o.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
