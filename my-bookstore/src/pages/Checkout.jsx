import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getImageSrc } from "../utils/imageUtils";
import axios from "axios";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [billing, setBilling] = useState({ name: "", address: "", phone: "" });
  const [error, setError] = useState("");
  
  // Check if this is a direct purchase from product page
  const directPurchase = location.state?.product;
  const directQuantity = location.state?.quantity || 1;
  
  // Determine what items to checkout
  const checkoutItems = directPurchase 
    ? [{
        productId: directPurchase._id,
        title: directPurchase.title,
        author: directPurchase.author,
        price: directPurchase.price,
        image: directPurchase.image,
        quantity: directQuantity
      }]
    : cart;
    
  const checkoutTotal = directPurchase 
    ? directPurchase.price * directQuantity
    : getCartTotal();

  useEffect(() => {
    // Pre-fill user name if available
    if (user?.name) {
      setBilling(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("Please log in to place an order");

    try {
      const order = {
        items: checkoutItems.map((item) => ({
          productId: item.productId || item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: checkoutTotal,
        billing,
      };
      
      await axios.post("http://localhost:5001/api/orders", order, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      
      // Clear cart only if this was a cart checkout, not direct purchase
      if (!directPurchase) {
        clearCart();
      }
      
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
            Checkout
          </h1>
          <p className="text-gray-300">
            {directPurchase ? 'Complete your purchase' : 'Review your order and complete purchase'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 flex items-start gap-3 mb-6">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-400 text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {checkoutItems.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-700/30 rounded-lg">
                    <img 
                      src={getImageSrc(item.image)} 
                      alt={item.title} 
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">by {item.author}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-300">Qty: {item.quantity}</span>
                        <span className="text-green-400 font-bold">Rs {item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-green-400">Rs {checkoutTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Billing Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={billing.name}
                    onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
                  <textarea
                    value={billing.address}
                    onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Enter your complete address"
                    rows="3"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={billing.phone}
                    onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2 mt-6"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Place Order - Rs {checkoutTotal}
                </button>
              </form>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-green-400 mb-1">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400">Secure Payment</span>
                  </div>
                  <div>
                    <div className="text-blue-400 mb-1">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400">Free Shipping</span>
                  </div>
                  <div>
                    <div className="text-purple-400 mb-1">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;