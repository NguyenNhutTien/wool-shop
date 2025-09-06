/**
 * Order Service - Xử lý business logic cho đơn hàng
 * Chịu trách nhiệm: Tạo đơn hàng, tính tổng tiền, validate sản phẩm
 */

import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';
import { CreateOrderInput } from '../utils/validate';
import { AppError } from '../utils/errorHandler';
import mongoose from 'mongoose';

export class OrderService {
  /**
   * Tạo đơn hàng mới
   */
  async createOrder(data: CreateOrderInput): Promise<IOrder> {
    // Validate tất cả sản phẩm tồn tại
    const productIds = data.items.map(item => item.productId);
    const products = await Product.find({ 
      _id: { $in: productIds } 
    });

    if (products.length !== productIds.length) {
      throw new AppError('Một hoặc nhiều sản phẩm không tồn tại', 400);
    }

    // Tính tổng tiền
    let totalAmount = 0;
    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    for (const item of data.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new AppError(`Sản phẩm ${item.productId} không tồn tại`, 400);
      }
      totalAmount += product.price * item.quantity;
    }

    // Tạo đơn hàng
    const orderData = {
      ...data,
      totalAmount,
      status: 'new' as const,
    };

    const order = new Order(orderData);
    await order.save();
    
    // Populate product information
    await order.populate('items.productId', 'name price images');
    
    return order.toObject();
  }

  /**
   * Lấy đơn hàng theo ID
   */
  async getOrderById(id: string): Promise<IOrder> {
    const order = await Order.findById(id)
      .populate('items.productId', 'name price images slug')
      .lean();
    
    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }
    
    return order;
  }

  /**
   * Lấy danh sách đơn hàng (cho admin)
   */
  async getOrders(page: number = 1, limit: number = 20, status?: string) {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('items.productId', 'name price images slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter)
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    };
  }

  /**
   * Cập nhật trạng thái đơn hàng
   */
  async updateOrderStatus(id: string, status: 'new' | 'confirmed' | 'cancelled'): Promise<IOrder> {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.productId', 'name price images slug');

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    return order.toObject();
  }

  /**
   * Tính tổng doanh thu (cho dashboard)
   */
  async getOrderStats() {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      statusBreakdown: stats
    };
  }
}
