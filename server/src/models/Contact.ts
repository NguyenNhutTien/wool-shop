import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Tên là bắt buộc'],
      trim: true,
      maxlength: [100, 'Tên không được vượt quá 100 ký tự'],
    },
    phone: {
      type: String,
      required: [true, 'Số điện thoại là bắt buộc'],
      trim: true,
      match: [/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'],
    },
    message: {
      type: String,
      required: [true, 'Nội dung tin nhắn là bắt buộc'],
      trim: true,
      maxlength: [1000, 'Tin nhắn không được vượt quá 1000 ký tự'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for queries
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ phone: 1 });

export default mongoose.model<IContact>('Contact', ContactSchema);
