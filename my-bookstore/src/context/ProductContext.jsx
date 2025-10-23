import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5001/api/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, res.data.product]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:5001/api/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.map((p) => (p._id === id ? res.data.product : p)));
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);