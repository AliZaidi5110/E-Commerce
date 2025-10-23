import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getImageSrc } from "../utils/imageUtils";

const Products = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(products.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product, quantity: 1 } });
  };

  return (
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Books</h1>
      
      {/* Products Grid: 3 per row on desktop */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[900px] mx-auto  sm:px-8 lg:px-12
 px-4 mb-8">
  {currentProducts.map((product) => (
    <div key={product._id} className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <img 
        src={getImageSrc(product.image)} 
        alt={product.title} 
        className="w-full h-30 object-cover rounded-t-lg mx-auto" 
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{product.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">by {product.author}</p>
        <p className="text-green-600 dark:text-green-400 font-bold mt-2">${product.price}</p>
        {user?.role !== "admin" && (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
          </div>
        )}
        {user?.role === "admin" && (
          <div className="mt-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">Admin View - Purchase options not available</p>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
        Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} books
      </div>
    </div>
  );
};

export default Products;