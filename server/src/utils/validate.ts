import { z } from 'zod';

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc').max(100, 'Tên sản phẩm không được vượt quá 100 ký tự'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang').optional(),
  price: z.number().min(0, 'Giá sản phẩm phải lớn hơn 0'),
  images: z.array(z.string().min(1, 'URL ảnh không được để trống')).min(1, 'Ít nhất một ảnh sản phẩm là bắt buộc').max(5, 'Tối đa 5 ảnh'),
  tags: z.array(z.string().min(1)).min(1, 'Ít nhất một tag là bắt buộc'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc').max(1000, 'Mô tả không được vượt quá 1000 ký tự'),
});

// Order validation schemas
export const orderItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Product ID không hợp lệ'),
  quantity: z.number().int().min(1, 'Số lượng phải ít nhất là 1').max(100, 'Số lượng không được vượt quá 100'),
});

export const customerSchema = z.object({
  name: z.string().min(1, 'Tên khách hàng là bắt buộc').max(100, 'Tên không được vượt quá 100 ký tự'),
  phone: z.string().min(1, 'Số điện thoại là bắt buộc').regex(/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'),
  address: z.string().max(200, 'Địa chỉ không được vượt quá 200 ký tự').optional(),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Đơn hàng phải có ít nhất một sản phẩm'),
  customer: customerSchema,
  note: z.string().max(500, 'Ghi chú không được vượt quá 500 ký tự').optional(),
});

// Contact validation schema
export const createContactSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc').max(100, 'Tên không được vượt quá 100 ký tự'),
  phone: z.string().min(1, 'Số điện thoại là bắt buộc').regex(/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'),
  message: z.string().min(1, 'Nội dung tin nhắn là bắt buộc').max(1000, 'Tin nhắn không được vượt quá 1000 ký tự'),
});

// Query validation schemas
export const productQuerySchema = z.object({
  tag: z.string().optional(),
  search: z.string().optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
