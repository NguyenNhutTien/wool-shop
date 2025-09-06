/**
 * Product Controller - Xử lý HTTP requests cho sản phẩm
 * Chịu trách nhiệm: Validate input, gọi service, trả response
 */

import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { productQuerySchema, createProductSchema } from '../utils/validate';
import { asyncHandler } from '../utils/errorHandler';

const productService = new ProductService();

/**
 * GET /api/products - Lấy danh sách sản phẩm
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = productQuerySchema.parse(req.query);
  const result = await productService.getProducts(query);
  
  res.status(200).json({
    success: true,
    data: result.products,
    pagination: result.pagination,
  });
});

/**
 * GET /api/products/:slug - Lấy sản phẩm theo slug
 */
export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  
  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * POST /api/products - Tạo sản phẩm mới (admin only)
 */
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(data);
  
  res.status(201).json({
    success: true,
    message: 'Tạo sản phẩm thành công',
    data: product,
  });
});

/**
 * PUT /api/products/:id - Cập nhật sản phẩm (admin only)
 */
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = createProductSchema.parse(req.body);
  const product = await productService.updateProduct(id, data);
  
  res.status(200).json({
    success: true,
    message: 'Cập nhật sản phẩm thành công',
    data: product,
  });
});

/**
 * DELETE /api/products/:id - Xóa sản phẩm (admin only)
 */
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(id);
  
  res.status(200).json({
    success: true,
    message: 'Xóa sản phẩm thành công',
  });
});

/**
 * GET /api/products/tags - Lấy tất cả tags
 */
export const getAllTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await productService.getAllTags();
  
  res.status(200).json({
    success: true,
    data: tags,
  });
});

/**
 * GET /api/products/:id/related - Lấy sản phẩm liên quan
 */
export const getRelatedProducts = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const limit = parseInt(req.query.limit as string) || 4;
  
  const products = await productService.getRelatedProducts(id, limit);
  
  res.status(200).json({
    success: true,
    data: products,
  });
});
