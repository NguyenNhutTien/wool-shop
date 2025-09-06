import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICustomer {
  name: string;
  phone: string;
  address?: string;
}

export interface IOrder extends Document {
  items: IOrderItem[];
  customer: ICustomer;
  note?: string;
  status: 'new' | 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID là bắt buộc'],
  },
  quantity: {
    type: Number,
    required: [true, 'Số lượng là bắt buộc'],
    min: [1, 'Số lượng phải ít nhất là 1'],
    max: [100, 'Số lượng không được vượt quá 100'],
  },
});

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: [true, 'Tên khách hàng là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên không được vượt quá 100 ký tự'],
  },
  phone: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ'],
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Địa chỉ không được vượt quá 200 ký tự'],
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    items: {
      type: [OrderItemSchema],
      required: [true, 'Danh sách sản phẩm là bắt buộc'],
      validate: {
        validator: function(items: IOrderItem[]) {
          return items.length > 0;
        },
        message: 'Đơn hàng phải có ít nhất một sản phẩm',
      },
    },
    customer: {
      type: CustomerSchema,
      required: [true, 'Thông tin khách hàng là bắt buộc'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Ghi chú không được vượt quá 500 ký tự'],
    },
    status: {
      type: String,
      enum: ['new', 'confirmed', 'cancelled'],
      default: 'new',
    },
    totalAmount: {
      type: Number,
      required: [true, 'Tổng tiền là bắt buộc'],
      min: [0, 'Tổng tiền phải lớn hơn 0'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for queries
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'customer.phone': 1 });

export default mongoose.model<IOrder>('Order', OrderSchema);
