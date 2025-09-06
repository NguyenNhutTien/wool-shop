/**
 * Upload Routes - API endpoints for file uploads
 */

import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/upload';
import { uploadSingleImage, uploadMultipleImages } from '../controllers/uploadController';

const router = express.Router();

// Upload single image
router.post('/single', uploadSingle, uploadSingleImage);

// Upload multiple images
router.post('/multiple', uploadMultiple, uploadMultipleImages);

export default router;
