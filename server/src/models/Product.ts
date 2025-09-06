import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  images: string[];
  tags: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true,
      maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự'],
    },
    slug: {
      type: String,
      required: [true, 'Slug là bắt buộc'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Giá sản phẩm là bắt buộc'],
      min: [0, 'Giá sản phẩm phải lớn hơn 0'],
    },
    images: {
      type: [String],
      required: [true, 'Ít nhất một ảnh sản phẩm là bắt buộc'],
      validate: {
        validator: function(images: string[]) {
          return images.length > 0 && images.length <= 5;
        },
        message: 'Sản phẩm phải có từ 1 đến 5 ảnh',
      },
    },
    tags: {
      type: [String],
      required: [true, 'Ít nhất một tag là bắt buộc'],
      validate: {
        validator: function(tags: string[]) {
          return tags.length > 0;
        },
        message: 'Sản phẩm phải có ít nhất một tag',
      },
    },
    description: {
      type: String,
      required: [true, 'Mô tả sản phẩm là bắt buộc'],
      trim: true,
      maxlength: [1000, 'Mô tả không được vượt quá 1000 ký tự'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for search and filtering
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ createdAt: -1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
