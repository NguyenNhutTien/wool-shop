/**
 * Contact Controller - Xử lý HTTP requests cho liên hệ
 * Chịu trách nhiệm: Validate input, gọi service, trả response
 */

import { Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import { createContactSchema } from '../utils/validate';
import { asyncHandler } from '../utils/errorHandler';

const contactService = new ContactService();

/**
 * POST /api/contacts - Tạo tin nhắn liên hệ mới
 */
export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const data = createContactSchema.parse(req.body);
  const contact = await contactService.createContact(data);
  
  res.status(201).json({
    success: true,
    message: 'Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.',
    data: contact,
  });
});

/**
 * GET /api/contacts - Lấy danh sách tin nhắn liên hệ (admin only)
 */
export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  
  const result = await contactService.getContacts(page, limit);
  
  res.status(200).json({
    success: true,
    data: result.contacts,
    pagination: result.pagination,
  });
});

/**
 * GET /api/contacts/:id - Lấy tin nhắn liên hệ theo ID (admin only)
 */
export const getContactById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await contactService.getContactById(id);
  
  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * DELETE /api/contacts/:id - Xóa tin nhắn liên hệ (admin only)
 */
export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await contactService.deleteContact(id);
  
  res.status(200).json({
    success: true,
    message: 'Xóa tin nhắn thành công',
  });
});

/**
 * GET /api/contacts/stats - Lấy thống kê tin nhắn liên hệ (admin only)
 */
export const getContactStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await contactService.getContactStats();
  
  res.status(200).json({
    success: true,
    data: stats,
  });
});
