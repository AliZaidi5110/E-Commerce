import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useToast } from "../components/Toast";
import { getImageSrc } from "../utils/imageUtils";
import { Pencil, Trash2, PlusCircle, PackageSearch, XCircle, Upload, Link as LinkIcon } from "lucide-react";

const ManageProducts = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const { success, error } = useToast();
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [imageUploadType, setImageUploadType] = useState('url'); // 'url' or 'file'
  const [editErrors, setEditErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
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
    success("Product deleted successfully!");
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const validateForm = (productData) => {
    const errors = {};
    if (!productData.title.trim()) errors.title = "Title is required";
    if (!productData.author.trim()) errors.author = "Author is required";
    if (!productData.price || productData.price <= 0) errors.price = "Valid price is required";
    if (!productData.image || !productData.image.trim()) errors.image = "Image is required";
    if (!productData.description.trim()) errors.description = "Description is required";
    
    // Validate image URL if it's a URL
    if (productData.image && imageUploadType === 'url' && !productData.image.startsWith('data:image/')) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(productData.image)) {
        errors.image = "Please enter a valid image URL";
      }
    }
    
    return errors;
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(product);
    setEditErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      editProduct(editId, product);
      success("Product updated successfully!");
      setShowEditModal(false);
      setEditId(null);
      resetModalState();
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(product);
    setEditErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      addProduct(product);
      success("Product added successfully!");
      setShowAddModal(false);
      resetModalState();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setEditErrors({ ...editErrors, image: "Please select a valid image file" });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setEditErrors({ ...editErrors, image: "Image size should be less than 5MB" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setProduct({ ...product, image: base64String });
        setImagePreview(base64String);
        // Clear any previous image errors
        if (editErrors.image) {
          setEditErrors({ ...editErrors, image: "" });
        }
      };
      reader.onerror = () => {
        setEditErrors({ ...editErrors, image: "Error reading file" });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetModalState = () => {
    setProduct({
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
    });
    setEditErrors({});
    setImageUploadType('url');
    setImagePreview('');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto relative">
      <div className="flex items-center gap-2 mb-6">
        <PackageSearch className="text-green-400" size={30} />
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        title="Add New Product"
      >
        <PlusCircle size={24} />
      </button>

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
                  setImagePreview(p.image);
                  setImageUploadType(p.image.startsWith('data:image/') ? 'file' : 'url');
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
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEditModal(false);
                resetModalState();
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={product.title}
                  onChange={(e) => {
                    setProduct({ ...product, title: e.target.value });
                    if (editErrors.title) setEditErrors({ ...editErrors, title: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.title ? 'border border-red-500' : ''}`}
                />
                {editErrors.title && <p className="text-red-400 text-sm mt-1">{editErrors.title}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Author"
                  value={product.author}
                  onChange={(e) => {
                    setProduct({ ...product, author: e.target.value });
                    if (editErrors.author) setEditErrors({ ...editErrors, author: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.author ? 'border border-red-500' : ''}`}
                />
                {editErrors.author && <p className="text-red-400 text-sm mt-1">{editErrors.author}</p>}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                    if (editErrors.price) setEditErrors({ ...editErrors, price: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.price ? 'border border-red-500' : ''}`}
                />
                {editErrors.price && <p className="text-red-400 text-sm mt-1">{editErrors.price}</p>}
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageUploadType('url');
                      setImagePreview('');
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${imageUploadType === 'url' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <LinkIcon size={14} /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUploadType('file');
                      setProduct({ ...product, image: '' });
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${imageUploadType === 'file' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <Upload size={14} /> Upload
                  </button>
                </div>

                {imageUploadType === 'url' ? (
                  <input
                    type="text"
                    placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    value={product.image}
                    onChange={(e) => {
                      setProduct({ ...product, image: e.target.value });
                      setImagePreview(e.target.value);
                      if (editErrors.image) setEditErrors({ ...editErrors, image: "" });
                    }}
                    className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.image ? 'border border-red-500' : ''}`}
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 bg-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                    />
                    <p className="text-gray-400 text-xs mt-1">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                  </div>
                )}

                {/* Image Preview */}
                {(product.image || imagePreview) && (
                  <div className="mt-3">
                    <p className="text-gray-300 text-sm mb-2">Preview:</p>
                    <img
                      src={imagePreview || product.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        setEditErrors({ ...editErrors, image: "Invalid image URL or corrupted file" });
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                        if (editErrors.image === "Invalid image URL or corrupted file") {
                          setEditErrors({ ...editErrors, image: "" });
                        }
                      }}
                    />
                  </div>
                )}

                {editErrors.image && <p className="text-red-400 text-sm mt-1">{editErrors.image}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Description"
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                    if (editErrors.description) setEditErrors({ ...editErrors, description: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.description ? 'border border-red-500' : ''}`}
                  rows="3"
                />
                {editErrors.description && <p className="text-red-400 text-sm mt-1">{editErrors.description}</p>}
              </div>

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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                resetModalState();
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <XCircle size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={product.title}
                  onChange={(e) => {
                    setProduct({ ...product, title: e.target.value });
                    if (editErrors.title) setEditErrors({ ...editErrors, title: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.title ? 'border border-red-500' : ''}`}
                />
                {editErrors.title && <p className="text-red-400 text-sm mt-1">{editErrors.title}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Author"
                  value={product.author}
                  onChange={(e) => {
                    setProduct({ ...product, author: e.target.value });
                    if (editErrors.author) setEditErrors({ ...editErrors, author: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.author ? 'border border-red-500' : ''}`}
                />
                {editErrors.author && <p className="text-red-400 text-sm mt-1">{editErrors.author}</p>}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Price"
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                    if (editErrors.price) setEditErrors({ ...editErrors, price: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.price ? 'border border-red-500' : ''}`}
                />
                {editErrors.price && <p className="text-red-400 text-sm mt-1">{editErrors.price}</p>}
              </div>

              <div>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageUploadType('url');
                      setImagePreview('');
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${imageUploadType === 'url' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <LinkIcon size={14} /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUploadType('file');
                      setProduct({ ...product, image: '' });
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${imageUploadType === 'file' ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <Upload size={14} /> Upload
                  </button>
                </div>

                {imageUploadType === 'url' ? (
                  <input
                    type="text"
                    placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    value={product.image}
                    onChange={(e) => {
                      setProduct({ ...product, image: e.target.value });
                      setImagePreview(e.target.value);
                      if (editErrors.image) setEditErrors({ ...editErrors, image: "" });
                    }}
                    className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.image ? 'border border-red-500' : ''}`}
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 bg-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-600 file:text-white hover:file:bg-gray-500"
                    />
                    <p className="text-gray-400 text-xs mt-1">Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                  </div>
                )}

                {/* Image Preview */}
                {(product.image || imagePreview) && (
                  <div className="mt-3">
                    <p className="text-gray-300 text-sm mb-2">Preview:</p>
                    <img
                      src={imagePreview || product.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        setEditErrors({ ...editErrors, image: "Invalid image URL or corrupted file" });
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                        if (editErrors.image === "Invalid image URL or corrupted file") {
                          setEditErrors({ ...editErrors, image: "" });
                        }
                      }}
                    />
                  </div>
                )}

                {editErrors.image && <p className="text-red-400 text-sm mt-1">{editErrors.image}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Description"
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                    if (editErrors.description) setEditErrors({ ...editErrors, description: "" });
                  }}
                  className={`w-full p-3 bg-gray-700 rounded-lg ${editErrors.description ? 'border border-red-500' : ''}`}
                  rows="3"
                />
                {editErrors.description && <p className="text-red-400 text-sm mt-1">{editErrors.description}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
