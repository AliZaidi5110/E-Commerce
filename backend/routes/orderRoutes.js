import express from "express";
import {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getOrders);
router.get("/admin/all-orders", authMiddleware, adminMiddleware, getAllOrders);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;