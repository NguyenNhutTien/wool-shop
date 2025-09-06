import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  getOrderStats,
} from '../controllers/orderController';

const router = express.Router();

// Public routes
router.post('/', createOrder);
router.get('/:id', getOrderById);

// Admin routes (TODO: Add authentication middleware)
router.get('/', getOrders);
router.patch('/:id/status', updateOrderStatus);
router.get('/stats', getOrderStats);

export default router;
