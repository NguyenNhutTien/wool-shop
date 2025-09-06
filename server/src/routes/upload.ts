import { Router, Request, Response } from 'express';
import { uploadMultiple, uploadSingle } from '../middleware/upload';
import path from 'path';

const router = Router();

// Upload multiple images
router.post('/images', (req: Request, res: Response): void => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
      return;
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Không có file nào được upload'
      });
      return;
    }

    // Tạo URLs cho các file đã upload
    const imageUrls = req.files.map(file => {
      return `/uploads/${file.filename}`;
    });

    res.json({
      success: true,
      message: `Upload thành công ${req.files.length} ảnh`,
      data: {
        images: imageUrls
      }
    });
  });
});

// Upload single image
router.post('/image', (req: Request, res: Response): void => {
  uploadSingle(req, res, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Không có file nào được upload'
      });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        image: imageUrl
      }
    });
  });
});

export default router;
