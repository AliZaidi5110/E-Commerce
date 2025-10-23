import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { getImageSrc } from "../utils/imageUtils";
import { Pencil, Trash2, PlusCircle, PackageSearch, XCircle } from "lucide-react";

const ManageProducts = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [product, setProduct] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      editProduct(editId, product);
      setEditId(null);
    } else {
      addProduct(product);
    }
    setProduct({
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
    });
  };

  const handleDelete = () => {
    deleteProduct(selectedProductId);
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editProduct(editId, product);
    setShowEditModal(false);
    setEditId(null);
    setProduct({
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      <div className="flex items-center gap-2 mb-6">
        <PackageSearch className="text-green-400" size={30} />
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={product.author}
            onChange={(e) => setProduct({ ...product, author: e.target.value })}
            className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="w-full p-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full p-3 mt-4 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <PlusCircle size={20} />
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((p) => (
          <div
            key={p._id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md transition hover:shadow-lg"
          >
            <img
              src={p.image.startsWith("http") ? p.image : getImageSrc(p.image)}
              alt={p.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold text-white mb-1">{p.title}</h3>
            <p className="text-gray-400 mb-1 text-sm">by {p.author}</p>
            <p className="text-green-400 font-bold mb-3">Rs {p.price}</p>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {p.description}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setEditId(p._id);
                  setProduct(p);
                  setShowEditModal(true);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => {
                  setSelectedProductId(p._id);
                  setShowDeleteModal(true);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={product.author}
                onChange={(e) =>
                  setProduct({ ...product, author: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="w-full p-3 bg-gray-700 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
