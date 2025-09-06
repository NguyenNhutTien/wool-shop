import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllTags,
  getRelatedProducts,
} from '../controllers/productController';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/tags', getAllTags);
router.get('/:slug', getProductBySlug);
router.get('/:id/related', getRelatedProducts);

// Admin routes (TODO: Add authentication middleware)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
