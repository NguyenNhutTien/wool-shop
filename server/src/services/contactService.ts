/**
 * Contact Service - Xử lý business logic cho liên hệ
 * Chịu trách nhiệm: Lưu tin nhắn liên hệ, lấy danh sách tin nhắn
 */

import Contact, { IContact } from '../models/Contact';
import { CreateContactInput } from '../utils/validate';
import { AppError } from '../utils/errorHandler';

export class ContactService {
  /**
   * Tạo tin nhắn liên hệ mới
   */
  async createContact(data: CreateContactInput): Promise<IContact> {
    const contact = new Contact(data);
    await contact.save();
    
    return contact.toObject();
  }

  /**
   * Lấy danh sách tin nhắn liên hệ (cho admin)
   */
  async getContacts(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    const [contacts, total] = await Promise.all([
      Contact.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments()
    ]);

    return {
      contacts,
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
   * Lấy tin nhắn liên hệ theo ID
   */
  async getContactById(id: string): Promise<IContact> {
    const contact = await Contact.findById(id).lean();
    
    if (!contact) {
      throw new AppError('Không tìm thấy tin nhắn', 404);
    }
    
    return contact;
  }

  /**
   * Xóa tin nhắn liên hệ
   */
  async deleteContact(id: string): Promise<void> {
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      throw new AppError('Không tìm thấy tin nhắn', 404);
    }
  }

  /**
   * Lấy thống kê tin nhắn liên hệ
   */
  async getContactStats() {
    const totalContacts = await Contact.countDocuments();
    
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });

    return {
      totalContacts,
      recentContacts
    };
  }
}
