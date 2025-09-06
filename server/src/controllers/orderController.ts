/**
 * Order Controller - Xử lý HTTP requests cho đơn hàng
 * Chịu trách nhiệm: Validate input, gọi service, trả response
 */

import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { createOrderSchema } from '../utils/validate';
import { asyncHandler } from '../utils/errorHandler';

const orderService = new OrderService();

/**
 * POST /api/orders - Tạo đơn hàng mới
 */
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const data = createOrderSchema.parse(req.body);
  const order = await orderService.createOrder(data);
  
  res.status(201).json({
    success: true,
    message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
    data: order,
  });
});

/**
 * GET /api/orders/:id - Lấy đơn hàng theo ID
 */
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  
  res.status(200).json({
    success: true,
    data: order,
  });
});

/**
 * GET /api/orders - Lấy danh sách đơn hàng (admin only)
 */
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as string;
  
  const result = await orderService.getOrders(page, limit, status);
  
  res.status(200).json({
    success: true,
    data: result.orders,
    pagination: result.pagination,
  });
});

/**
 * PATCH /api/orders/:id/status - Cập nhật trạng thái đơn hàng (admin only)
 */
export const updateOrderStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['new', 'confirmed', 'cancelled'].includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Trạng thái không hợp lệ',
    });
    return;
  }
  
  const order = await orderService.updateOrderStatus(id, status);
  
  res.status(200).json({
    success: true,
    message: 'Cập nhật trạng thái đơn hàng thành công',
    data: order,
  });
});

/**
 * GET /api/orders/stats - Lấy thống kê đơn hàng (admin only)
 */
export const getOrderStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await orderService.getOrderStats();
  
  res.status(200).json({
    success: true,
    data: stats,
  });
});
