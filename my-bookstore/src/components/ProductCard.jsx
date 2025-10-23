import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getImageSrc } from "../utils/imageUtils";

export default function ProductCard({ product, cardWidth = "w-60", imageHeight = "h-48" }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showToast, setShowToast] = useState(false); // New state for toast
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const addToCartButtonRef = useRef(null);
  const buyNowButtonRef = useRef(null);
  const confirmModalRef = useRef(null);
  const quantityModalRef = useRef(null);
  const firstModalButtonRef = useRef(null);
  const quantityInputRef = useRef(null);
  const toastRef = useRef(null); // Ref for toast accessibility

  // Handle keyboard navigation for modals and toast
  const handleKeyDown = (e, modalType) => {
    if (e.key === "Escape") {
      setShowConfirmModal(false);
      setShowQuantityModal(false);
      setShowToast(false); // Allow Escape to dismiss toast
      if (modalType === "confirm" && addToCartButtonRef.current) {
        addToCartButtonRef.current.focus();
      } else if (modalType === "quantity" && buyNowButtonRef.current) {
        buyNowButtonRef.current.focus();
      } else if (modalType === "toast" && addToCartButtonRef.current) {
        addToCartButtonRef.current.focus();
      }
    }
  };

  // Focus management for modals and toast
  useEffect(() => {
    if (showConfirmModal && firstModalButtonRef.current) {
      firstModalButtonRef.current.focus();
    }
    if (showQuantityModal && quantityInputRef.current) {
      quantityInputRef.current.focus();
    }
    if (showToast && toastRef.current) {
      toastRef.current.focus();
    }
  }, [showConfirmModal, showQuantityModal, showToast]);

  // Trap focus within modal
  const trapFocus = (e, modalRef) => {
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  const handleAddToCart = () => setShowConfirmModal(true);

  const confirmAdd = () => {
    addToCart(product, 1);
    setShowConfirmModal(false);
    setShowToast(true); // Show toast after adding to cart
    setTimeout(() => {
      setShowToast(false); // Auto-dismiss toast after 3 seconds
      if (addToCartButtonRef.current) {
        addToCartButtonRef.current.focus();
      }
    }, 3000);
    if (addToCartButtonRef.current) {
      addToCartButtonRef.current.focus();
    }
  };

  const handleBuyNow = () => setShowQuantityModal(true);

  const confirmBuy = () => {
    navigate("/checkout", { state: { product, quantity: selectedQuantity } });
    setShowQuantityModal(false);
    if (buyNowButtonRef.current) {
      buyNowButtonRef.current.focus();
    }
  };

  return (
    <article
      className={`bg-white dark:bg-gray-800 p-4 rounded shadow ${cardWidth} mx-auto`}
      role="region"
      aria-label={`Book: ${product.title}`}
    >
      <img
        src={getImageSrc(product.image)}
        alt={product.title}
        className={`w-full ${imageHeight} object-cover mb-3 rounded`}
      />
      <h3 className="font-semibold text-sm sm:text-base truncate text-gray-900 dark:text-white">
        {product.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{product.author}</p>
      <p className="font-bold mt-2 text-gray-900 dark:text-white">Rs {product.price}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        <button
          ref={addToCartButtonRef}
          onClick={handleAddToCart}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleAddToCart();
            }
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add ${product.title} to cart`}
          aria-expanded={showConfirmModal}
          aria-controls="confirm-modal"
        >
          Add to Cart
        </button>
        <button
          ref={buyNowButtonRef}
          onClick={handleBuyNow}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBuyNow();
            }
          }}
          className="px-3 py-1 border rounded text-sm text-gray-900 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label={`Buy ${product.title} now`}
          aria-expanded={showQuantityModal}
          aria-controls="quantity-modal"
        >
          Buy Now
        </button>
      </div>
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-900/30 dark:bg-gray-900/50 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={confirmModalRef}
            onKeyDown={(e) => trapFocus(e, confirmModalRef)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              aria-describedby="modal-description"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                id="modal-title"
                className="mb-4 text-lg text-gray-900 dark:text-white"
              >
                Confirm adding to cart?
              </p>
              <p
                id="modal-description"
                className="sr-only"
              >
                Confirm whether to add {product.title} to your cart.
              </p>
              <div className="flex gap-2">
                <button
                  ref={firstModalButtonRef}
                  onClick={confirmAdd}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      confirmAdd();
                    }
                    handleKeyDown(e, "confirm");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Confirm adding to cart"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    if (addToCartButtonRef.current) {
                      addToCartButtonRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setShowConfirmModal(false);
                      if (addToCartButtonRef.current) {
                        addToCartButtonRef.current.focus();
                      }
                    }
                    handleKeyDown(e, "confirm");
                  }}
                  className="px-4 py-2 border rounded text-gray-900 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Cancel adding to cart"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showQuantityModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-900/30 dark:bg-gray-900/50 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quantity-modal-title"
            ref={quantityModalRef}
            onKeyDown={(e) => trapFocus(e, quantityModalRef)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              aria-describedby="quantity-modal-description"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                id="quantity-modal-title"
                className="mb-4 text-lg text-gray-900 dark:text-white"
              >
                Enter quantity:
              </p>
              <p
                id="quantity-modal-description"
                className="sr-only"
              >
                Enter the quantity for purchasing {product.title}.
              </p>
              <input
                ref={quantityInputRef}
                type="number"
                min="1"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Quantity for ${product.title}`}
              />
              <div className="flex gap-2">
                <button
                  onClick={confirmBuy}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      confirmBuy();
                    }
                    handleKeyDown(e, "quantity");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Confirm purchase quantity"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowQuantityModal(false);
                    if (buyNowButtonRef.current) {
                      buyNowButtonRef.current.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setShowQuantityModal(false);
                      if (buyNowButtonRef.current) {
                        buyNowButtonRef.current.focus();
                      }
                    }
                    handleKeyDown(e, "quantity");
                  }}
                  className="px-4 py-2 border rounded text-gray-900 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Cancel purchase"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showToast && (
          <motion.div
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            role="alert"
            aria-live="assertive"
            aria-labelledby="toast-message"
            ref={toastRef}
            onKeyDown={(e) => handleKeyDown(e, "toast")}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p id="toast-message">Book added to cart!</p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}