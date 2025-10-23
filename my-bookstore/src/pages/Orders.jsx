import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = isAdmin ? "/api/orders/admin/all-orders" : "/api/orders/my-orders";
        const res = await axios.get(`http://localhost:5001${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [isAdmin, token]);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5001/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6">{user?.role === "admin" ? "All Orders" : "My Orders"}</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No orders found</div>
          <p className="text-gray-500">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Order #{order._id.slice(-6)}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">Rs {order.total}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                    order.status === 'processing' ? 'bg-blue-600/20 text-blue-400' :
                    order.status === 'shipped' ? 'bg-purple-600/20 text-purple-400' :
                    order.status === 'delivered' ? 'bg-green-600/20 text-green-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Billing Information:</h4>
                <div className="text-gray-400 text-sm">
                  <p><span className="font-medium">Name:</span> {order.billing.name}</p>
                  <p><span className="font-medium">Address:</span> {order.billing.address}</p>
                  <p><span className="font-medium">Phone:</span> {order.billing.phone}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-700/50 rounded p-2">
                      <div>
                        <span className="text-white font-medium">{item.title}</span>
                        <span className="text-gray-400 text-sm ml-2">x{item.quantity}</span>
                      </div>
                      <span className="text-green-400 font-medium">Rs {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {isAdmin && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {['pending','processing','shipped','delivered','cancelled'].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(order._id, s)}
                      className={`px-3 py-1 rounded text-sm border transition-colors ${
                        order.status === s
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;