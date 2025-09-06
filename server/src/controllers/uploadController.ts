/**
 * Upload Controller - Xử lý upload files
 */

import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import { getFileUrl } from '../middleware/upload';

/**
 * POST /api/upload/single - Upload single image
 */
export const uploadSingleImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Không có file nào được upload'
    });
  }

  const fileUrl = getFileUrl(req.file.filename);

  res.status(200).json({
    success: true,
    message: 'Upload ảnh thành công',
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl
    }
  });
});

/**
 * POST /api/upload/multiple - Upload multiple images
 */
export const uploadMultipleImages = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Không có file nào được upload'
    });
  }

  const uploadedFiles = files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    url: getFileUrl(file.filename)
  }));

  res.status(200).json({
    success: true,
    message: `Upload ${files.length} ảnh thành công`,
    data: uploadedFiles
  });
});
